# FocusForge 

FocusForge is a full-stack productivity and placement preparation platform. It is designed to help students track their daily schedule, manage critical deadlines, and follow a structured 6-month Data Structures & Algorithms (DSA) roadmap for technical interviews.

## Features
* **175-Problem DSA Roadmap**: Curated technical interview preparation timeline.
* **Spaced Repetition System**: Flags difficult problems and schedules automatic revisions.
* **Daily Time-Blocking**: 12-hour schedule planner to structure deep work sessions.
* **Milestone Calendar**: Track upcoming semester exams and campus placement drives.

##  Technology Stack

### Frontend
* **React 18** (Vite)
* **TypeScript**
* **Tailwind CSS** (for styling)
* **Lucide React** (icons)
* **Axios** (API communication)

### Backend
* **Java 21**
* **Spring Boot 3.2.4**
* **Spring Data JPA & Hibernate** (ORM)
* **Spring Security & JWT** (Authentication)
* **PostgreSQL / H2** (Database)
* **Flyway** (Database Migrations)
* **Maven** (Build Tool)

## Local Setup

### 1. Start the Backend
```bash
cd focusforge/backend
mvn spring-boot:run
```
The server will start on `http://localhost:8080`.

### 2. Start the Frontend
```bash
cd focusforge/frontend
npm install
npm run dev
```
The application will be live at `https://focusforge-chi-seven.vercel.app/`.
