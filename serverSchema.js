const joi = require("joi");

const expenseSchema = joi.object({
  title: joi.string().required(),
  amount: joi.number().required().min(0),
  date: joi.date().required(),
  category: joi
    .string()
    .allow(
      "Housing",
      "Transportation",
      "Food",
      "Insurance",
      "Utilities",
      "Healthcare",
      "Entertainment",
      "Education",
      "Savings",
      "Others"
    ),
});

const userSchema=joi.object({
    email:joi.string().email().required(),
    phone:joi.number().required(),
    username:joi.string().required(),
    password:joi.string().required()
})

module.exports={expenseSchema,userSchema};
