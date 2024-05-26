import { Router } from "express";
import { signIn, signUp } from "./customer.controller.js";
import { checkEmailExist } from "../../middleware/checkEmailExist.js";

const customerRouter = Router();

customerRouter.post("/signup", checkEmailExist, signUp);
customerRouter.get("/signin", signIn);

export default customerRouter;
