const Sequelize = require("sequelize");

const sequelize = new Sequelize("stock-inventory", "root", process.env.MYSQL_PASSWORD, {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;