import express from 'express';
import {registerUser, loginUser} from '../../controllers/auth/authController.js'

const authRouter=express.Router();

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser);


export default authRouter