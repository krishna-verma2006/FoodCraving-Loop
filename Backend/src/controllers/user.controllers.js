import express from 'express';
import userModel from '../models/user.models.js';
import { asyncHandler } from '../errorhandler/asyncHandler.js';

const userRegister=asyncHandler(async(req,res)=>{
    const {firstName,lastName,email,password}=req.body;

    const existedUser=await userModel.findOne(
        {email}
    );
    if(existedUser){
        throw new 
    }
})