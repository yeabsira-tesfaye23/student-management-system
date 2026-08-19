const API_URL = "http://localhost:3000";

export const getStudents = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/students`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch students");
    }

    return data;
};

export const addStudent = async (student) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to add student");
    }

    return data;
};

export const updateStudent = async (id, student) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/students/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to update student");
    }

    return data;
};

export const deleteStudent = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to delete student");
    }

    return data;
};