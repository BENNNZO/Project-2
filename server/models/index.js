const Users = require("./users");
const Comments = require("./comments");

module.exports = { Users, Comments };

Comments.belongsTo(Users, {
  allowNull: false
})

// Categories have many Products
Users.hasMany(Comments, {
  allowNull: false
})