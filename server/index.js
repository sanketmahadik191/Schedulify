// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./routes/tasks.routes");
const scheduleTasks = require("./scheduler/scheduleTasks");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start scheduling tasks after successful DB connection
    scheduleTasks();
  })
  .catch((err) => console.log("Database connection error:", err));

// Routes
app.use("/api", taskRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

