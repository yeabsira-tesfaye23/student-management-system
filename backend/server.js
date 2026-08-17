const express = require("express");
const cors = require("cors");
const Student = require("./models/Student");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// Validation Middleware
// ===============================

const validateStudent = (req, res, next) => {
    const { name, department, year } = req.body;

    if (!name || !department || !year) {
        return res.status(400).json({
            error: "Name, department, and year are required"
        });
    }

    if (
        typeof name !== "string" ||
        typeof department !== "string" ||
        typeof year !== "string"
    ) {
        return res.status(400).json({
            error: "Name, department, and year must be strings"
        });
    }

    if (
        name.trim() === "" ||
        department.trim() === "" ||
        year.trim() === ""
    ) {
        return res.status(400).json({
            error: "Name, department, and year cannot be empty"
        });
    }

    next();
};

// ===============================
// Routes
// ===============================

// Home
app.get("/", (req, res) => {
    res.json({
        message: "Student Management API is running"
    });
});

// GET all students
app.get("/students", async (req, res, next) => {
    try {
        const students = await Student.findAll();

        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
});

// GET student by ID
app.get("/students/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
});

// POST - add student
app.post("/students", validateStudent, async (req, res, next) => {
    try {
        const { name, department, year } = req.body;

        const student = await Student.create({
            name: name.trim(),
            department: department.trim(),
            year: year.trim()
        });

        res.status(201).json(student);
    } catch (error) {
        next(error);
    }
});

// PUT - update student
app.put("/students/:id", validateStudent, async (req, res, next) => {
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
            name: name.trim(),
            department: department.trim(),
            year: year.trim()
        });

        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
});

// DELETE - delete student
app.delete("/students/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        await student.destroy();

        res.status(200).json({
            message: "Student deleted successfully",
            student
        });
    } catch (error) {
        next(error);
    }
});

// ===============================
// Centralized Error Handler
// ===============================

app.use((error, req, res, next) => {
    console.error(error);

    // Sequelize validation error
    if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
            error: "Validation error",
            details: error.errors.map(err => err.message)
        });
    }

    // Sequelize database error
    if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
            error: "Database error"
        });
    }

    // General server error
    res.status(500).json({
        error: "Internal server error"
    });
});

// ===============================
// Start Server
// ===============================

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});