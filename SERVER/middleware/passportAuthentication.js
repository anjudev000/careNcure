const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const {sendOtpToMail} = require('../utils/sendotp');
const {clearExiredOtp} = require('../utils/otpExpire');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');



passport.use(
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
        await User.findOneAndUpdate({ email: username }, { otp });
        setTimeout(async () => {
          await clearExiredOtp(username);
        }, 60000);
        return done(null, false, { message: 'You are not verified. To continue login please verify your account. An OTP has been sent to your mail ', notVerified: true });
      }

      return done(null, user);
    }
  )
);
