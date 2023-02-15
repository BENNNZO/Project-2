const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
// const mysql = require('mysql')
// const dotenv = require("dotenv")
const sequelize = require("./config/connection");

// dotenv.config({ path: './.env'})

const app = express();
const PORT = process.env.PORT || 3001;

// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// })

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (sent by HTML forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "./views"), "views");
app.set("view engine", "hbs");

app.use(cookieParser())

// db.connect( (error) => {
//     if(error){
//         console.log(error)
//     } else {
//         console.log('MYSQL Connected')
//     }
// })

//Routes Defined
app.use("/", require("./routes/pages"));
// Require authentication
app.use("/auth", require("./routes/auth"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
