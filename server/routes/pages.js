const express = require("express");
const router = express.Router();
const { Users } = require('../models')

router.get("/", (req, res) => {
  if (req.cookies.logged_in === '1') {
    res.render("index");
  } else {
    res.render("login");
  }
});
//when sent to register we see form
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
