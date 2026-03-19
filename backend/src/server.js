import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth/authRoute.js";
import adminproductsrouter from './routes/admin/admin-products-routes.js'
import { configureCloudinary } from "./helpers/cloudinaryConfig.js";

configureCloudinary(); 
const app = express();

//cookie parseris a middleware that translates browser cookies into redable javascript objects
//cors is a middleware that controls who can talk to our api
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    // allowedHeaders: [
    //   "Content-Type",
    //   "Authorization",
    //   "Cache-Control",
    //   "Expires",
    //   "Pragma",
    // ],
    credentials: true,
  }),
);



app.use(express.json());
//incoming data parser,This middleware runs before your controller.
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/admin/products",adminproductsrouter)
app.get("/", (req, res) => {
  res.send("Blush backedn running 🚀🚀");
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
 console.log("mongodb connected"))
  .catch((error) => 
    console.log("error-", error));

//  mongodb+srv://rohinipolina0518_db_user:<db_password>@clusterblush.1axaliw.mongodb.net/
