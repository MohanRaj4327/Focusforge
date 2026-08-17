# FocusForge

FocusForge is a full-stack productivity and placement preparation platform designed for students. It helps users organize their daily schedule, track DSA preparation, manage important milestones, and maintain a structured preparation routine.

## Live Demo

https://focusforge-chi-seven.vercel.app/

## About the Project

FocusForge is designed to bring different parts of student placement preparation into one platform.

Instead of managing DSA problems, daily schedules, revision tasks, and important dates separately, FocusForge provides a single platform to organize and track them.

## Features

* 175-problem DSA preparation roadmap
* Daily time-blocking and schedule management
* DSA problem tracking
* Spaced repetition for difficult problems
* Daily productivity tracking
* Milestone and important-date tracking
* Notebook for maintaining notes
* Responsive user interface
* Full-stack architecture with frontend, backend and database

## Project Architecture

The application follows a basic full-stack architecture:

```text
User
  ↓
React Frontend
  ↓
REST API
  ↓
Spring Boot Backend
  ↓
PostgreSQL Database
```

The frontend is responsible for the user interface and communicating with the backend.

The backend handles application logic, API requests and communication with the database.

The database stores the application's persistent data.

## Technology Stack

### Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* Axios

### Backend

* Java 21
* Spring Boot
* Spring Data JPA
* Hibernate
* Spring Security
* JWT Authentication
* Maven

### Database

* PostgreSQL
* H2 Database

### Other Tools

* Flyway
* Git
* GitHub
* Vercel

## Project Structure

```text
FocusForge
│
├── focusforge
│   │
│   ├── frontend
│   │   ├── src
│   │   ├── public
│   │   ├── package.json
│   │   └── ...
│   │
│   └── backend
│       ├── src
│       ├── pom.xml
│       └── ...
│
├── README.md
├── .gitignore
└── final list.pdf
```

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/MohanRaj4327/Focusforge.git
```

### 2. Start the Backend

Open a terminal and move into the backend folder:

```bash
cd Focusforge/focusforge/backend
```

Start the Spring Boot backend:

```bash
mvn spring-boot:run
```

The backend server will start on:

```text
http://localhost:8080
```

### 3. Start the Frontend

Open another terminal and move into the frontend folder:

```bash
cd Focusforge/focusforge/frontend
```

Install the required dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be available on the local development URL shown by Vite in the terminal.

## Live Application

The deployed version of FocusForge is available here:

https://focusforge-chi-seven.vercel.app/

## Authentication

FocusForge uses authentication to manage user access.

The backend uses Spring Security and JWT-based authentication to handle authenticated requests.

## Database

FocusForge uses a relational database for storing application data.

PostgreSQL is used as the main database, while H2 can be used for local development and testing depending on the project configuration.

JPA and Hibernate are used to communicate between the Java application and the database.

## How the Application Works

A typical request follows this flow:

```text
User interacts with the website
            ↓
React Frontend
            ↓
HTTP / REST API Request
            ↓
Spring Boot Backend
            ↓
Application Logic
            ↓
PostgreSQL Database
            ↓
Backend Response
            ↓
React Frontend
            ↓
Updated information displayed to user
```

## Project Goal

The main goal of FocusForge is to provide students with a structured platform for managing productivity and placement preparation.

It combines planning, DSA preparation, revision and milestone tracking in one application.


## Future Improvements

* More DSA problems and preparation resources
* Improved analytics and progress tracking
* More personalized revision recommendations
* Additional productivity features
* Improved mobile experience
* More placement preparation resources

## Author

Mohan Raj N

GitHub:

https://github.com/MohanRaj4327

## License

This project is developed for educational and portfolio purposes.
