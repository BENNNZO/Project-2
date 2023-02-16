const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (sent by HTML forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "./views"), "views");
app.set("view engine", "hbs");

app.use(cookieParser())

//Routes Defined
app.use("/", require("./routes/pages"));
// Require authentication
app.use("/auth", require("./routes/auth"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
