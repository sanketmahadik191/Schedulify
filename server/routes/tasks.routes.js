// server/routes/tasks.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks.controllers');

// Task routes
router.post('/createTask', taskController.createTask);
router.get('/getTasks', taskController.getTasks);
router.get('/getTask/:taskId', taskController.getTask);
router.put('/tasks/:taskId', taskController.updateTask);
router.delete('/tasks/:taskId', taskController.deleteTask);
router.get('/tasks/:taskId/logs', taskController.getTaskLogs);

module.exports = router;

