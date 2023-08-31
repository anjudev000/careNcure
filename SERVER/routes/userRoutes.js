const express = require('express');
const userRoute  = express.Router();
const userController = require('../controllers/userController');


userRoute.post('/register',userController.register);
userRoute.post('/verifyOTP',userController.otpVerification);
userRoute.post('/authenticate-user-login',userController.login);

module.exports = userRoute;
