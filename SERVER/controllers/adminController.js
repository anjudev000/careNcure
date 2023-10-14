const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const dotenv = require('dotenv');
dotenv.config();
const _ = require('lodash');
const { sendApprovalMail } = require('../utils/sendApprovalMail');
const { sendRejectMail } = require('../utils/rejectMail');


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
// const getName = async(req,res,next)=>{
//   try{
//     const adminId = req.params.adminId;
//     const adminName = await Admin.findById(adminId);
//     res.status(200).json({Name:adminName})
//   }
//   catch(error){
//     next(error);
//   }
// }

const getUserList = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users) return res.status(200).json({ users });
    else return res.status(404).json({ message: "No Users Found" });
  }
  catch (error) {
    next(error);
  }
}

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    if (doctors) return res.status(200).json({ doctors });
    else return res.status(404).json({ mesasge: "Doctors not found" });
  }
  catch (error) {
    next(error);
  }
}

const blockUnblockUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId, 456);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isblock = !user.isblock; // Toggle isblock status

    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}


const blockUnblockDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    doctor.isblock = !doctor.isblock;

    const updatedDoctor = await doctor.save();
    return res.status(200).json({ updatedDoctor });
  }
  catch (error) {
    next(error);
  }
}

const approveDoctor = async (req, res, next) => {
  try {
    console.log(111222);
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId)
    if (doctor) {
      const update = await Doctor.updateOne({ _id: doctorId }, { $set: { status: "Approved" } },{runValidators:true});
      //send approval mail
      sendApprovalMail(doctor.email, doctor.fullName);
      return res.status(200).json({ update });
    }
    return res.status(404).json({error:'not found'})
  }
  catch (error) {
    console.log(error.message);
    next(error)
  }
}

const rejectDoctor = async (req, res, next) => {
  try {

    const doctorId = req.params.doctorId;
    const {messageInput} = req.body;
    console.log(134,req.body);
    console.log(133,messageInput);
    const doctor = await Doctor.findById(doctorId);
    if (doctor){
      const update = await Doctor.findByIdAndUpdate({_id: doctorId},{$set:{status:"Rejected"}},{runValidators:true});
      //send rejection mail
      sendRejectMail(doctor.email, doctor.fullName,messageInput);
      return res.status(200).json({ update });
    }
    return res.status(404).json({ error: 'not found' });
    }
  catch (error) {
    console.log(error.message);
    next(error);
  }
}


module.exports = {
  login,
  adminProfile,
  getUserList,
  getDoctors,
  blockUnblockUser,
  blockUnblockDoctor,
  approveDoctor,
  rejectDoctor
}