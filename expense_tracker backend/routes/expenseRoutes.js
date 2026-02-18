import express from "express";
import {
  createExpense,
  getExpenses,
} from "../controllers/expenseController.js";
import { validateExpense } from "../middlewares/validateExpense.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, validateExpense, createExpense);
router.get("/", protect, getExpenses);

export default router;
