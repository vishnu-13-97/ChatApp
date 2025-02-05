const Chat = require('../models/chatModel');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const currentUserId = req.user._id;
  
    if (!userId) {
      return res.status(400).json({ message: "UserId parameter is required" });
    }
  

    const existingChat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [currentUserId, userId] }
    })
      .populate("users", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name email profilePicture"
        }
      });
  
    if (existingChat) {
      return res.status(200).json(existingChat);
    }
  

    try {
      const newChat = await Chat.create({
        chatName: "direct",
        isGroupChat: false,
        users: [currentUserId, userId]
      });
  
      const populatedChat = await Chat.findById(newChat._id)
        .populate("users", "-password");
  
      res.status(201).json(populatedChat);
    } catch (error) {
      res.status(400).json({
        message: "Failed to create chat",
        error: error.message
      });
    }
  });


module.exports = {
    accessChat,
}