import Expense from "../models/Expense.js";
import mongoose from "mongoose";

export const createExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;
  const idempotencyKey =
    req.headers["idempotency-key"] || Date.now().toString();

  // check existing expense for same user
  const existing = await Expense.findOne({
    idempotencyKey,
    user: req.user,
  });

  if (existing) return res.status(200).json(existing);

  const expense = await Expense.create({
    amount: mongoose.Types.Decimal128.fromString(amount.toString()),
    category,
    description,
    date,
    idempotencyKey,
    user: req.user,
  });

  res.status(201).json(expense);
};

export const getExpenses = async (req, res) => {
  const { category, sort } = req.query;

  let query = { user: req.user };

  if (category && category.trim() !== "") {
    query.category = category;
  }

  let expensesQuery = Expense.find(query);

  if (sort === "date_desc" || !sort) {
    expensesQuery = expensesQuery.sort({ date: -1 });
  }

  const expenses = await expensesQuery;
  res.json(expenses);
};
