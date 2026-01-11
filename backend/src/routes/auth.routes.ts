import { Router } from "express";
import { loginController, logoutController, registerController, verifyAccountController } from "../controllers/auth.controller";

const authRoutes = Router()

authRoutes.post("/register" , registerController)
authRoutes.post("/login" , loginController)
authRoutes.post("/logout" , logoutController)
authRoutes.post("/confirm-account" , verifyAccountController)

export default authRoutes