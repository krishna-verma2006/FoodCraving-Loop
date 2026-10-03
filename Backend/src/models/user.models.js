import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        select:false,
    }
},
    {
        timestamps: true
    }
);

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return ;
    this.password= bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect=async function (password){
    const passCheck=await bcrypt.compare(password,this.password);
    return passCheck;
};

userSchema.methods.generateAccessToken=function (){
    return jwt.sign(
        {
            _id:this._id,
            fullName:this.fullName,
            email:this.email,
            password:this.password
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_SECRET
        }
    )
};

userSchema.methods.generateRefreshToken=function (){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const userModel = mongoose.model("user", userSchema);

export default userModel;