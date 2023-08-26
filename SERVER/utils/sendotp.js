const nodemailer = require('nodemailer');
const random = require('randomstring');
const dotenv = require('dotenv');
dotenv.config();

const generateOtp = ()=>{
  let otp = "";
  for(let i= 0;i<6;i++){
    otp += Math.floor(Math.random()*10);
  }
  return otp;
}


const sendOtpToMail = async(email,next)=>{
  try{
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port: 587,
      secure:false,
      requireTLS:true,
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
      }
    });
    const otp = generateOtp();

    const mailOptions = {
      from : process.env.EMAIL_USER,
      to:email,
      subject: 'OTP for verifying your account',
      text: `Your One Time Password is ${otp}`
    }
     transporter.sendMail(mailOptions,(error,info,next)=>{
      console.log("sending mail status:",info.accepted);
      console.log("sending mail status:",info.rejected);
      if(error){
        next(error);
      }
    });
    return otp;
  }
  catch(error){
    next(error);
  }
}

module.exports ={
  generateOtp,
  sendOtpToMail
}