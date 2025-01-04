# WorkQueue - Task Management App

## Overview

WorkQueue is a task management web application built using the MERN stack (MongoDB, Express, ReactJS, NodeJS) with secure user authentication via JWT (JSON Web Token). It empowers users to create, manage, update, and delete tasks. Additionally, employee management features allow administrators to assign tasks to employees, fostering improved collaboration and organization.

## Key Features

*   **User Authentication:** Secure login and registration processes with JWT for enhanced user access control.
*   **CRUD Operations:** Create, Read, Update, and Delete tasks efficiently, based on user privileges.
*   **Employee Management:** Admin users can manage employee information and assign tasks, streamlining workflows.
*   **Role-Based Access Control:** Differentiated permissions for admins and employees to ensure appropriate control.
*   **Responsive Design:** The ReactJS-built front-end utilizes TailwindCSS for a seamless user experience across diverse devices.

## Technologies Used

*   **ReactJS:** For crafting the interactive front-end user interface.
*   **NodeJS:** Powers the back-end server, handling application logic and data access.
*   **Express:** Enables the server to manage HTTP requests and map them to appropriate routes.
*   **MongoDB:** Serves as the data storage solution, providing a flexible and scalable foundation.
*   **Mongoose:** Streamlines object modeling for MongoDB, simplifying data interactions.
*   **JWT (JSON Web Token):** Ensures secure authentication and authorization by managing user credentials.
*   **TailwindCSS:** Provides a utility-first approach to CSS, simplifying the development of responsive layouts and styles.

## Installation

### Prerequisites

*   **Node.js:** Ensure you have Node.js installed on your system. Download and install it from the official website ([https://nodejs.org/](https://nodejs.org/)) if not already present.
*   **MongoDB:** Set up a MongoDB database instance either locally or on a cloud service like MongoDB Atlas.
*   **NPM (Node Package Manager):** NPM typically comes bundled with Node.js. Verify its presence using `npm -v` in your terminal.

### Steps

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/mdumair0/work-queue.git
    cd workqueue
    ```

2.  **Install Dependencies:**

    *   Install required packages for the server (backend):

        ```bash
        cd server
        npm install
        ```

    *   Install necessary packages for the client (frontend):

        ```bash
        cd client
        npm install
        ```

3.  **Set Up MongoDB:**

    *   If utilizing a local MongoDB instance, follow its configuration instructions.
    *   For a cloud service like MongoDB Atlas, create a database and cluster, and retrieve the connection string. Update the `.env` file in the server directory with your connection string.

4.  **Environment Variables:**

    *   Create a `.env` file (if it doesn't exist) in the server directory.
    *   Set the following environment variables within the `.env` file, replacing placeholders with your actual values:

        ```
        JWT_SECRET=your_jwt_secret
        MONGODB_URI=your_mongodb_connection_string
        ```

    *   The `JWT_SECRET` is a crucial security measure used for user authentication. Choose a strong and unique secret key.

5.  **Run the Server and Client:**

    *   For streamlined development, execute both the server and client concurrently:

        **Start the Server:**

        ```bash
        cd server
        npm run dev
        ```

        *   This starts the server typically on port `5000`.

        **Start the Client:**

        ```bash
        cd client
        npm start
        ```

        *   This launches the client application, usually accessible at `http://localhost:3000` in your web browser.

## API Endpoints

The application exposes several API endpoints for user interactions. Here's a breakdown:

**Authentication**

*   `POST /user`: Registers a new user within the system.
*   `POST /user/login`: Logs in an existing user, returning a JWT token upon successful authentication.
*   `POST /user/logout`: Logs Out the current logged-in user.
*   `DELETE /user/:id`: Deletes a User.

**Task Management**

*   `GET /tasks`: Retrieves all tasks associated with the logged-in user, considering their role-based permissions.
*   `POST /task`: Creates a new task within the system.
*   `PUT /task/:id`: Updates an existing task's details.
*   `DELETE /task/:id`: Deletes a task.

**Employee Management (Admin Only)**

*   `GET /api/employees`: Retrieves a list of all employees.
*   `POST /api/employees`: Adds a new employee.
*   `PUT /api/employees/:id`: Updates employee information.
*   `DELETE /api/employees/:id`: Deletes an employee.

## Usage

*   **Login:** Users can log in with their credentials (email and password).
*   **Task Management:** Once logged in, users can manage their tasks according to their permissions.
*   **Admin Role:** Admins have the ability to manage and assign tasks to employees.
