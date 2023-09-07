const User = require('../models/userModel');
const {sendOtpToMail} = require('../utils/sendotp');
const {sendLinkToMail} = require('../utils/sendLink');
const {clearExiredOtp} = require('../utils/otpExpire');
const passport = require('passport');
const _ = require('lodash');
const random = require('randomstring');
const bcrypt = require('bcryptjs');



const securePassword = async(password,next)=>{
try{
  console.log("password line 14",password);
  const hashedPassword = await bcrypt.hash(password,10);
  console.log(hashedPassword,1555);
  return hashedPassword;
}
catch(error){
  next(error);
}
}

const register = async (req, res,next) => {
  try {
    const { fullName, mobile_num,email, password } = req.body;
    console.log("testing line 26",fullName,mobile_num,email,password);
    const newUser = new User({
      fullName,
      mobile_num,
      email,
      password: await securePassword(password)
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
   },60000);

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
    console.log("fffffffff",user.otp,receivedOTP);
    console.log(typeof(user.otp),typeof(receivedOTP));
    if(user.otp != receivedOTP){
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


const login = (req, res, next) => {
  console.log("inside login controller");
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json(info);
    }
    
    // Assuming user.generateToken() is a valid method
    return res.status(200).json({ "userToken": user.generateToken() });
  })(req, res, next);
};

const userHome = async(req,res,next)=>{
  try{
    const user = await User.findOne({_id:req._id});
    if(!user){
      return res.status(404).json({status:false,message:'User not found'});
    }
    else{
      return res.status(200).json({
        status:true,
        user:_.pick(user,['fullName'])
      })
    }
  }
  catch(error){
    next(error);
  }
}

const getUserInfo = async(req,res,next)=>{
  try{
 const userId = req.params.userId;
 const userInfo = await User.findById(userId);
 res.status(200).json({Name: userInfo.fullName})
  }
  catch(error){
    next(error)
  }
}

const forgetSendLink = async(req,res,next)=>{
  try{
    const email = req.body.email;
    const user = await User.findOne({email:email});
    if(user){
      let randomString = random.generate();
      const updateUser = await User.updateOne({email:email},{$set:{token:randomString}});
      sendLinkToMail(user.email,user.fullName,randomString);
      res.status(200).json({message: 'Link is send to your mail to reset password'});
    }else{
      res.status(400).json({message:'Invalid Email'});
    }
  }
  catch(error){
    next(error);
  }
}

const updatePassword = async(req,res,next)=>{
  try{
    const userId = req.body.userId;
    const newPassword = req.body.newPassword;
    console.log('new password is:',newPassword);
    const hashedPassword = await securePassword(newPassword);
    console.log('hashedPassword is:',hashedPassword);
    const updateUser = await User.findByIdAndUpdate({_id:userId},{$set:{password:hashedPassword,token: ''}});
    res.status(200).json({message: 'Password changed successfully'});
    
  }
  catch(error){
    next(error);
  }
}

const getUserIdfromToken =async(req,res,next)=>{
  try{
    const token = req.params.token
    const user = await User.findOne({token:token});
    if(user){
      res.status(200).json({userId:user._id});
    }
    else{
      res.status(404).json({message:'Invalid Token!'})
    }
  }
  catch(error){
    next(error);
  }
} 



module.exports = {
  register,
  otpVerification,
  login,
  userHome,
  getUserInfo,
  forgetSendLink,
  updatePassword,
  getUserIdfromToken
}