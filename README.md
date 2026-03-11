# Employee Management System

A full-stack Employee Management System built using **React, ASP.NET Core Web API, SQL Server, and Redis**.
The application allows organizations to manage employee records with secure authentication, role-based access control, and optimized API performance using caching.

---

## Tech Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* React Query
* Redux

### Backend

* ASP.NET Core Web API
* C#
* Entity Framework Core
* Redis (Caching)

### Database

* SQL Server

### Tools

* Git
* Azure Repos
* Jenkins
* Jira

---

## Features

* User authentication with JWT
* Role-based authorization (Admin / User)
* Employee CRUD operations
* Secure REST API architecture
* Redis caching for faster API responses
* Optimized API communication using React Query
* Responsive UI with Tailwind CSS
* Reusable React components

---

## Project Structure

```
EmployeeManagementSystem
│
├── backend
│   └── EMS.API
│       ├── Controllers
│       ├── Services
│       ├── DTOs
│       ├── Models
│       ├── Data
│       ├── Mappings
│       └── Program.cs
│
├── frontend
│   └── React + Vite App
│
└── README.md
```

---

## Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/avvy123/employee-management-system.git
```

---

### 2. Backend Setup

Navigate to backend folder:

```
cd backend/EMS.API
```

Update the connection string in **appsettings.json**

```
"ConnectionStrings": {
    "DefaultConnection": "Server=.\\SQLEXPRESS;Database=Customer;User Id=YOUR_USERNAME;Password=YOUR_PASSWORD;TrustServerCertificate=True;"
}
```

Run the API:

```
dotnet run
```

The API will start on:

```
https://localhost:5001
```

---

### 3. Frontend Setup

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

* Login Page
* Dashboard
* Employee List
* Add Employee Form

## Author

Avinash Kumar
