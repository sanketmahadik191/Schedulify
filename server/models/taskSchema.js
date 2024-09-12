const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  cronExpression: {
    type: String,
    required: true,
  },
  successCount: {
    type: Number,
    default: 0,
  },
  errorCount: {
    type: Number,
    default: 0,
  },
  lastSuccess: {
    type: Date,
  },
  lastError: {
    type: Date,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "completed", "error"],
    default: "active",
  },
  nextExecution: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
