const { Comments } = require("../models");

const commentData = [
  {
    comment: "cool new comment",
    user_id: "1"
  },
  {
    comment: "cool new comment yes again",
    user_id: "1"
  },
  {
    comment: "cooler newer commenter",
    user_id: "2"
  },
];

const seedCategories = () => Comments.bulkCreate(commentData);

module.exports = seedCategories;
