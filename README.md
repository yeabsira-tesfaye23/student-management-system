# 🎓 Student Management System

A simple, full-stack-flavored React application for managing student records — built as part of the **Full Stack Development Track (Track 01)** roadmap, covering React fundamentals, component-based architecture, and client-side data persistence.

## 📌 Overview

This project is a hands-on implementation of core React concepts (Components, JSX, Props, State) combined with a lightweight backend mindset (REST API design, Node.js/Express basics) to build a practical CRUD application: a **Student Management System**.

Students can be added, edited, deleted, and searched — with all data persisted locally in the browser, so the app retains information even after a page refresh.

## ✨ Features

- ➕ **Add Student** — Create new student records with relevant details
- ✏️ **Edit Student** — Update existing student information in place
- 🗑️ **Delete Student** — Remove records from the list
- 🔍 **Search Students** — Quickly filter/find students by name or other fields
- 💾 **Data Persistence** — Records are stored and retrieved through a Node.js/Express REST API on the backend
- ⚡ **Modern JavaScript (ES6+)** — Written using modern syntax (arrow functions, destructuring, spread/rest operators, modules, etc.)

## 🛠️ Tech Stack

| Category   | Technology                          |
|------------|--------------------------------------|
| Frontend   | React (Components, JSX, Hooks - `useState`) |
| Backend    | Node.js, Express.js (REST API)      |
| Language   | JavaScript (ES6+)                   |
| Architecture | Client-server, with the React frontend consuming a Node/Express REST API |

## 📂 Project Structure

```
student-management-system/
├── backend/
│   ├── routes/            # REST API routes (students CRUD endpoints)
│   ├── controllers/       # Request handlers / business logic
│   ├── server.js          # Express app entry point
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/    # Reusable UI components (StudentForm, StudentList, etc.)
│   │   ├── App.js         # Root component
│   │   └── index.js       # Entry point
│   └── package.json
└── README.md
```

*(Adjust this to match your exact folder/file names inside `backend/` and `frontend/`.)*

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v16 or later recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/yeabsira-tesfaye23/student-management-system.git

# Navigate into the project folder
cd student-management-system
```

**1. Start the backend (REST API):**

```bash
cd backend
npm install
npm start
```

The API server will run at `http://localhost:3000` 

**2. Start the frontend (React app):**

Open a new terminal window/tab, then:

```bash
cd frontend
npm install
npm start
```

The app will run locally at `http://localhost:5173`.

> ⚠️ Both the backend and frontend need to be running at the same time for the app to work — the frontend fetches data from the backend's REST API.

## 🧠 What I Learned / Key Concepts

- **React Fundamentals**: How components render and re-render based on state changes
- **Components & JSX**: Breaking the UI into small, reusable pieces
- **Props & State**: Passing data between components and managing local component state with `useState`
- **REST APIs**: Designing and consuming CRUD endpoints (GET, POST, PUT, DELETE) that connect the frontend to the backend
- **Node.js/Express**: Setting up a server, defining routes, and handling requests/responses

## 🎤 Presentation Highlights

This project was also presented with a focus on:
- What React & Components are
- What JSX is and why it's used
- What a REST API is
- Technical challenges faced during development and key takeaways

## 🔮 Future Improvements

- Connect the backend to a persistent database (e.g. MongoDB or MySQL) instead of in-memory/file-based storage
- Add form validation and error handling on both frontend and backend
- Add pagination or sorting for larger student lists
- Add authentication for admin-only access

## 👤 Author

**Yeabsira Tesfaye**
Software Engineering Student, Haramaya University
GitHub: [@yeabsira-tesfaye23](https://github.com/yeabsira-tesfaye23)

---

*Built as part of a self-guided Full Stack Development learning track.*
