import UserOtpModel from "../emailOtpAuth/UserOtpModel.js";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer'
import UserOtp from "../emailOtpAuth/UserOtpModel.js";
//sends an otp to the specified email address.

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL,
        pass:process.env.EMAILPASS
    }
});
transporter.verify((error, success) => {
  if (error) {
    console.log("Transport Error:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});
console.log(transporter.options.auth);
//sends an otp to specified email address.
const sentOtpEmail = async (email, otp) => {
  return transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Login OTP for Blush App",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 40px 20px;
      ">
        <div style="
          max-width: 500px;
          margin: auto;
          background: white;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        ">
          
          <h1 style="color: #ff4d6d; margin-bottom: 10px;">
            Blush App 💖
          </h1>

          <p style="
            font-size: 16px;
            color: #555;
            margin-bottom: 25px;
          ">
            Use the OTP below to login to your account.
          </p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #222;
            background: #ffe5ec;
            padding: 15px;
            border-radius: 10px;
            display: inline-block;
            margin-bottom: 25px;
          ">
            ${otp}
          </div>

          <p style="
            color: #777;
            font-size: 14px;
            line-height: 1.6;
          ">
            This OTP is valid for 5 minutes. <br/>
            Please do not share it with anyone.
          </p>

          <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />

          <p style="
            font-size: 12px;
            color: #999;
          ">
            © 2026 Blush App. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
};

export const sendOtp = async (email,res) => {
  try {
    const UserOtp = await UserOtpModel.findOne({ email });
    const currentTimeStamp = parseInt(new Date().getTime() / 1000);
    if (
      UserOtp &&
      UserOtp?.otpExpiry &&
      UserOtp?.otpExpiry > currentTimeStamp
    ) {
      return res
        .status(400)
        .json({ message: "An Otp Already Sent To Your Email, Please Check" });
    }
// user may not exist
// user exists but otp got expired

const otpcreate = Math.floor(1000 + Math.random() * 9000);    const otpExpiry = currentTimeStamp + 600;
    await sentOtpEmail(email, otpcreate);
    //Once the otp is sent we need to record that otp in our database.
    if (UserOtp) {
      UserOtp.otpcreate = otpcreate;
      UserOtp.otpExpiry = otpExpiry;
      await UserOtp.save();
    } else {
      console.log("Otp sent for new user",UserOtp)
      await UserOtpModel.create({
        email,
        otpcreate,
        otpExpiry,
        createdAt: currentTimeStamp,
        updatedAt: currentTimeStamp,
      });
    }
    res.status(200).json({message:"Otp sent succesfully"})
  } catch (error) {
    console.log("An error occured while sending otp",error.message)
    res.status(500).json({message:error.message})
  }
};

export const verifyOtp=async (email,ToVerifyotp)=>{
try{
const user=await UserOtp.findOne({email});
if(!user){
  return {statusCode:404,message:"User Not Found"}
}
if(!user.otp) return {statusCode:404,message:"Otp Not Found Please Send An Otp"};

const currentTimeStamp=Math.floor(new Date().getTime()/1000);
if(user.otpExpiry < currentTimeStamp) return {statusCode:410,message:"Otp Expired Resend Again"}

if(user.otp !== verifyOtp) return {statusCode:400,message:"Invalid Otp Entered Please Check"};

//if it passes all above email and otp are verified
//1.delete Otp and otpexpiry from database
//2.generate JWT with users details
 await UserOtp.updateOne({_id:user._id},{$unset:{"otp":"",otpExpiry:""}})
 const token=generateToken({id:user._id,role:user.role});
 return {statusCode:200,message:"Login Success",token}
}


catch(error){
 return {statusCode:500,message:error.message}
}
}