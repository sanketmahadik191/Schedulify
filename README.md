# Task Scheduler Project

## Project Description

This project is a task scheduler application built with the MERN stack (MongoDB, Express, React, Node.js) and Vite for the frontend. It allows users to create, manage, and schedule tasks with various cron expressions. The tasks can trigger actions such as sending emails, and the application logs these actions along with their execution status.

## Hosted Link - [Click here](https://schedulify-client.onrender.com)
    
## Setup Instructions -


### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/task-scheduler-project.git
   cd task-scheduler-project
   ```

2. **Install Backend Dependencies:**
 ```bash
   cd server
   npm install
```

3. **Install Frontend Dependencies:**
 ```bash
    cd client
    npm install
```

4. **Environment variables**
 ```bash
   #server .env
   MONGO_URI=<your_mongo_db_connection_string>
   EMAIL_USER=<your_email_address>
   EMAIL_PASS=<your_email_password>

  #client .env
  VITE_PORT=3000
  VITE_SERVER_API=http://localhost:10000/api
```

5. Running The Project
  1.Start the backend
    ```bash
     cd server
     npm start
    ```
  2.Start the frontend
  ```bash
     cd client
     npm run dev
   ```

## How It Works
  The task scheduler in this application uses cron expressions to determine when tasks should be executed. Tasks can be scheduled to run at specific intervals, such as every minute, every hour, or daily at midnight. Here’s a detailed breakdown of how the scheduler operates:

 1. **Task Creation**
   - Users can create tasks by specifying a display name and a cron expression
   - The cron expression defines the schedule for when the task should be executed. Examples include */5 * * * * for every 5 minutes or 0 0 * * * for daily at midnight.

 2. **Task Execution**
   - Scheduled Tasks are managed using the node-cron library, which parses the cron expression and executes tasks according to the defined schedule.
   - Actions triggered by tasks might include sending emails or executing custom functions.
 3. **Logging**
   - Task Execution logs are created for each run, indicating whether the execution was successful or resulted in an error.
   - Logs include a timestamp, the task ID, status, and a message.
