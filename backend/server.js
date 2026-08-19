const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("./models/Student");
const User = require("./models/User");
const authenticateToken = require("./middleware/authMiddleware");
const authorizeRole = require("./middleware/authorizeRole");
const app = express();

// ===============================
// Middleware
// ===============================

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
// Home
// ===============================

app.get("/", (req, res) => {
    res.json({
        message: "Student Management API is running"
    });
});

// ===============================
// REGISTER
// ===============================

app.post("/register", async (req, res, next) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required"
            });
        }

        if (
            typeof username !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                error: "Username and password must be strings"
            });
        }

        if (
            username.trim() === "" ||
            password.trim() === ""
        ) {
            return res.status(400).json({
                error: "Username and password cannot be empty"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters"
            });
        }

        const existingUser = await User.findOne({
            where: {
                username: username.trim()
            }
        });

        if (existingUser) {
            return res.status(409).json({
                error: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRole =
            role === "admin" || role === "student"
                ? role
                : "student";

        const user = await User.create({
            username: username.trim(),
            password: hashedPassword,
            role: userRole
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
});

// ===============================
// LOGIN
// ===============================

app.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check required fields
        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required"
            });
        }

        // Find user
        const user = await User.findOne({
            where: {
                username: username.trim()
            }
        });

        // User doesn't exist
        if (!user) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        // Compare password with hashed password
        const passwordIsCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordIsCorrect) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Send token
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
});

// ===============================
// STUDENT ROUTES
// ===============================

// GET all students
app.get("/students", authenticateToken, async (req, res, next) => {
    try {
        const students = await Student.findAll();

        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
});

// GET student by ID
app.get("/students/:id",authenticateToken, async (req, res, next) => {
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
app.post(
    "/students",
    authenticateToken,
    authorizeRole("admin"),
    validateStudent,
    async (req, res, next) => {
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
app.put(
    "/students/:id", 
    authenticateToken,
    authorizeRole("admin"),
     validateStudent, 
     async (req, res, next) => {
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
app.delete(
    "/students/:id", 
    authenticateToken,
    authorizeRole("admin"), 
    async (req, res, next) => {
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

    if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
            error: "Validation error",
            details: error.errors.map(err => err.message)
        });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
            error: "Username already exists"
        });
    }

    if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
            error: "Database error"
        });
    }

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