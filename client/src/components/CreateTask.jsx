import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    displayName: '',
    email: '',
    cronExpression: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/createTask', taskData);
      alert('Task created successfully');
      navigate('/');
    } catch (error) {
      alert(
        `Error creating task: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Display Name:
          </label>
          <input
            type="text"
            name="displayName"
            value={taskData.displayName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Task Name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            value={taskData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Email Address"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Schedule:
          </label>
          <select
            name="cronExpression"
            value={taskData.cronExpression}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
