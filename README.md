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
- 💾 **Data Persistence** — Records are saved using the browser's Local Storage, so data isn't lost on refresh
- ⚡ **Modern JavaScript (ES6+)** — Written using modern syntax (arrow functions, destructuring, spread/rest operators, modules, etc.)

## 🛠️ Tech Stack

| Category   | Technology                          |
|------------|--------------------------------------|
| Frontend   | React (Components, JSX, Hooks - `useState`) |
| Language   | JavaScript (ES6+)                   |
| Persistence| Local Storage (Web Storage API)     |
| Concepts Applied | REST API design principles, Node.js/Express basics |

## 📂 Project Structure

```
student-management-system/
├── public/
│   └── index.html
├── src/
│   ├── components/       # Reusable UI components (StudentForm, StudentList, etc.)
│   ├── App.js             # Root component
│   ├── index.js           # Entry point
│   └── styles/             # CSS / styling files
├── package.json
└── README.md
```

*(Adjust this structure to match your actual folder layout.)*

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

# Install dependencies
npm install

# Start the development server
npm start
```

The app will run locally at `http://localhost:3000`.

## 🧠 What I Learned / Key Concepts

- **React Fundamentals**: How components render and re-render based on state changes
- **Components & JSX**: Breaking the UI into small, reusable pieces
- **Props & State**: Passing data between components and managing local component state with `useState`
- **REST APIs**: Understanding how CRUD operations map to standard API conventions (GET, POST, PUT, DELETE), even though this version uses Local Storage instead of a live backend
- **Local Storage**: Persisting data on the client side without a database

## 🎤 Presentation Highlights

This project was also presented with a focus on:
- What React & Components are
- What JSX is and why it's used
- What a REST API is
- Technical challenges faced during development and key takeaways

## 🔮 Future Improvements

- Connect to a real backend (Node.js + Express) with a database instead of Local Storage
- Add form validation and error handling
- Add pagination or sorting for larger student lists
- Add authentication for admin-only access

## 👤 Author

**Yeabsira Tesfaye**
Software Engineering Student, Haramaya University
GitHub: [@yeabsira-tesfaye23](https://github.com/yeabsira-tesfaye23)

---

*Built as part of a self-guided Full Stack Development learning track.*
