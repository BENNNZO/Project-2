require('dotenv').config({ path: __dirname + '/../.env' })
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.MYSQL_URI, {
    dialect: 'mysql'
})

module.exports = sequelize;
