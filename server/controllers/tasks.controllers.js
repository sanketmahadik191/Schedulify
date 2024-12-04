// server/controllers/taskController.js

const Task = require("../models/taskSchema");
const Log = require("../models/logSchema");
const cronParser = require("cron-parser");
const scheduleTasks = require('../scheduler/scheduleTasks');

// Helper: Calculate the next execution time based on the cron expression
const calculateNextExecution = (cronExpression) => {
  try {
    const interval = cronParser.parseExpression(cronExpression);
    return interval.next().toDate();
  } catch (err) {
    console.error(`Invalid cron expression: ${cronExpression}`, err);
    return null;
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { displayName, cronExpression, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const nextExecution = calculateNextExecution(cronExpression);
    if (!nextExecution) {
      return res.status(400).json({ message: "Invalid cron expression" });
    }

    const newTask = new Task({
      displayName,
      cronExpression,
      email,
      nextExecution,
    });

    await newTask.save();
    await scheduleTasks(); // Reschedule tasks
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get a single task
const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { displayName, cronExpression, email, status, disabled } = req.body;

    const nextExecution = calculateNextExecution(cronExpression);
    if (!nextExecution) {
      return res.status(400).json({ message: "Invalid cron expression" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        displayName,
        cronExpression,
        email,
        status,
        disabled,
        nextExecution,
      },
      { new: true }
    );

    await scheduleTasks(); // Reschedule tasks
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);
    await scheduleTasks(); // Reschedule tasks
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Get task logs
const getTaskLogs = async (req, res) => {
  try {
    const { taskId } = req.params;

    const logs = await Log.find({ taskId });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error });
  }
};

module.exports = {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskLogs,
};

