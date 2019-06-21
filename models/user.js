const Sequelize = require("Sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model { }
User.init({
    Username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        sequelize
    })

module.exports = User;