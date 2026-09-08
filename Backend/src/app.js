import express from 'express'

const app=express();

const PORT=3000 || process.env.PORT;

app.get('/',(req,res)=>{
    res.send("server is running on port",{PORT})
})

export default app