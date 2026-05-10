import express from "express"
import { login, signup, googleLogin } from "../controllers/authController.js";
const router=express.Router()
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin);
export default router
