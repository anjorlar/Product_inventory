const Sequelize = require("Sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model {}
User.init({
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Username: {
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