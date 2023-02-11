const { Users } = require("../models");

const userdata = [
  {
    name: "test",
    email: "test@gmail.com",
    password: "test",
  },
  {
    name: "test2",
    email: "test2@gmail.com",
    password: "test2",
  },
];

const seedCategories = () => Users.bulkCreate(userdata);

module.exports = seedCategories;
