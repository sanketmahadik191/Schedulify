// server/config/nodemailer.js

const nodemailer = require("nodemailer");
const Log = require("../models/logSchema");
const cronParser = require('cron-parser');
const dotenv = require("dotenv");

dotenv.config();

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
  try {
    if (!task.email) {
      throw new Error('Task has no email address defined.');
    }

    console.log('Executing task for:', task.displayName);
    console.log('Recipient Email:', task.email);

    const emailResponse = await sendEmail(
      task.email,
      `Scheduled Email from ${task.displayName}`,
      `This is a reminder email sent by the task: ${task.displayName}.`
    );

    const log = new Log({
      taskId: task._id,
      status: emailResponse.success ? 'success' : 'error',
      message: emailResponse.success
        ? 'Email sent successfully'
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
  } catch (error) {
    console.error('Error executing task:', error);
  }
};

module.exports = executeTask;

