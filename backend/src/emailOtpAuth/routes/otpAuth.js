import { Router } from "express";
import { emailRegex } from "../../utils/regex.js";
import { sendOtp } from "../../services/authService.js";

const  otpRouter=Router();

otpRouter.post("/otp/send",(req,res)=>{
    const email=req.body.email;
    if(!emailRegex.test(email)){
        return reqstatus(400).json({
            message:"InValid Email Address"
        })
    }
sendOtp(email,res)

})
 


export {otpRouter}

