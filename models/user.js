const mongoose = require('mongoose');
const newSchema = mongoose.Schema;
const userSchema = newSchema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    

  },
  createdAt:{
    type:Date,
    default:Date.Now
  },
  updatedAt:{
    type:Date,
    default:Date.Now
  }
});

module.exports = mongoose.model('User',userSchema,'users')