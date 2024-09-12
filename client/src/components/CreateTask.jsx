import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    displayName: "",
    cronExpression: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:10000/api/createTask", taskData);
      alert("Task created successfully");
      navigate("/");
    } catch (error) {
      alert("Error creating task:", error);
    }
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCronChange = (e) => {
    setTaskData({
      ...taskData,
      cronExpression: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create New Task
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Display Name:
          </label>
          <input
            type="text"
            name="displayName"
            value={taskData.displayName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Task Name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Schedule:
          </label>
          <select
            name="cronExpression"
            value={taskData.cronExpression}
            onChange={handleCronChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a schedule
            </option>
            <option value="*/1 * * * *">Every minute</option>
            <option value="*/5 * * * *">Every 5 minutes</option>
            <option value="*/10 * * * *">Every 10 minutes</option>
            <option value="*/15 * * * *">Every 15 minutes</option>
            <option value="*/30 * * * *">Every 30 minutes</option>
            <option value="0 * * * *">Every hour</option>
            <option value="0 0 * * *">Daily at midnight</option>
            <option value="0 0 * * 0">Weekly on Sunday at midnight</option>
            <option value="0 0 1 * *">Monthly on the 1st at midnight</option>
            <option value="0 0 1 1 *">Yearly on January 1st at midnight</option>
            <option value="0 0 0 0 0">
              Weekly on Sunday at midnight (alternative format)
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
