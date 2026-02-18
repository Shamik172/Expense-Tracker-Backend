export const validateExpense = (req, res, next) => {
  const { amount, date } = req.body;

  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  next();
};
