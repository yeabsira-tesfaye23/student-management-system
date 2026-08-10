import { useEffect, useState } from "react";
import "./App.css";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const [form, setForm] = useState({
        name: "",
        department: "",
        year: ""
    });

    const [editingId, setEditingId] = useState(null);

    // Get students
    useEffect(() => {

        const savedStudents = localStorage.getItem("students");

        if (savedStudents) {
            setStudents(JSON.parse(savedStudents));
        } else {
            fetchStudents();
        }

    }, []);

    // Save students
    useEffect(() => {

        if (students.length > 0) {
            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );
        }

    }, [students]);

    // Get students from backend
    const fetchStudents = async () => {

        const response = await fetch(
            "http://localhost:3000/students"
        );

        const data = await response.json();

        setStudents(data);
    };

    // Handle input changes
    const handleChange = (event) => {

        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    };

    // Add or edit student
    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!form.name || !form.department || !form.year) {
            alert("Please fill in all fields.");
            return;
        }

        // EDIT
        if (editingId) {

            const response = await fetch(
                `http://localhost:3000/students/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const updatedStudent = await response.json();

            setStudents(
                students.map(student =>
                    student.id === editingId
                        ? updatedStudent
                        : student
                )
            );

            setEditingId(null);

        }

        // ADD
        else {

            const response = await fetch(
                "http://localhost:3000/students",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const newStudent = await response.json();

            setStudents(currentStudents => [
                ...currentStudents,
                newStudent
            ]);

        }

        setForm({
            name: "",
            department: "",
            year: ""
        });

    };

    // Start editing
    const handleEdit = (student) => {

        setEditingId(student.id);

        setForm({
            name: student.name,
            department: student.department,
            year: student.year
        });

    };

    // Delete student
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        await fetch(
            `http://localhost:3000/students/${id}`,
            {
                method: "DELETE"
            }
        );

        setStudents(currentStudents =>
            currentStudents.filter(student => student.id !== id)
        );

    };

    // Cancel editing
    const cancelEdit = () => {

        setEditingId(null);

        setForm({
            name: "",
            department: "",
            year: ""
        });

    };

    return (
        <div className="app">

            <header className="header">

                <div>
                    <h1>Student Management</h1>
                    <p>
                        Manage student information easily
                    </p>
                </div>

            </header>

            <main className="container">

                <StudentForm
                    form={form}
                    editingId={editingId}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancelEdit={cancelEdit}
                />

                <StudentList
                    students={students}
                    search={search}
                    setSearch={setSearch}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />

            </main>

        </div>
    );
}

export default App;