import mongoose from "mongoose";
import bcrypt from 'brcypt';


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

const userModel = mongoose.model("user", userSchema);

export default userModel;