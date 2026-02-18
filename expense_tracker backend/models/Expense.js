import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: String,
  description: String,
  date: Date,
  created_at: {
    type: Date,
    default: Date.now,
  },
  idempotencyKey: String,
});

export default mongoose.model("Expense", expenseSchema);
