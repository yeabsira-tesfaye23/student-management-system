const express = require("express");
const Student = require("./models/Student");

const app = express();

app.use(express.json());


// Home route
app.get("/", (req, res) => {
    res.send("Student Management API is running");
});


// GET - Get all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.findAll();

        res.json(students);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
});


// POST - Add a student
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


// PUT - Update a student
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


// DELETE - Delete a student
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
            student: student
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete student"
        });
    }
});


// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});