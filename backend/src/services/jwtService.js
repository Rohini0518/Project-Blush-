 import jwt from 'jsonwebtoken'
 import dotenv from 'dotenv';
dotenv.config();



 export function generateToken(claims){
 return jwt.sign(claims,process.env.JWTSSECRETDUMMY,{expiryin:"4W"})
 }