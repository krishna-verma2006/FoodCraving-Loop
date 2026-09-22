import express from 'express';
import mongoose from 'mongoose';

const databaseConnect=async ()=>{
    try {
        const db=await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Finally MongoDb connected",`${db.connection.host}`);
    
    } catch (error) {
        console.log("Mongodb connection failed",error);
        process.exit(1);
    }
};

export default databaseConnect;