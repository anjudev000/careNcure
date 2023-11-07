const express = require('express');
const userRoute  = express.Router();
const userController = require('../controllers/userController');
const jwtHelper = require('../middleware/jwtHelper');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path =require("path");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder: 'careNcure_Uploads',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'png'], 
        transformation: [{  width: "auto",
        crop: "scale" }
    ]
    }
});

const upload = multer({storage:storage});

userRoute.post('/register',userController.register);
userRoute.post('/verifyOTP',userController.otpVerification);
userRoute.post('/resendOTP',userController.resendOTP);
userRoute.post('/authenticate-user-login',userController.login);
userRoute.get('/user-home',jwtHelper.verifyJwtToken,userController.userHome);
userRoute.get('/user-info/:userId',userController.getUserInfo);
userRoute.post('/forgot-password',userController.forgetSendLink);
userRoute.post('/updateNewPassword',userController.updatePassword);
userRoute.get('/getUserId/:token',userController.getUserIdfromToken);
userRoute.get('/userDetails/:userId',jwtHelper.verifyJwtToken,userController.profileDetails);
userRoute.put('/updateUserProfile/:userId',upload.single('profilePic'),jwtHelper.verifyJwtToken,userController.updateProfile);
userRoute.get('/getDoctors/:deptName',jwtHelper.verifyJwtToken,userController.getDoctor);
userRoute.post('/create-appointment',userController.createAppointment);
userRoute.post('/checkout-stripe',jwtHelper.verifyJwtToken,userController.stripeSession);
userRoute.post('/checkout-stripe/webhook', express.raw({type: 'application/json'}),userController.webhooks);
userRoute.get('/booking-list/:userId',userController.getBookingList);
userRoute.get('/cancel-booking/:id',userController.cancelBooking);


module.exports = userRoute;
