const mongoose = require("mongoose");
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');



const registerUser=asyncHandler(async(req,res)=>{
   const {name,email,password,picture} = req.body;
   if(!name || !password || !email){
    res.status(400).json({message:"All fields required "});
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        picture,
      });
    
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
        });
      } else {
        res.status(500).json({ message: "Failed to register user" });
      }
  

})


const loginUser=asyncHandler(async(req,res)=>{
const {email,password} = req.body;

if(!email || !password){
  res.status(400).json({message:"All fields required "});
}


const user = await User.findOne({ email });

if (!user) {
  return res.status(401).json({ message: "Invalid email or password" });
}


const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({ message: "Invalid email or password" });
}


res.status(200).json({
  _id: user._id,
  name: user.name,
  email: user.email,
  picture: user.picture,
message:`welcome ${user.name}`
});

})


module.exports = {
  registerUser,
  loginUser
}