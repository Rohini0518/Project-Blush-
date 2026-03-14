import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/UserModel.js";

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({ success: false, message: "Email already exists" });
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
      message: "Something went wrong",
    });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    console.log(checkUser);
    if (!checkUser)
      return res.json({
        success: false,
        message: "User dont Exist Please SignUp",
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password,
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "In Correct Password",
      });
    }

const token=jwt.sign({
  id:checkUser._id,role:checkUser.role,email:checkUser.email
},'CLIENT_SECRET_KEY',{expiresIn:'15m'})

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

export { registerUser };
