// server/scheduler/scheduleTasks.js

const cron = require('node-cron');
const Task = require('../models/taskSchema');
const executeTask = require('../config/nodemailer');

const scheduledTasks = new Map(); // Track scheduled tasks

// Function to schedule tasks
const scheduleTasks = async () => {
  try {
    const tasks = await Task.find({ disabled: false });

    // Clear existing scheduled tasks
    scheduledTasks.forEach((taskCron, taskId) => {
      taskCron.stop();
      scheduledTasks.delete(taskId);
    });

    for (const task of tasks) {
      if (!cron.validate(task.cronExpression)) {
        console.error(`Invalid cron expression for task ${task._id}: ${task.cronExpression}`);
        continue;
      }

      const cronJob = cron.schedule(task.cronExpression, async () => {
        await executeTask(task);
      });

      // Store the cron job in the map
      scheduledTasks.set(task._id.toString(), cronJob);
    }
  } catch (error) {
    console.error('Error scheduling tasks:', error);
  }
};

module.exports = scheduleTasks;

