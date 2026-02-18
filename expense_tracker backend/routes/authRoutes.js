import express from "express";
import { login, register, logout, getMe } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// check logged-in user
router.get("/me", protect, getMe);

export default router;
