import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    displayName: '',
    cronExpression: '',
    status: 'active',
    disabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:10000/api/getTask/${taskId}`);
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
      await axios.put(`http://localhost:10000/api/tasks/${taskId}`, taskData);
      alert('Task updated successfully');
      navigate('/'); // Redirect to home or task list page after updating
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Error updating task');
    }
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="displayName">
            Display Name:
          </label>
          <input
            id="displayName"
            type="text"
            name="displayName"
            value={taskData.displayName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="cronExpression">
            Cron Expression:
          </label>
          <input
            id="cronExpression"
            type="text"
            name="cronExpression"
            value={taskData.cronExpression}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
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
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
