const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskLogs,
  getTask,
} = require("../controllers/tasks.controllers");

const router = express.Router();

// Task Routes
router.post("/createTask", createTask);
router.get("/getTask/:taskId",getTask)
router.get("/getTasks", getTasks);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);
router.get("/tasks/:taskId/logs", getTaskLogs);

module.exports = router;
