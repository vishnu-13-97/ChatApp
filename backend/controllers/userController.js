const mongoose = require("mongoose");
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { generateToken } = require('../config/generateToken');
const { name } = require("ejs");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePicture,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        token: generateToken(user), // Return token after registration
      });
    } else {
      return res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid  password" });
  }

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    token: generateToken(user._id), 
  });
});

const getUserLogin = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json({ message: "User authenticated", user: req.user });
});

const allUsers = asyncHandler(async(req,res)=>{
  const keyword = req.query.search?{
 $or:[
  {
    name:{$regex:req.query.search,$options:"i"}
  },
  {
    email:{$regex:req.query.search,$options:"i"}
  }
 ],
  }:{}

  const users =await User.find(keyword).find({_id:{$ne:req.user._id}});
  res.send(users);
})




const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { 
    httpOnly: true, 
    expires: new Date(0), 
    secure: false,
    sameSite: "Lax" 
  });

  return res.status(200).json({ message: "Logged out successfully" });
});


module.exports = {
  registerUser,
  loginUser,
  getUserLogin,
  logoutUser,
  allUsers
};
