const express = require("express");
const router = express.Router();
const User = require("../Model/User.js");
const Expense = require("../Model/Expense.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateUser,
  auth,
  validateExpense,
} = require("../utils/validation.js");
const error = require("../utils/error.js");

//Create a new user.
router.post(
  "/",
  validateUser,
  wrapAsync(async (req, res, next) => {
    let data = req.body;
    let user = new User(data);
    let saveUser = await User.register(user, data.password);
    req.login(saveUser, (err) => {
      if (err) return next(err);
      else {
        req.flash('success','SignUp sucessfully!')
        return res.redirect("/user/dashboard");
      }
    });
  })
);

router.get(
  "/dashboard",
  auth,
  wrapAsync(async (req, res) => {
    let id = req.user._id;
    let user = await User.findById(id);
    if (user) return res.render("expense/index.ejs", { user });
    else throw new error(400, "Bad Request");
  })
);

router.get(
  "/dashboard/tracker",
  auth,
  wrapAsync(async (req, res) => {
    let id = req.user._id;
    let user = await User.findById(id).populate("expenses");
    user.expenses.sort((a, b) => b.date - a.date);
    res.render("expense/tracker.ejs", { user });
  })
);

router.post(
  "/dashboard/tracker",
  auth,
  validateExpense,
  wrapAsync(async (req, res) => {
    let data = req.body;
    let user = await User.findById(req.user._id);
    let expense = new Expense(data);
    expense = await expense.save();
    user.expenses.push(expense);
    await user.save();
    res.redirect("/user/dashboard/tracker");
  })
);

router.delete('/dashboard/tracker/:id',auth,wrapAsync(async (req,res)=>{
  let userid=req.user._id;
  let {id}=req.params;
  await User.findByIdAndUpdate(userid,{$pull:{expenses:id}});
  await Expense.deleteOne({_id:id});
  res.redirect('/user/dashboard/tracker');
}))

router.get("/dashboard/tracker/previousDay", auth, async (req, res) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let user = await User.findById(req.user._id).populate({
    path: "expenses",
    match: {
      date: {
        $gte: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate()
        ),
        $lt: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate() + 1
        ),
      },
    },
  });
  user.expenses.sort((a, b) => b.date - a.date);
  res.render('expense/previous.ejs',{user,title:"Day"});
});

router.get("/dashboard/tracker/previousMonth", auth, async (req, res) => {
  const yesterday = new Date();
  yesterday.setMonth(yesterday.getMonth() - 1);
  let user = await User.findById(req.user._id).populate({
    path: "expenses",
    match: {
      date: {
        $gte: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate()
        ),
        $lt: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth() + 1,
          yesterday.getDate() 
        ),
      },
    },
  });
  user.expenses.sort((a, b) => b.date - a.date);
  res.render('expense/previous.ejs',{user,title:"Month"});
});

router.get("/dashboard/tracker/previousYear", auth, async (req, res) => {
  const yesterday = new Date();
  yesterday.setFullYear(yesterday.getFullYear() - 1);
  
  let user = await User.findById(req.user._id).populate({
    path: "expenses",
    match: {
      date: {
        $gte: new Date(
          yesterday.getFullYear(),
          yesterday.getMonth(),
          yesterday.getDate()
        ),
        $lt: new Date(
          yesterday.getFullYear()+ 1,
          yesterday.getMonth() ,
          yesterday.getDate() 
        ),
      },
    },
  });
  user.expenses.sort((a, b) => b.date - a.date);
  res.render('expense/previous.ejs',{user,title:"Year"});
});

module.exports = router;
