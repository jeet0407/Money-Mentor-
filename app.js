const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const error = require("./utils/error.js");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const port = 8080;
const User = require("./Model/User.js");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const Feedback=require('./Model/Feedback.js')
require("dotenv").config();


const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
    
    console.log("Failed to connect!");
  });

const MongoStore = require("connect-mongo");
const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE");
});

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// session
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});

//Routes
const calculatorRouter = require("./routes/calculator.js");
const userRouter = require("./routes/user.js");
const { auth } = require("./utils/validation.js");
const wrapAsync = require("./utils/wrapAsync.js");

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user=req.user;
  next();
});
//Home Page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//Calulator Route
app.use("/calculator", calculatorRouter);
app.use("/user", userRouter);

app.get("/blogs", (req, res) => {
  res.render("blogs/index.ejs");
});

app.get('/blogs/:id',(req,res)=>{
  let {id}=req.params;
  let arr=[
    'rich-dad-poor-dad',
    'intern-insights',
    'campus-money-hacks',
    'scholarships'
  ]
  if (arr.indexOf(id) != -1) {
    return res.render(`blogs/${id}.ejs`);
  } else return next();
})

app.get('/learn',(req,res)=>{
  res.render('learn/index.ejs');
})

app.get("/learn/:id",(req, res, next) => {
  let { id } = req.params;
  let arr = [
    "chapter1",
    "chapter2",
    "chapter3",
    "chapter4",
    "chapter5",
    "chapter6",
    "chapter7",
  ];
  if (arr.indexOf(id) != -1) {
    return res.render(`learn/${id}.ejs`);
  } else return next();
});

app.get('/finance',(req,res)=>{
  res.render('finance/index.ejs');
})

app.get("/finance/:id",(req, res, next) => {
  let { id } = req.params;
  let arr = [
    "chapter1",
    "chapter2",
    "chapter3",
    "chapter4",
    "chapter5",
    "chapter6",
    "chapter7",
    "chapter8",
    "chapter9",
  ];
  if (arr.indexOf(id) != -1) {
    return res.render(`finance/${id}.ejs`);
  } else return next();
});

//Login Authenticate .
app.get("/login", (req, res) => {
  res.render("user/loginSign.ejs");
});

app.get('/score',(req,res)=>{
  res.render('score.ejs');
})

app.get("/logout", auth, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "Logout Successfully!");
      res.redirect("/login");
    }
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Invalid Username or Password!",
  }),
  (req, res) => {
    req.flash("success", "Login Successfully!");
    res.redirect("/user/dashboard");
  }
);

app.get('/user/feedback',auth,(req,res)=>{
  res.render('feedback/index.ejs')
})

app.post('/user/feedback',auth,wrapAsync(async (req,res)=>{
  let feedback=req.body;
  const data=new Feedback(feedback);
  await data.save();
  req.flash('success','You can see your feedback in about section');
  res.redirect('/');
}))

app.get('/terms/:id',(req,res)=>{
  let {id}=req.params;
  let arr=['privacy','termsOfService','cookies'];
  if(arr.indexOf(id)!=-1){
    return res.render(`terms/${id}.ejs`);
  }else return next();
})

app.get('/incomeTax',(req,res)=>{
  res.render('incomeTax.ejs');
})

app.get('/aboutUs',wrapAsync(async (req,res)=>{
  const feedback=await Feedback.find({});
  res.render('aboutUs.ejs',{feedback});
}))

//Not Found Handler
app.all("*", (req, res) => {
  throw new error(404, "Page not found");
});

//Error Handler:
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log("App is listening on port");
});
