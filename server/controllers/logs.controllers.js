const Log = require('../models/Log');

// Get all logs
const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs', error });
  }
};

// Add log entry (usually called within task execution)
const addLog = async (taskId, status, message) => {
  try {
    const newLog = new Log({
      taskId,
      status,
      message,
    });
    await newLog.save();
  } catch (error) {
    console.error('Error saving log:', error);
  }
};

module.exports = {
  getAllLogs,
  addLog,
};
