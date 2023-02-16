const { Users } = require("../models");

const userdata = [
  {
    name: "test",
    email: "test@gmail.com",
    password: "test",
    bio: "cool bio"
  },
  {
    name: "test2",
    email: "test2@gmail.com",
    password: "test2",
    bio: "cooler bio"
  },
];

const seedCategories = () => Users.bulkCreate(userdata);

module.exports = seedCategories;
