# 🎓 Student Management System

A full-stack Student Management System built as part of the **Full Stack Development Track (Track 01)**.

The project demonstrates a complete client-server architecture using **React**, **Node.js**, **Express.js**, **Sequelize ORM**, and **PostgreSQL**. It provides a REST API for managing student records and a React frontend for interacting with the system.

---

## 📌 Overview

The Student Management System allows users to:

- Add students
- View all students
- View a specific student
- Edit student information
- Delete students
- Search students
- Validate student input
- Persist student data in PostgreSQL

The React frontend communicates with the Express REST API, which uses Sequelize ORM to interact with the PostgreSQL database.

---

## 🏗️ Architecture

The application follows a client-server architecture:

```text
React Frontend
      ↓
HTTP Requests
      ↓
Express.js REST API
      ↓
Sequelize ORM
      ↓
PostgreSQL Database
      ↓
JSON Response
      ↓
React Frontend
