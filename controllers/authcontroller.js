const User = require('../model/User')
const {StatusCodes} =require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const {generateToken, authorizeUser} = require('../middleware/authentication');
//const jwt = require('jsonwebtoken')

    const register = async (req, res) => {
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({ user: { name: user.name}, token })
    }    

    const login = async (req, res) => {
        // const { email, password } = req.body
      
        // if (!email || !password) {
        //   throw new BadRequestError('Please provide email and password')
        // }
        // const user = await User.findOne({ email })
        // if (!user) {
        //   throw new UnauthenticatedError('Invalid Credentials')
        // }
        // const isPasswordCorrect = await user.comparePassword(password)
        // if (!isPasswordCorrect) {
        //   throw new UnauthenticatedError('Invalid Credentials')
        // }
        
        // const token = user.createJWT()     
        // res.status(StatusCodes.OK).json({ user: { name: user.name }, token }) 
      //login a user
      User.find({email: req.body.email})
      .then((user) => {
          if(user.lenght < 1){
            return res.status(401).json({
                  message: 'user does not exist'
              });
          }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if(err) {
              return res.status(401).json({
                  message: "Auth failed"
                    }) 
                  }
          if(result) {
              console.log(result);
              generateToken(user[0], (err, token) => {
                  if(err){
                  console.log("error", err);
                  }
                  else{
                    res.status(200).json({
                    message: "Auth successful",
                    user: user[0],
                    token: token
                      })
                  }
      });
    }

          else{
              res.status(401).json({
                  message: "Auth failed"
                  }) 
              }   
          }
              )
          })
          .catch((err) => {
              res.status(401).json({
                  error: err,
                  message: "Auth failed"
              })
          })

        }

    module.exports = {
        register,
        login,
    }