const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Student = sequelize.define("Student", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    department: {
        type: DataTypes.STRING,
        allowNull: false
    },

    year: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Student;