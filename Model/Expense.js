const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  title: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
    enum: [
      "Housing",
      "Transportation",
      "Food",
      "Insurance",
      "Utilities",
      "Healthcare",
      "Entertainment",
      "Education",
      "Savings",
      "Others",
    ],
  },
});

const Expense=mongoose.model('Expense',expenseSchema);
module.exports=Expense;
