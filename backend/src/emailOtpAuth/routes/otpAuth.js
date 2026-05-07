import { Router } from "express";
import { emailRegex } from "../../utils/regex.js";
import { sendOtp, verifyOtp } from "../../services/authService.js";

const otpRouter = Router();

otpRouter.post("/otp/send", (req, res) => {
  const email = req.body.email;
  if (!emailRegex.test(email)) {
    return reqstatus(400).json({
      message: "InValid Email Address",
    });
  }
  sendOtp(email, res);
});

otpRouter.post("/otp/verify", async (req, res) => {
  const { email, otp } = res.body;
  if (!emailRegex.test(email) || otp.length !== 4) {
    return reqstatus(400).json({
      message: "InValid Payload Details",
    });
  }
  const { statusCode, message, token } =await verifyOtp(email, otp);
  if (token) {
    //4 weeks auth =28 days
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 28);
    res.cookie("jwt-token", token, { expries: currentDate });
  }
  res.status(statusCode).json({message})
});

export { otpRouter };
