const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { verifyToken } = require('../config/generateToken');





router.route("/").post(verifyToken,chatController.accessChat);



module.exports=router;