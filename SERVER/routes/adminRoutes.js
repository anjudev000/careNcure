const express = require('express');
const adminRoute = express.Router();
const adminController = require('../controllers/adminController');
const jwtHelper = require('../middleware/jwtHelper');


adminRoute.post('/authenticate-admin',adminController.login);
adminRoute.get('/getAdminProfile',jwtHelper.verifyJwtToken,adminController.adminProfile);
//adminRoute.get('/getAdminName',jwtHelper.verifyJwtToken,adminController.getName);
adminRoute.get('/getUserList',jwtHelper.verifyJwtToken,adminController.getUserList);
adminRoute.get('/getDoctorList',jwtHelper.verifyJwtToken,adminController.getDoctors);
adminRoute.post('/User-block-Unblock/:userId',jwtHelper.verifyJwtToken,adminController.blockUnblockUser);
adminRoute.post('/Doctor-block-Unblock/:doctorId',jwtHelper.verifyJwtToken,adminController.blockUnblockDoctor);

module.exports = adminRoute;