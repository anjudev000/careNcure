const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const { sendOtpToMail } = require('../utils/sendotp');
const { sendLinkToMail } = require('../utils/sendLink');
const passport = require('passport');
const _ = require('lodash');
const random = require('randomstring');
const {securePassword} = require('../utils/passwordHashing');
const cloudinary = require('cloudinary').v2;





const register = async (req, res, next) => {
  try {
    const { fullName, mobile_num, email, password } = req.body;
    console.log("testing line 26", fullName, mobile_num, email, password);
    const newUser = new User({
      fullName,
      mobile_num,
      email,
      password: await securePassword(password)
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    //send OTP after saving user to database
    const otp = await sendOtpToMail(newUser.email);

    //Save otp to the otp schema
    const newOTP = new Otp({
      userId: savedUser._id,
      otp: otp
    })
    await newOTP.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      if (error.keyPattern.mobile_num) {
        res.status(422).json(['Duplicate mobile number found.']);
      }
      else if (error.keyPattern.email) {
        res.status(422).json(['Duplicate email found.']);
      }
    } else {
      next(error);
    }
  };
}

const otpVerification = async (req, res, next) => {
  try {
    const receivedOTP = req.body.otp;
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(['User not Found']);
    }
    const otpData = await Otp.findOne({ userId: user._id });
    console.log("line 73", otpData.otp, receivedOTP);

    if (!otpData) {
      return res.status(404).json(['OTP not found']);
    }
    if (otpData.otp != receivedOTP) {
      return res.status(400).json(['Invalid OTP']);
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json(['OTP Verification Successful'])
  }
  catch (error) {
    next(error)
  }
}


const login = (req, res, next) => {
  console.log("inside login controller");
  passport.authenticate('user', (err, user, info) => {
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

const userHome = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req._id });
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    else {
      return res.status(200).json({
        status: true,
        user: _.pick(user, ['fullName'])
      })
    }
  }
  catch (error) {
    next(error);
  }
}

const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userInfo = await User.findById(userId);
    res.status(200).json({ Name: userInfo.fullName })
  }
  catch (error) {
    next(error)
  }
}

const forgetSendLink = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      let randomString = random.generate();
      const updateUser = await User.updateOne({ email: email }, { $set: { token: randomString } });
      sendLinkToMail(user.email, user.fullName, randomString);
      res.status(200).json({ message: 'Link is send to your mail to reset password' });
    } else {
      res.status(400).json({ message: 'Invalid Email' });
    }
  }
  catch (error) {
    next(error);
  }
}

const updatePassword = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const newPassword = req.body.newPassword;
    console.log('new password is:', newPassword);
    const hashedPassword = await securePassword(newPassword);
    console.log('hashedPassword is:', hashedPassword);
    const updateUser = await User.findByIdAndUpdate({ _id: userId }, { $set: { password: hashedPassword, token: '' } });
    res.status(200).json({ message: 'Password changed successfully' });

  }
  catch (error) {
    next(error);
  }
}

const getUserIdfromToken = async (req, res, next) => {
  try {
    const token = req.params.token
    const user = await User.findOne({ token: token });
    if (user) {
      res.status(200).json({ userId: user._id });
    }
    else {
      res.status(404).json({ message: 'Invalid Token!' })
    }
  }
  catch (error) {
    next(error);
  }
}

const profileDetails = async(req,res,next)=>{
  try{
    const user = await User.findById({_id:req.params.userId})
    if(user){
      res.status(200).json({userData:user});
    }else{
      console.log('Something went wrong!');
    }
  }
  catch(error){
    next(error);
  }
}

const updateProfile = async(req,res,next)=>{
  try{
    
    const userId= req.params.userId;
    const updateFields = req.body;
    console.log(195,updateFields);
  if(req.file){
    //upload the file to cloudinary
  
    const result = await cloudinary.uploader.upload(req.file.path,{
      folder: 'careNcure_Uploads',
      resource_type: 'auto',
      allowed_formats: ['jpg', 'png'],
       transformation: [{  width: "auto",
       crop: "scale" }]
    });
    
    //update the userprofile with cloudinary url
    updateFields.profilePic = result.secure_url
  }
    const updatedUser = await User.findByIdAndUpdate(userId,updateFields,{new:true});
  
    if(!updatedUser){
       return res.status(404).json({ message: 'User not found' });
    }return res.status(200).json({updatedUser})
  }
  catch(error){
    console.log(216,error.message);
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
  getUserIdfromToken,
  profileDetails,
  updateProfile,
  
}