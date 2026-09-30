import userModel from "../models/user.models.js";
import { apierror } from "./apierror.js";

const generateTokens= async(userId)=>{
    try {
        const user=await userModel.findById(userId);
        if(!user){
            throw new apierror(202,"user does not exists");
        };
        const accessToken=await user.generateAccessToken();
        const refreshToken=await user.generateRefreshToken();
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken}
    } catch (error) {
        console.log(error);

        throw new apierror("error occured while generating accessToken and refreshToken");
   };
}

export {generateTokens};
