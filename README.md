# Approval System (Approve Log)

Full-stack document approval system with user roles, authentication, logging, and statistics.  
Built as a portfolio project to practice real-world architecture with **Spring Boot** backend and **React** frontend.

---

## ✨ Features

- User registration, login, and logout with JWT (HttpOnly cookie)
- Role-based access:
  - **User**: create, edit, delete draft documents
  - **Manager**: approve or reject documents, view statistics
- CRUD for documents with status: Draft / Approved / Rejected
- Audit log for all document actions (create, update, approve, reject, delete)
- Authentication log for all login attempts with IP and success/failure
- Dashboard with document statistics
- Brute-force protection (delays on failed logins)

---

## 🛠️ Tech Stack

**Frontend**

- React 19 + TypeScript
- React Query (server state), Zustand (client state)
- TailwindCSS for UI
- React-Toastify for notifications
- Vite for fast build/dev environment

**Backend**

- Java 21, Spring Boot 3.5
- Spring Security with JWT
- Spring Data JPA + PostgreSQL
- JSR-303 validation
- REST API + global exception handling
- Gradle build system

**Other**

- Docker + Docker Compose (full-stack environment)
- ESLint & Prettier for frontend code style

---

## 🧱 Architecture

- `User` — managers and regular users
- `Document` — content, status (Draft, Approved, Rejected), author, approver
- `AuditLog` — history of document actions
- `AuthLog` — records login attempts with IP and result

Structure:

- **Backend**: `controller → service → repository → model`
- **Frontend**: modularized by features (auth, documents, stats)

---
