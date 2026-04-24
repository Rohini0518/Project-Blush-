import {Schema,model} from mongoose;
import { emailRegex } from "../utils/regex";

const USER_ROLES={
    ADMIN:"ADMIN",
    CITIZEN:"CITIZEN"
}



const userOtpSchema=new Schema({
    fullName:{
        type:String
    },
    email:{
        unique:true,
        type:String,
        required:true,
        validate:{
            validator:(value)=>{
                return emailRegex.test(value)
            },
            message:"InValid Email Address"
        }
    },
    role:{
        type:String,
        enum:[USER_ROLES.ADMIN,USER_ROLES.CITIZEN],
        default:USER_ROLES.CITIZEN
    },
    otp:Number,
    otpExpiry:Number,//epoch time in seconds
    createdAt:Number,
    updatedAt:Number
})

const Otp=model("Otp",userOtpSchema)
export default Otp;