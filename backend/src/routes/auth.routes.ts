import { Router } from "express";
import { loginController, logoutController, registerController, verifyAccountController } from "../controllers/auth.controller";
import { upload } from "../config/cloudinary.config";

const authRoutes = Router()

authRoutes.post("/register" , upload.single("profile-picture") , registerController)
authRoutes.post("/login" , loginController)
authRoutes.post("/logout" , logoutController)
authRoutes.post("/confirm-account" , verifyAccountController)

export default authRoutes