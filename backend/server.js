const express = require("express");
const pool = require("./db");

const app = express();

app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

app.get("/students", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM students");

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});