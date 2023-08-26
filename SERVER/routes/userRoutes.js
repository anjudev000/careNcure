const express = require('express');
const userRoute  = express.Router();
const userController = require('../controllers/userController');


userRoute.post('/register',userController.register);
userRoute.post('/verifyOTP',userController.otpVerification)

module.exports = userRoute;