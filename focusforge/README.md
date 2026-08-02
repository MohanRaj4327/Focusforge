# FocusForge — Full-Stack Productivity & Placement Suite

FocusForge is an end-to-end full-stack productivity & placement preparation application designed for software engineers preparing for competitive drives (e.g. Zoho, TCS, Amazon).

---

## Architecture Stack

### Backend
- **Language**: Java 26 / Java 21 LTS
- **Framework**: Spring Boot 3.2
- **Data Access**: Spring Data JPA + Hibernate
- **Database**: PostgreSQL (with Flyway migration & H2 fallback)
- **Security**: Spring Security + JWT Authentication
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Glassmorphism Design System
- **Icons**: Lucide Icons
- **Analytics & Charts**: Recharts
- **Routing**: React Router v6
- **HTTP Client**: Axios with JWT Interceptors

---

## Database Schemas & Migrations

- `V1__Initial_Schema.sql`: Creates all 22 relational entities (`users`, `profiles`, `tasks`, `dsa_topics`, `dsa_problems`, `dsa_progress`, `dsa_revisions`, `deadlines`, `schedule_blocks`, `focus_sessions`, `aptitude_topics`, `aptitude_sessions`, `zoho_progress`, etc.).
- `V2__Seed_175_DSA_Problems.sql`: Automatically seeds all 175 DSA problems categorized into 15 topics across 6 months directly extracted from the Zoho Preparation Roadmap PDF.

---

## Core Features & Business Logic

1. **Daily Dashboard API (`GET /api/dashboard/today`)**: Automatically computes today's progress, active schedule block, next task, focus time, DSA roadmap summary, revision queue alerts, and motivational awareness messages.
2. **175-Problem DSA Roadmap**: Dynamically calculates solved vs expected progress (~1.15 problems/day pace), remaining count, and behind/ahead status.
3. **Smart Spaced Repetition**: When a DSA problem is marked as difficult, FocusForge automatically schedules 5 revision passes (+1, +3, +7, +14, +30 days).
4. **Pomodoro Deep Work Timer**: Real-time timer with automatic session duration logging to backend APIs.
5. **Placement & Academic Deadlines**: Calendar and milestone tracking for exam dates and campus placement drives.
6. **Recharts Analytics**: Visualizations for weekly focus trends, DSA topic mastery, and aptitude performance.

---

## Running the Application

### 1. Backend (Java Spring Boot)
```bash
cd focusforge/backend
mvn spring-boot:run
```
*Runs by default on http://localhost:8080*

### 2. Frontend (React + TypeScript)
```bash
cd focusforge/frontend
npm run dev
```
*Runs by default on http://localhost:3000*
