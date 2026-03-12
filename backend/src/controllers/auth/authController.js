import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/UserModel";

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password:hashPassword
    });
    await newUser.save();
    res.status(200).json({
     success:true,
     message:"Registration Successful"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
      message: "Something went wrong",
    });
  }
};

//login
const login = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
      message: "Something went wrong",
    });
  }
};

//logout

//auth-middleware












export {registerUser}