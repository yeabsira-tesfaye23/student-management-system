const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

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

app.post("/students", async (req, res) => {
    try {
        const { name, department, year } = req.body;

        const result = await pool.query(
            "INSERT INTO students (name, department, year) VALUES ($1, $2, $3) RETURNING *",
            [name, department, year]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to add student"
        });
    }
});

app.put("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, department, year } = req.body;

        const result = await pool.query(
            `UPDATE students
             SET name = $1, department = $2, year = $3
             WHERE id = $4
             RETURNING *`,
            [name, department, year, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to update student"
        });
    }
});

app.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM students WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully",
            student: result.rows[0]
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete student"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});