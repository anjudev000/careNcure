const express = require('express');
const doctorRoute = express.Router();
const doctorController = require('../controllers/doctorController');
const jwtHelper = require('../middleware/jwtHelper');

doctorRoute.post('/doctor-register',doctorController.register);
doctorRoute.post('/doctor-otp-verify',doctorController.otpVerify);
doctorRoute.post('/authenticate-doctor',doctorController.login);
doctorRoute.get('/doctor-home',jwtHelper.verifyJwtToken,doctorController.getHome);
doctorRoute.get('/doctor-info/:doctorId',doctorController.getDoctorName);
doctorRoute.post('/doctor-forgot-password',doctorController.forgotSendLink);
doctorRoute.post('/doctor-updateNewPassword',doctorController.updatePassword);
doctorRoute.get('/getDoctorId/:token',doctorController.getIdFromToken);

module.exports = doctorRoute;