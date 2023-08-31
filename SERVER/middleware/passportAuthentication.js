const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {sendOtpToMail} = require('../utils/sendotp');
const {clearExiredOtp} = require('../utils/otpExpire');
const User = require('../models/userModel');

passport.use(
  new localStrategy({usernameField:'email'},
async(username,password,done)=>{
    const user = await User.findOne({email:username});
    if(!user){
      return done(null,false,{message:'Email is not registered'});
    }
    else if(user.verifyPassword(password)){
      return done(null,false,{message:'Wrong Password'});
    }
    else if(!user.isVerified){
      console.log(username,18);
      const otp = await sendOtpToMail(username);
      await User.findOneAndUpdate({email:username},{otp});
      setTimeout(async() => {
        await clearExiredOtp(username)
      }, 60000);
      return done(null,false,{message:'You are not verified. To continue login please verify your account. An OTP has been sent to your mail ', notVerified:true});
    }
     else if(user.isblock){
      return done(null,false,{message:'User is blocked'});
    }
    else{
      return done(null,user);
    }
  }));