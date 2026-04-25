import { Router } from "express";
import { emailRegex } from "../../utils/regex";

const  otpRouter=Router();

otpRouter.post("/otp/send",(req,res)=>{
    const email=req.body.email;
    if(!emailRegex.test(email)){
        return reqstatus(400).json({
            message:"InValid Email Address"
        })
    }
})



export {otpRouter}

