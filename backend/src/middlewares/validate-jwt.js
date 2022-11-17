import { response,request } from 'express'
import jwt from 'jsonwebtoken'

export const validateJWT = (req=request,res = response,next) =>{
    const token =req.header('x-token');
    console.log(token);
    console.log('holas')
    next();
    }