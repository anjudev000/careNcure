const mongoose = require('mongoose');
const User = require('../models/userModel');


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


module.exports = {
  register
}