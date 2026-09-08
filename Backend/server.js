import express from 'express'
import app from './src/app.js'
import { configDotenv } from 'dotenv';

configDotenv();

app.listen(process.env.PORT,()=>{
    console.log("server is running on port",process.env.PORT);
});
