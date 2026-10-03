import express from 'express';
import userModel from '../models/user.models.js';
import { asyncHandler } from '../errorhandler/asyncHandler.js';
import { apierror } from '../errorhandler/apierror.js';
import { apiresponse } from '../errorhandler/apiresponse.js';
import { generateTokens } from '../errorhandler/generateTokens.js';

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
    const {email,password}=req.body;
    if(!email || !password){
        throw new apierror(202,"please write email and password properly")
    };
    const user=await userModel.findOne({email}).select("+password");
    if(!user){
        throw new apierror(203,"User does not exits")
    };
    const check=await userModel.isPasswordCorrect(password,this.password);
    if(!check){
        throw new apierror(202,"user does not exists")
    };

    const {accessToken,refreshToken}=await generateTokens(user._id);
    const loggedInUser=await userModel.findById(user._id).select("-password");
    const options={
        httpOnly:true,
        secure:false
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiresponse(
            200,
            {user:loggedInUser,
                accessToken}
            ,"UserLOgged in successfully ")
    );

});

const userLogout = asyncHandler(async (req, res, next) => {

    const user = await userModel.findById(req.user._id);

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken");

    return res.status(202).json(
        new apiresponse(202, "Finally user logout successfully")
    );
});

const getProfile = asyncHandler(async(req,res,next)=>{
    const userPerson= await userModel.findById(user._id);
    if(!userPerson){
        throw new apierror(202,"User does not find");
    }
    return res.status(202).json(
        new apiresponse(202,"finally the user found and we find him")
    )
})


export {
    userRegister,
    userLogin,
    userLogout,
    getProfile
}