const express = require('express');
const userRoute  = express.Router();
const userController = require('../controllers/userController');
const jwtHelper = require('../middleware/jwtHelper')


userRoute.post('/register',userController.register);
userRoute.post('/verifyOTP',userController.otpVerification);
userRoute.post('/authenticate-user-login',userController.login);
userRoute.get('/user-home',jwtHelper.verifyJwtToken,userController.userHome);

module.exports = userRoute;
