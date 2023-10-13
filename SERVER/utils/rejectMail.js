const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();



const sendRejectMail = async(email,name,next)=>{
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
   

    const mailOptions = {
      from : process.env.EMAIL_USER,
      to:email,
      subject: 'CAREnCURE REJECTION MAIL',
      text: `HELLO DR. ${name} ! YOUR ACCOUNT HAS BEEN REJECTED BY THE ADMIN. CONTACT THE PLATFORM FOR MORE INFORMATION!`
    }
     await transporter.sendMail(mailOptions);
     
  }
  catch(error){
    // next(error);
    console.log('error',error);
    throw new Error('Failed to send OTP via email.');
  }
}

module.exports ={
  sendRejectMail
}