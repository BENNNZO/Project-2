const sql = require('mysql')
const dotenv = require("dotenv").config()
const db = sql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_
})

module.exports = db;