import express from 'express';
import userModel from '../models/user.models.js';
import { asyncHandler } from '../errorhandler/asyncHandler.js';
import { apierror } from '../errorhandler/apierror.js';
import { apiresponse } from '../errorhandler/apiresponse.js';

const userRegister= asyncHandler( async (req,res,next)=>{
    const {fullName,email,password,}=req.body;
    if(!fullName){
        throw new apierror(201,"full name not entered")
    };
    if(!email){
        throw new apierror(201,"email not entered ")
    };
    if(!password){
        throw new apierror(201,"password is req to create account")
    };

    const isExisted= await userModel.findOne({email}).select("+password");
    if(isExisted){
        throw new apierror(201,"user already registered");
    };

    const user= userModel.create(
        {
            fullName,
            email,
            password,
        }
    )
    const userCreated= await userModel.findById(user._id).select("-password");
    return res.json(
        new apiresponse(202,"user Registred Successfully")
    );
})

const userLogin=asyncHandler(async (req,res,next)=>{
    const {email,password,otp}=req.body;
    
});