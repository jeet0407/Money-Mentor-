const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("calculators/index.ejs");
});

router.get("/:calculator", (req, res, next) => {
  let { calculator } = req.params;

  let calcArray = [
    "sip",
    "lumpsum",
    "ppf",
    "inflation",
    "emi",
    "simple",
    "swp",
  ];

  if (calcArray.indexOf(calculator) != -1) {
    return res.render(`calculators/${calculator}.ejs`);
  } else {
    //Flash a message that such calc doesn't exist.
    return next();
  }
});

module.exports = router;
