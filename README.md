# Task Management API

A secure, scalable, and fully relational RESTful API built with Node.js, Express, and PostgreSQL. This backend handles user authentication, session security, and dynamic task workflows with strict data constraints.

## 🚀 Key Features

*   **Secure Authentication:** User login and account registration driven by `bcrypt` password hashing and state-managed JSON Web Tokens (JWT).
*   **Dynamic Data Querying:** Fully dynamic PostgreSQL `PATCH` routing that modifies only requested columns while preserving unedited database parameters.
*   **Filtering & Sorting:** Resource filtration via URL queries, including custom ENUM sorting that groups tasks by priority (`Urgent` -> `High` -> `Medium` -> `Low`).
*   **Robust Access Controls:** Strict row-level isolation using JWT metadata payload attributes to ensure users can only modify their own profiles and tasks.
*   **Centralized Error Handling:** Global middleware layer that intercepts PostgreSQL constraint violations and formats safe, standardized client-side error responses.

## 🛠️ Built With

*   **Runtime Environment:** Node.js
*   **Web Framework:** Express.js
*   **Database:** PostgreSQL (Raw SQL queries with parameterization using the `pg` driver)
*   **Security:** JSON Web Tokens (JWT), Bcrypt

---

## 📂 Project Architecture

This application utilizes a strict Separation of Concerns (SoC) layout following the MVC pattern:

```text
├── db/
│   ├── migrations/             # Databse building migrations to match api     
│   ├── queries/
│   │   ├── tasksQueries.sql    # Non-dynamic database queries for tasks
│   │   └── usersQueries.js     # Non-dynamic database queries for users
│   └── pool.js                 # PostgreSQL connection pool configuration
├── controllers/
│   ├── authController.js       # Heavy lifting for registration and login
│   ├── tasksController.js      # Task management and dynamic filtration queries
│   └── usersController.js      # Profile parameter updates
├── middleware/
│   ├── authenticateToken.js    # Cryptographic JWT authorization checks
│   ├── encryptPassword.js      # Automated password hashing hooks
│   └── getUserById.js          # Gets user info from db for security checks
├── routes/
│   ├── authRoutes.js           # Access request route mapping
|   ├── usersRoutes.js          # User data routing paths
│   └── taskRoutes.js           # Content interaction routing paths
├── .env                        # Application environment variables (Hidden)
├── server.js                   # App configuration & global error handling middleware
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   PostgreSQL instance running locally

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mechaneer31/smart-task-auditor.git
   cd your-repo-name
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and specify the following details:
   ```env
   PORT=3000
   DB_USER=your_postgres_user
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_PASSWORD=your_database_password
   DB_PORT=5432
   ACCESS_TOKEN_SECRET=your_super_secret_jwt_string
   ```

4. **Initialize Database Tables:**
   Execute your database schema migrations inside your PostgreSQL terminal to create the `users` table, `tasks` table, and custom `task_priority` ENUM type.
   ```bash
   npm run dbMigration -- <filename>
   ```

5. **Start the Express server:**
   ```bash
   npm run dev
   ```
   The API will now be listening locally at `http://localhost:3000`.

---

## 📑 Core API Endpoints

### Authentication Endpoints (`/auth`)
*   `POST /auth/register` - Registers a new system profile (Automated Bcrypt hashing).
*   `POST /auth/login` - Validates profile parameters and yields a secure JWT payload token.

### User Data Endpoints (`/users`)
*   `GET /users/:username` - Fetches users info.
*   `PATCH /users/:username` - Allows user to update their information.
*   `DELETE /users/:username` - Deletes users info and tasks from users table and tasks table.

### Task Management Endpoints (`/tasks`)
*   `POST /tasks` - Registers a new task scoped strictly to the current verified token identity.
*   `GET /tasks` - Lists tasks. Supports optional URL query filters (`?priority=High`, `?is_completed=false`).
*   `GET /tasks/:id` - Lists the single task details based on the task id.
*   `PATCH /tasks/:id` - Updates specific structural values. Only accepts whitelisted parameters (`title`, `description`, `category`, `priority`, `due_date`, `is_completed`).
*   `DELETE /tasks/:id` - Clears a single task if ownership criteria matches.




