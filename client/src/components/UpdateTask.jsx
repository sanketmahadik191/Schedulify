import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    displayName: '',
    email: '',
    cronExpression: '',
    status: 'active',
    disabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/getTask/${taskId}`);
        setTaskData(res.data);
      } catch (error) {
        setError('Error fetching task');
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tasks/${taskId}`, taskData);
      alert('Task updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Error updating task');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({
      ...taskData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-4">Error: {error}</div>
    );

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Update Task</h2>
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
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Status:
          </label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="error">Error</option>
          </select>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="disabled"
              checked={taskData.disabled}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Disabled</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
