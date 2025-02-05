const express = require('express');
const userController  = require('../controllers/userController')
const router = express.Router();
const {verifyToken} =require("../config/generateToken.js")


router.route('/').post(userController.registerUser).get(verifyToken,userController.allUsers);
router.post('/login', userController.loginUser);
router.get('/login', verifyToken, userController.getUserLogin);
router.post('/logout',userController.logoutUser);







module.exports = router;













