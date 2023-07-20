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

/*const generateToken = (user, callback) => {
    console.log("user", user);
    jwt.sign(
      {
        username: user.username,
        email: user.email,
        password: user.password
      },
      process.env.JWT_KEY,
      (err, res) => {
        callback(err, res);
      }
    );
};

const authorizeUser = (req, res, next) => {
    const token = 
                  req.headers.authorization.split(" ")[1]||
                  req.headers.authorization ||
                  req.headers["X-access-token"] ||
                  req.body.token

         if(!token){
           res.status(401).json({
              message: 'Unauthorized user'
           })
         }
         try{
           const decoded = jwt.verify(token, process.env.JWT_KEY);
           req.user = decoded;
           next();
         }
        catch(err){
            res.status(400).json({
              error: err
            })
          }
        
}*/

const isAdmin = (req,res,next) =>{
    if(req.user.role === 'basic'){   
        console.log(req.user)
        throw new BadRequestError('Access Denied')
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

 


    
