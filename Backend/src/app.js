import express from 'express'
import { userRouter } from './routes/user.routes.js';
import { foodPartnerRoutes } from './routes/food-partner.routes.js';
const app=express();


app.get('/',(req,res)=>{
    res.send("Hello Man");
});

// user Routes
app.use("api/v1/users",userRouter);
//food partner routes
app.use("api/v2/food-Partner",foodPartnerRoutes)

export default app