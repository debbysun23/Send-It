const User = require('../model/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError, BadRequestError } = require('../errors')

const authenticateUser = async (req,res,next) => {
    const authHeader = req.headers.authorization;
     console.log(authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer')){
         //throw new UnauthenticatedError('Autheticatoin Invalid');
         return res.status(400).send({error: 'Authorization header missing'})
    }
     const token = authHeader.split(' ')[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
         req.user = { userId: payload.userId, role:payload.role, name: payload.name }
         next(); 
    }catch(error){
         //throw new UnauthenticatedError('Authentication Invalid');
         return res.status(400).send({error: 'Authorization header missing'});
    }
}


const isAdmin = (req,res,next) =>{
    if(req.user.role === 'basic'){   
        console.log(req.user)
        return res.status(401).send({error: 'Unauthorized User'});
        //throw new BadRequestError('Access Denied')
    } else{   
        next()
    }  
     
} 

module.exports ={   
    //authorizeUser,
    //generateToken,
    authenticateUser,
    isAdmin
} 

 


    
