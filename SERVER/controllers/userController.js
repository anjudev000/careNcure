const mongoose = require('mongoose');
const User = require('../models/userModel');
const {sendOtpToMail} = require('../utils/sendotp');
const {clearExiredOtp} = require('../utils/otpExpire');


const register = async (req, res,next) => {
  try {
    const { fullName, mobile_num,email, password } = req.body;
    const newUser = new User({
      fullName,
      mobile_num,
      email,
      password
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    //send OTP after saving user to database
   const otp =  await sendOtpToMail(newUser.email);

   //update it in database
   await User.findOneAndUpdate({email},{otp});
  
   //clear otp after one minute
   setTimeout(async()=>{
    await clearExiredOtp(newUser.email);
   },600000);

   res.status(201).json(savedUser);
  } catch (error) {
    console.error(error); // Log the error
    if (error.code === 11000){
      if(error.keyPattern.mobile_num){
        res.status(422).json(['Duplicate mobile number found.']);
      }
      else if(error.keyPattern.email){
        res.status(422).json(['Duplicate email found.']);
      }
    }else {
      next(error);
    }
  };
}

const otpVerification = async(req,res,next)=>{
  try{
    const receivedOTP = req.body.otp;
    const email = req.body.email;
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json(['User not Found']);
    }
    if(user.otp !== receivedOTP){
      return res.status(400).json(['Invalid OTP']);
    }
    
      user.isVerified = true;
      await user.save();
      res.status(200).json(['OTP Verification Successful'])
    
    
  }
  catch(error){
    next(error)
  }
}


module.exports = {
  register,
  otpVerification
}