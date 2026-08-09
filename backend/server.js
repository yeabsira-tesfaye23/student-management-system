const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
    {
        id: 1,
        name: "Yeabsira",
        department: "Software Engineering",
        year: "2nd Year"
    },
    {
        id: 2,
        name: "Abebe",
        department: "Computer Science",
        year: "2nd Year"
    }
];

app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

// Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// Add student
app.post("/students", (req, res) => {
    const { name, department, year } = req.body;

    const newStudent = {
        id: Date.now(),
        name,
        department,
        year
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// Edit student
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.department = req.body.department;
    student.year = req.body.year;

    res.json(student);
});

// Delete student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const studentExists = students.some(student => student.id === id);

    if (!studentExists) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students = students.filter(student => student.id !== id);

    res.json({
        message: "Student deleted successfully"
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});