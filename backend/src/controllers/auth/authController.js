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
      success: false,
      message: "Something went wrong",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    console.log(checkUser, "checkuser findone-email");
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

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "45m" },
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "logged in successfull",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
      message: "Something went wrong",
    });
  }
};

//logout

const logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "logged out successfully",
  });
};
//auth-middleware

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };
