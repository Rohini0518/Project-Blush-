import Otp from "../emailOtpAuth/UserOtpModel";
import nodemailer from 'nodemailer'
//sends an otp to the specified email address.


const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"rohinipolina@gmail.com",
        pass:""
    }
})
const sentOtpEmail = async (email, otp) => {};

const sendOtp = async (email) => {
  try {
    const UserOtp = await Otp.findOne({ email });
    const currentTimeStamp = parseInt(new Date().getTime() / 1000);
    if (
      UserOtp &&
      UserOtp?.otpExpiry &&
      UserOtp?.otpExpiry > currentTimeStamp
    ) {
      return res
        .status(400)
        .json({ message: "An Otp ALready sent to Your Email, Please Check" });
    }

    const otpcreate = parseInt(Math.random() * 1000);
    const otpExpiry = currentTimeStamp + 600;
    await sentOtpEmail(email, otpcreate);
    //Once the otp is sent we need to record that otp in our database.
    if (UserOtp) {
      UserOtp.otpcreate = otpcreate;
      UserOtp.otpExpiry = otpExpiry;
      await UserOtp.save();
    } else {
      await User.create({
        email,
        otpcreate,
        otpExpiry,
        createdAt: currentTimeStamp,
        updatedAt: currentTimeStamp,
      });
    }
  } catch (error) {}
};
