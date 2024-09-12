const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const Log = require("../models/logSchema");
const Task = require("../models/taskSchema");
const cronParser = require('cron-parser');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const calculateNextExecution = (cronExpression) => {
  const interval = cronParser.parseExpression(cronExpression);
  return interval.next().toDate();
};

// Function to send emails
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

// Execute a single task and log its execution
const executeTask = async (task) => {
  const emailResponse = await sendEmail(
    "sanketm457@gmail.com",
    `Scheduled Email from ${task.displayName}`,
    `This is a reminder email sent by the task: ${task.displayName}.`
  );

  const log = new Log({
    taskId: task._id,
    status: emailResponse.success ? "success" : "error",
    message: emailResponse.success
      ? "Email sent successfully"
      : emailResponse.error.message,
  });

  await log.save();

  if (emailResponse.success) {
    task.successCount += 1;
    task.lastSuccess = new Date();
  } else {
    task.errorCount += 1;
    task.lastError = new Date();
  }

  task.nextExecution = calculateNextExecution(task.cronExpression);
  await task.save();
};

module.exports = executeTask;
