import express from 'express'
import { userRouter } from './routes/user.routes.js';
const app=express();


app.get('/',(req,res)=>{
    res.send("Hello Man");  // req comig fr
});

// user Routes
app.use("api/v1/users",userRouter);
//food partner routes

export default app