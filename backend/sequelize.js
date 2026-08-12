const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "student_management",
    "postgres",
    "5490",
    {
        host: "localhost",
        dialect: "postgres",
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected through Sequelize!");
    } catch (error) {
        console.error("Unable to connect:", error);
    }
}

testConnection();

module.exports = sequelize;