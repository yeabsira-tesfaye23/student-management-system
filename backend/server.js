require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Student = require("./models/Student");
const User = require("./models/User");
const sequelize = require("./sequelize");

const app = express();


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());
app.use(express.json());


// ======================================================
// PASSWORD VALIDATION
// ======================================================

const validatePassword = (password) => {

    if (typeof password !== "string") {
        return "Password must be a string";
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter";
    }

    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one number";
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]'/`~+=;]/.test(password)) {
        return "Password must contain at least one special character";
    }

    return null;
};


// ======================================================
// STUDENT VALIDATION MIDDLEWARE
// ======================================================

const validateStudent = (req, res, next) => {

    const {
        name,
        department,
        year
    } = req.body;


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


// ======================================================
// JWT AUTHENTICATION MIDDLEWARE
// ======================================================

const authenticateToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    const token = authHeader &&
        authHeader.split(" ")[1];


    if (!token) {

        return res.status(401).json({
            error: "Access token required"
        });

    }


    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (error, user) => {

            if (error) {

                return res.status(403).json({
                    error: "Invalid or expired token"
                });

            }


            req.user = user;

            next();

        }
    );

};


// ======================================================
// ROLE AUTHORIZATION MIDDLEWARE
// ======================================================

const authorizeRole = (...allowedRoles) => {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                error: "Authentication required"
            });

        }


        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({
                error: "You do not have permission to perform this action"
            });

        }


        next();

    };

};


// ======================================================
// HOME
// ======================================================

app.get("/", (req, res) => {

    res.json({
        message: "Student Management API is running"
    });

});


// ======================================================
// REGISTER
// ======================================================

app.post("/register", async (req, res, next) => {

    try {

        const {
            username,
            password
        } = req.body;


        // Username validation

        if (!username) {

            return res.status(400).json({
                error: "Username is required"
            });

        }


        if (typeof username !== "string") {

            return res.status(400).json({
                error: "Username must be a string"
            });

        }


        const cleanUsername = username.trim();


        if (cleanUsername.length < 3) {

            return res.status(400).json({
                error: "Username must be at least 3 characters long"
            });

        }


        // Password validation

        const passwordError =
            validatePassword(password);


        if (passwordError) {

            return res.status(400).json({
                error: passwordError
            });

        }


        // Check whether username already exists

        const existingUser =
            await User.findOne({
                where: {
                    username: cleanUsername
                }
            });


        if (existingUser) {

            return res.status(409).json({
                error: "Username already exists"
            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create user

        const user = await User.create({

            username: cleanUsername,

            password: hashedPassword,

            role: "student"

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


// ======================================================
// LOGIN
// ======================================================

app.post("/login", async (req, res, next) => {

    try {

        const {
            username,
            password
        } = req.body;


        if (!username || !password) {

            return res.status(400).json({
                error: "Username and password are required"
            });

        }


        const user =
            await User.findOne({
                where: {
                    username
                }
            });


        if (!user) {

            return res.status(401).json({
                error: "Invalid username or password"
            });

        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                error: "Invalid username or password"
            });

        }


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


// ======================================================
// GET ALL STUDENTS
// ======================================================

app.get(
    "/students",
    authenticateToken,
    async (req, res, next) => {

        try {

            const students =
                await Student.findAll();

            res.status(200).json(students);

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// GET STUDENT BY ID
// ======================================================

app.get(
    "/students/:id",
    authenticateToken,
    async (req, res, next) => {

        try {

            const {
                id
            } = req.params;


            const student =
                await Student.findByPk(id);


            if (!student) {

                return res.status(404).json({
                    error: "Student not found"
                });

            }


            res.status(200).json(student);

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// ADD STUDENT
// ======================================================

app.post(
    "/students",
    authenticateToken,
    authorizeRole("admin"),
    validateStudent,
    async (req, res, next) => {

        try {

            const {
                name,
                department,
                year
            } = req.body;


            const student =
                await Student.create({

                    name: name.trim(),

                    department:
                        department.trim(),

                    year:
                        year.trim()

                });


            res.status(201).json(student);

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// UPDATE STUDENT
// ======================================================

app.put(
    "/students/:id",
    authenticateToken,
    authorizeRole("admin"),
    validateStudent,
    async (req, res, next) => {

        try {

            const {
                id
            } = req.params;


            const {
                name,
                department,
                year
            } = req.body;


            const student =
                await Student.findByPk(id);


            if (!student) {

                return res.status(404).json({
                    error: "Student not found"
                });

            }


            await student.update({

                name: name.trim(),

                department:
                    department.trim(),

                year:
                    year.trim()

            });


            res.status(200).json(student);

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// DELETE STUDENT
// ======================================================

app.delete(
    "/students/:id",
    authenticateToken,
    authorizeRole("admin"),
    async (req, res, next) => {

        try {

            const {
                id
            } = req.params;


            const student =
                await Student.findByPk(id);


            if (!student) {

                return res.status(404).json({
                    error: "Student not found"
                });

            }


            await student.destroy();


            res.status(200).json({

                message:
                    "Student deleted successfully",

                student

            });

        } catch (error) {

            next(error);

        }

    }
);


// ======================================================
// CENTRALIZED ERROR HANDLER
// ======================================================

app.use((error, req, res, next) => {

    console.error(error);


    if (
        error.name ===
        "SequelizeValidationError"
    ) {

        return res.status(400).json({

            error: "Validation error",

            details:
                error.errors.map(
                    err => err.message
                )

        });

    }


    if (
        error.name ===
        "SequelizeDatabaseError"
    ) {

        return res.status(500).json({
            error: "Database error"
        });

    }


    res.status(500).json({
        error: "Internal server error"
    });

});


// ======================================================
// DATABASE + SERVER
// ======================================================

const startServer = async () => {

    try {

        await sequelize.authenticate();

        console.log(
            "PostgreSQL connected through Sequelize!"
        );


        await Student.sync();

        await User.sync();


        console.log(
            "Database tables synchronized successfully!"
        );


        app.listen(
            3000,
            () => {

                console.log(
                    "Server running at http://localhost:3000"
                );

            }
        );

    } catch (error) {

        console.error(
            "Unable to start server:",
            error
        );

    }

};


startServer();