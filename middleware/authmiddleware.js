const jwt = require('jsonwebtoken');
const config =require('../utils/config');

const SECRET_KEY =config.SECRET_KEY;

const authMiddleware = {
  verifyToken :(req,res) =>{
    const token = req.headers.autherization;
    if(!token){
      return res.status(401).json ({ message:'authentication failed'});
    }

    try{
      const decodedToken = jwt.verify(token,SECRET_KEY);
      req.userId = decodedToken.userId;
      next();
    }catch(error) {
      console.error('Error verifying token',error);
      return res.status(401).json({ message:'authentication failed'});
    }
  }
};

module.exports = authMiddleware;