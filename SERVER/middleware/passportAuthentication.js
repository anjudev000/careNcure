const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {sendOtpToMail} = require('../utils/sendotp');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const Otp = require('../models/otpModel');
const bcrypt = require('bcryptjs');



passport.use('user',
  new localStrategy({ usernameField: 'email' },
    async (username, password, done) => {
      console.log("inside passport", username, password);
      const user = await User.findOne({ email: username });
      console.log("user is", user);

      if (!user) {
        return done(null, false, { message: 'Email is not registered' });
      }

      if (user.isblock) {
        return done(null, false, { message: 'User is blocked' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Wrong Password' });
      }

      if (!user.isVerified) {
        console.log(username, 18);
        const otp = await sendOtpToMail(username);
      console.log('line 34',otp);
     //Save otp to the otp schema
     const newOTP = new Otp({
      userId: user._id,
      otp: otp
    })
    await newOTP.save();
     //console.log('line 36',otpData);
       return done(null, false, { message: 'You are not verified. To continue login please verify your account. An OTP has been sent to your mail ', notVerified: true });
      }

      return done(null, user);
    }
  )
);
passport.use('doctor',
  new localStrategy({ usernameField: 'email' },
    async (username, password, done) => {
      console.log("inside passport", username, password);
      const doctor = await Doctor.findOne({ email: username });
      console.log("doctor is", doctor);

      if (!doctor) {
        return done(null, false, { message: 'Email is not registered' });
      }

      if (doctor.isBlocked) {
        return done(null, false, { message: 'Doctor is blocked' });
      }

      const passwordMatch = await bcrypt.compare(password, doctor.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Wrong Password' });
      }

      if (!doctor.isVerified) {
        console.log(username, 18);
        const otp = await sendOtpToMail(username);
      console.log('line 34',otp);
     //Save otp to the otp schema
     const newOTP = new Otp({
      doctorId: doctor._id,
      otp: otp
    })
    await newOTP.save();
     //console.log('line 36',otpData);
       return done(null, false, { message: 'You are not verified. To continue login please verify your account. An OTP has been sent to your mail ', notVerified: true });
      }

      return done(null, doctor);
    }
  )
);
