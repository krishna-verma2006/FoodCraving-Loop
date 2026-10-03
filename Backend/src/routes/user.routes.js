import { Router } from "express";
import { userLogin } from "../controllers/user.controllers.js";
import { userLogout } from "../controllers/user.controllers.js";
import { userRegister } from "../controllers/user.controllers.js";
import { getProfile } from "../controllers/user.controllers.js";

const userRouter=Router();

userRouter.post("/register",userRegister);

export {userRouter}