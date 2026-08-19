import { useEffect, useState } from "react";
import "./App.css";

import Login from "./components/Login";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

import {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
} from "./api";

function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const [form, setForm] = useState({
        name: "",
        department: "",
        year: ""
    });

    const [editingId, setEditingId] = useState(null);

    const isAdmin = user?.role === "admin";

    // ===============================
    // Load students
    // ===============================

    useEffect(() => {
        if (!user) return;

        const loadStudents = async () => {
            try {
                const data = await getStudents();

                setStudents(data);
            } catch (error) {
                console.error(
                    "Failed to load students:",
                    error
                );
            }
        };

        loadStudents();
    }, [user]);

    // ===============================
    // Login
    // ===============================

    const handleLogin = (userData) => {
        setUser(userData);
    };

    // ===============================
    // Logout
    // ===============================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setStudents([]);
    };

    // ===============================
    // Handle input changes
    // ===============================

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    // ===============================
    // Add or edit student
    // ===============================

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name || !form.department || !form.year) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            if (editingId) {
                const updatedStudent = await updateStudent(
                    editingId,
                    form
                );

                setStudents(currentStudents =>
                    currentStudents.map(student =>
                        student.id === editingId
                            ? updatedStudent
                            : student
                    )
                );

                setEditingId(null);
            } else {
                const newStudent = await addStudent(form);

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

        } catch (error) {
            alert(error.message);
        }
    };

    // ===============================
    // Start editing
    // ===============================

    const handleEdit = (student) => {
        setEditingId(student.id);

        setForm({
            name: student.name,
            department: student.department,
            year: student.year
        });
    };

    // ===============================
    // Delete student
    // ===============================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {
            await deleteStudent(id);

            setStudents(currentStudents =>
                currentStudents.filter(
                    student => student.id !== id
                )
            );
        } catch (error) {
            alert(error.message);
        }
    };

    // ===============================
    // Cancel editing
    // ===============================

    const cancelEdit = () => {
        setEditingId(null);

        setForm({
            name: "",
            department: "",
            year: ""
        });
    };

    // ===============================
    // Show login
    // ===============================

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    // ===============================
    // Student Management UI
    // ===============================

    return (
        <div className="app">

            <header className="header">

                <div>
                    <h1>Student Management</h1>

                    <p>
                        Manage student information easily
                    </p>

                    <p>
                        Logged in as:{" "}
                        <strong>{user.username}</strong>{" "}
                        ({user.role})
                    </p>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>

            </header>

            <main className="container">

                <StudentForm
                    form={form}
                    editingId={editingId}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancelEdit={cancelEdit}
                    isAdmin={isAdmin}
                />

                <StudentList
                    students={students}
                    search={search}
                    setSearch={setSearch}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    isAdmin={isAdmin}
                />

            </main>

        </div>
    );
}

export default App;