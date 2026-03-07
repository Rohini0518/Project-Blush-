import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app=express();
dotenv.config();

//cookie parseris a middleware that translates browser cookies into redable javascript objects
//cors is a middleware that controls who can talk to our api
app.use(cors({
    origin:'http://localhost:5173/',
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:[
        "content-Type","Authorization","Cache-Control","Expires","Pragma"
    ],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Blush backedn running 🚀🚀");
})
 
app.listen(5000,()=>{
    console.log("server running on port 5000");
})
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('momgodb connected'))
.catch(error=>console.log("error-",error))

//  mongodb+srv://rohinipolina0518_db_user:<db_password>@clusterblush.1axaliw.mongodb.net/ 