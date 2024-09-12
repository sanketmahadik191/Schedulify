const Task = require("../models/taskSchema");
const Log = require("../models/logSchema");
const cronParser = require("cron-parser");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { displayName, cronExpression } = req.body;

    const newTask = new Task({
      displayName,
      cronExpression,
      nextExecution: calculateNextExecution(cronExpression),
    });

    await newTask.save();
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

const getTask = async (req, res) => {
    try {
        const {taskId} = req.params;
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks", error });
    }
  };

// Update a task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { displayName, cronExpression, status, disabled } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        displayName,
        cronExpression,
        status,
        disabled,
        nextExecution: calculateNextExecution(cronExpression),
      },
      { new: true }
    );

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
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Get task logs
const getTaskLogs = async (req, res) => {
  try {
    const { taskId } = req.params;
    console.log(taskId);
    
    const logs = await Log.find({ taskId });
    res.status(200).json(logs);
    console.log(45)
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error });
  }
};

// Helper: Calculate the next execution time based on the cron expression
const calculateNextExecution = (cronExpression) => {
  const interval = cronParser.parseExpression(cronExpression);
  return interval.next().toDate();
};

module.exports = { createTask,getTask , getTasks, updateTask, deleteTask, getTaskLogs };
