const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const config = require('../utils/config');
const { model } = require('mongoose');

const SECRET_KEY= config.SECRET_KEY;

const userController = {
  signup: async(req,res) => {
    try{
      const { name, email,password } = req.body;

      const existingUser =await User.findOne({ email });

      if(existingUser){
          return res.status(409).json({ message: 'user already exists'})
      }
       const hashedPassword = await bcrypt.hash(password,10);

      //  create a new user

      const newUser = new User({
        name,
        email,
        password:hashedPassword,
      });

      // save the user
       await newUser.save();
       res.status(200).json ({ message:"user created successfully"});
    }catch(error){
      console.error('Error signingup user', error);
      res.status(500).json ({ message: 'internal server error '});
    }
  },
  getUserList: async (req,res) => {
    try{
      const userList = await User.find({},'name email');
      res.json(userList);
    }catch(error){
      console.error('error in getting the user list ',error);
      res.status(201).json({message:'Internal server error'});
    }
  },
  signin : async (req,res) =>{
    try{
      const { email,password } =req.body;

      const user= await User.findOne({ email });

      if(!user){
        return res.status(501).json({ message:'authentication failed '});
      }

      const passwordMatch = await bcrypt.compare(password,user.password);

      if(!passwordMatch){
        return res.status(501).json ({ message:"authentication failed"});
      }

      const token =jwt.sign({ userid:user._id }, config.SECRET_KEY, { expiresIn:'1hr' });
      res.json({ token });

    }catch(error){
      console.error('error signin in user',error);
      res.status(500).json ({
        message:'Internal server errro ' 
      });
    }
  },

  getProfile: async (req,res) => {
    try{
      const userId =req.userId;
      const user =await User.findById(userId,'name email');
      res.json(user);
    }catch(error){
      console.error('error gettingi user profile',error);
      res.status(500).json({ message:'internal server error'});
    }
  },

  editProfile: async(req,res) =>{
    try{
      const userId = req.userId;
      const { name,email } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { name, email,updatedAt: Date.now()},
        { new:true }
      );

      res.json({ message: 'Profile updated successfully'});
    }catch(error){
      console.error('error updating ud=ser profile',error);
      res.status(500).json({ message: 'internal server error'});
    }
  },

  deleteProfile: async( req,res) => {
    try{
      const userId = req.userId;
      await User.findByIdAndDelete(userId);
      res.json({ message: 'Profile deleted successfully '});
    }catch(error){
      console.error('Error deleting user profile',error);
      res.status(500).json({ message:'internal server error'})
    }
  }

  

}
module.exports = userController;