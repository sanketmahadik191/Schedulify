const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cron = require("node-cron");
const taskRoutes = require("./routes/tasks.routes");
const nodemailer = require("nodemailer");
const Log = require("./models/logSchema");
const Task = require("./models/taskSchema");
const cronParser = require('cron-parser');
const executeScheduledTasks = require("./config/nodemailer");
const scheduleTasks = require("./controllers/scheduleTasks");

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database connection error:", err));

// Routes
app.use("/api", taskRoutes);


scheduleTasks();
// Cron Job: Run every minute


// Execute scheduled tasks and log them


// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
