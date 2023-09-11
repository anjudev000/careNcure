const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const dotenv = require('dotenv');
dotenv.config();
const _ = require('lodash');


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminDetails = await Admin.findOne({ email, password });
    if (!adminDetails) return res.status(401).json({ message: "Invalid Credentials" });
    else return res.status(200).json({ "adminToken": adminDetails.generateToken() });
  }
  catch (error) {
    next(error);
  }
}
const adminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ _id: req._id });
    if (!admin) {
      return res.status(404).json({ status: false, message: 'Not Found' });
    } else {
      return res.status(200).json({
        status: true,
        user: _.pick(admin, ['email'])
      })
    }
  }
  catch (error) {
    next(error);
  }
}

const getUserList = async(req,res,next)=>{
  try{
    const users = await User.find();
    if(users) return res.status(200).json({users});
    else return res.status(404).json({message:"No Users Found"});
  }
  catch(error){
    next(error);
  }
}

const getDoctors = async(req,res,next)=>{
  try{
    const doctors = await Doctor.find();
    if(doctors) return res.status(200).json({doctors});
    else return res.status(404).json({mesasge : "Doctors not found"});
  }
  catch(error){
    next(error);
  }
}

const blockUnblockUser = async(req,res,next)=>{
  try{
    
    const {userId} = req.params;
    console.log(userId,456);
    const user = await User.findById(userId);
    if(user.isblock){
      user.isblock = false;
    }else{
      user.isblock = true;
    }
    const updatedUser = await user.save();
    return res.status(200).json({updatedUser});
  }
  catch(error){
    next(error);
  }
}

const blockUnblockDoctor = async(req,res,next)=>{
  try{
    const {doctorId} =req.params;
    const doctor = await Doctor.findById(doctorId);
    if(doctor.isBlocked){
      doctor.isBlocked = false;
    }else{
      doctor.isBlocked = true;
    }
    const updatedDoctor = await doctor.save();
    return res.status(200).json({updatedDoctor});
  }
  catch(error){
    next(error);
  }
}


module.exports = {
  login,
  adminProfile,
  getUserList,
  getDoctors,
  blockUnblockUser,
  blockUnblockDoctor
}