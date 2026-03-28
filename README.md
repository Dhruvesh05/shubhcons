# Shubh Construction — Full Stack Project

## Description
This project is a professional full-stack web application developed for **Shubh Construction** as part of the **DecodeLabs Internship**. It features a responsive frontend designed to showcase construction services and a robust backend API integrated with a PostgreSQL database to manage project listings and client inquiries.

The application transitions from a static UI to a dynamic, data-driven platform, demonstrating proficiency in the PERN/SERN stack (PostgreSQL, Express, React/Vanilla JS, Node.js).

---

## Technologies Used

### Frontend
* **HTML5 & CSS3**: For structured content and custom responsive styling.
* **JavaScript (ES6+)**: For dynamic UI updates and backend API integration.

### Backend
* **Node.js**: JavaScript runtime environment.
* **Express.js**: Web framework for building RESTful APIs.

### Database
* **PostgreSQL**: Relational database for persistent storage of project data.

### Tools
* **Git & GitHub**: Version control.
* **Postman**: API testing and documentation.
* **PG Admin / PSQL**: Database management.

---

## Project Structure
```text
shubhcons
├── project-1-responsive-ui
│   └── (Frontend UI built using HTML, CSS, and JavaScript)
├── project-2-backend-api
│   └── (Backend API built using Node.js and Express connected with PostgreSQL)
└── README.md
Task 1 — Responsive UI (Frontend)
In this task, a professional responsive interface for Shubh Construction was created.
The page includes:

Navigation Bar: Links to Home, Services, and Projects.

Project Showcase: A grid layout displaying construction projects.

Service Cards: Detailed views of construction offerings.

Contact Section: A functional UI for client inquiries.

Responsive Design: Optimized for mobile, tablet, and desktop views.

How to Check Task 1
Open the project folder.

Navigate to: project-1-responsive-ui

Open the file: index.html

The Shubh Construction UI will open in your browser.

Task 2 — Backend API (Node.js + Express)
A backend API was developed to handle data for the construction site.

Base URL: http://localhost:5000

GET /projects: Fetches all construction projects.

POST /projects: Adds a new project to the list.

How to Run the Backend
Open terminal and navigate to the folder:
cd project-2-backend-api

Start the server:
node server.js

You should see: Server running at http://localhost:5000

Task 3 — PostgreSQL Database Integration
The backend is connected to a PostgreSQL database to ensure project data is permanent and not lost on server restart.

Library used: pg (node-postgres)

Table name: projects

How to Check Database Data
Open terminal and start PostgreSQL CLI:
psql -U postgres

Connect to the database:
\c shubhcons_db

Check the projects table:
SELECT * FROM projects;

Task 4 — Frontend and Backend Integration
The frontend is connected to the backend API using the Fetch API.

Dynamic Loading: Project details are fetched from the database and rendered on the UI.

Integration Test: When a new project is added via Postman, it automatically appears on the Shubh Construction website upon refresh.

Error Handling: Displays "Error loading data" if the backend server is disconnected.

How to Check Task 4
Start the backend server (node server.js).

Open index.html in the browser.

Verify that the construction projects displayed are being pulled from the database.

Author
Dhruvesh Computer Department, KKWIEER DecodeLabs Internship Project
