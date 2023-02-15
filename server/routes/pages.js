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

router.put("/update/:id", (req, res) => {
  console.log(req.body);
  if (req.body.name) {
    Users.update({ name: req.body.name },{ where: { id: req.params.id }})
    .then(updatedData => {
      res.cookie('username', req.body.name)
      res.json(updatedData)
    })
    .catch(err => console.log(err))
  }
  if (req.body.bio) {
    Users.update({ bio: req.body.bio },{ where: { id: req.params.id }})
    .then(updatedData => res.json(updatedData))
    .catch(err => console.log(err))
  }
})

module.exports = router;
