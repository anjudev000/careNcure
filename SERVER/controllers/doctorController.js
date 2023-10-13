const Doctor = require('../models/doctorModel');
const {securePassword} = require('../utils/passwordHashing');
const {sendOtpToMail} = require('../utils/sendotp');
const Otp = require('../models/otpModel');
const passport = require('passport');
const _ = require('lodash');
const random = require('randomstring');
const {sendLinkToDoctorMail} = require('../utils/sendLink');
const cloudinary = require('cloudinary').v2;



const register = async(req,res,next)=>{
  try{
    const {fullName,mobile_num,email,password} = req.body;
    const newDoctor = new Doctor({
      fullName,
      mobile_num,
      email,
      password: await securePassword(password)
    });
    //Save the user to the database
    const savedDoctor = await newDoctor.save();
    //send OTP after saving user to database
    const otp = await sendOtpToMail(newDoctor.email);
    //save the otp to database 
    const newOtp = new Otp({
      doctorId: savedDoctor._id,
      otp:otp
    });
    await newOtp.save();
    res.status(201).json(savedDoctor);

  }
  catch(error){
    if(error.code === 11000){
      if(error.keyPattern.mobile_num){
        res.status(422).json(['Duplicate mobile number found']);
      }else if(error.keyPattern.email){
        res.status(422).json(['Duplicate email found']);
      }else{
        next(error);
      }
    }
    
  }
}

const otpVerify = async(req,res)=>{
  try{
    const email = req.body.email;
    const receivedOTP = req.body.otp;
    const doctor = await Doctor.findOne({email});
    if(!doctor){
      return res.status(404).json(['Doctor Not Found']);
    }
    const otpData = await Otp.findOne({doctorId:doctor._id})
    if(!otpData){
      return res.status(404).json(['OTP not found']);
    }
    if(otpData.otp!=receivedOTP){
      return res.status(400).json(['Invalid OTP']);
    }
    doctor.isVerified = true;
    await doctor.save();
    res.status(200).json(['OTP Verification Successfull']);
  }
  catch(error){

  }
}

const login = (req,res,next)=>{
passport.authenticate('doctor',(err,doctor,info)=>{
  if(err){
    return next(err);
  }
  if(!doctor){
    return res.status(404).json(info);
  }
  return res.status(200).json({"doctorToken":doctor.generateToken()});
})(req,res,next);
}

const getHome = async(req,res,next)=>{
try{
const doctor = await Doctor.findOne({_id:req._id});
if(!doctor){
  return res.status(404).json({status:false,message:'No doctor found'});
}
else{
  return res.status(200).json({status:true,doctor:_.pick(doctor,['fullName'])})
}
}
catch(error){
  next(error)
}
}

const getDoctorName = async(req,res,next)=>{
  try{
    const doctorId = req.params.doctorId;
    const doctorinfo = await Doctor.findById(doctorId);
    res.status(200).json({Name: doctorinfo.fullName});
  }
  catch(error){
    next(error)
  }
}

const forgotSendLink = async(req,res,next)=>{
  try{
    const email = req.body.email;
    const doctor = await Doctor.findOne({email:email});
    if(doctor){
      let randomString = random.generate();
      const updatedData = await Doctor.updateOne({email:email},{$set:{token: randomString}});
      sendLinkToDoctorMail(doctor.email,doctor.fullName,randomString);
      res.status(200).json({ message: 'Link is send to your mail to reset password' });
    }else {
      res.status(400).json({ message: 'Invalid Email' });
    }
  }

  catch(error){
    next(error);
  }
}

const updatePassword = async(req,res,next)=>{
  try{
    const doctorId = req.body.doctorId;
    const newPassword = req.body.newPassword;
    const hashedPassword = await securePassword(newPassword);
    await  Doctor.findByIdAndUpdate({_id:doctorId},{$set:{password: hashedPassword,token: ''}});
    res.status(200).json({ message: 'Password changed successfully' });

  }
  catch(error){
    next(error);
  }
}

const getIdFromToken = async(req,res,next)=>{
  try{
    const token = req.params.token;
    const doctorData = await Doctor.findOne({token:token});
    if(doctorData){
      const doctorId = doctorData._id;
      return res.status(200).json({doctorId:doctorId});
    }
    else
     return res.status(404).json({message: 'Invalid Token'});
  }
  catch(error){
    next(error);
  }
}

const profileDetails = async(req,res,next)=>{
  try{
    const doctor = await Doctor.findById({_id:req.params.doctorId})
    if(doctor){
      res.status(200).json({doctorData:doctor});
    }else{
      console.log('Something went wrong');
    }
  }
  catch(error){
    next(error)
  }
}

const updateprofile = async(req,res,next)=>{
  try{
      const doctorId = req.params.doctorId;
      const updateFields = req.body;
      console.log(17888,updateFields);
      if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path,{
          folder: 'careNcure_doctor_uploads',
          resource_type: 'auto',
          allowed_formats: ['jpg', 'png'],
           transformation: [{  width: "auto",
           crop: "scale" }]
        }); 
        updateFields.profilePic = result.secure_url
       }
       const updateData = await Doctor.findByIdAndUpdate(doctorId,updateFields,{new:true});
       if(!updateData){
        return res.status(404).json({message:'Doctor Not Found'});
       }
       return res.status(200).json({updateData});
  }
  catch(error){
    console.log(19555,error.message);
    next(error);
  }
}

module.exports = {
  register,
  otpVerify,
  login,
  getHome,
  getDoctorName,
  forgotSendLink,
  updatePassword,
  getIdFromToken,
  profileDetails,
  updateprofile
}