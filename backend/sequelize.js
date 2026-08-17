const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: console.log
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("PostgreSQL connected through Sequelize!");
    })
    .catch((error) => {
        console.error("Unable to connect to PostgreSQL:", error);
    });

module.exports = sequelize;