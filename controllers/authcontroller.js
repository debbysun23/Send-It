const User = require('../model/User')
const {StatusCodes} =require('http-status-codes')

    const register = async (req, res) => {
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({ user: { name: user.name, role:user.role}, token })
    }    

    const login = async (req, res) => {
        const { email, password } = req.body
      
        if (!email || !password) {
          return res.status(400).send({error: 'Please provide email and password'})
        }
        const user = await User.findOne({ email })
        if (!user) {
          return res.status(404).send({error: 'User not found'})
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
          return res.status(404).send({error: 'User not found'})
        } 
        
        const token = user.createJWT()     
        res.status(StatusCodes.OK).json({ user: { name: user.name, role:user.role }, token }) 
    }

    const logout = async (req, res) => {
      res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
    }


    module.exports = {
        register,
        login,
        logout,
    }