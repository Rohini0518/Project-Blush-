import {Schema} from mongoose;

const userOtpSchema=new Schema({
    fullName:{
        type:String
    },
    email:{
        unique:true,
        type:String,
        required:true,
    }
})