const express = require("express");
const cors = require("cors");
const Student = require("./models/Student");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

app.get("/students", async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to get students"
        });
    }
});

app.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to get student"
        });
    }
});

app.post("/students", async (req, res) => {
    try {
        const { name, department, year } = req.body;

        const student = await Student.create({
            name,
            department,
            year
        });

        res.status(201).json(student);
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

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        await student.update({
            name,
            department,
            year
        });

        res.json(student);
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

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        await student.destroy();

        res.json({
            message: "Student deleted successfully",
            student
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