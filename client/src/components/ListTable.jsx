import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListTable = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/getTasks');
        setTasks(res.data);
      } catch (error) {
        setError('Error fetching tasks. Please try again later.');
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (error) {
        setError('Error deleting task. Please try again later.');
        console.error(error);
      }
    }
  };

  const getCronDescription = (cronExpression) => {
    switch (cronExpression) {
      case '*/1 * * * *':
        return 'Every minute';
      case '*/5 * * * *':
        return 'Every 5 minutes';
      case '*/10 * * * *':
        return 'Every 10 minutes';
      case '*/15 * * * *':
        return 'Every 15 minutes';
      case '*/30 * * * *':
        return 'Every 30 minutes';
      case '0 * * * *':
        return 'Every hour';
      case '0 0 * * *':
        return 'Daily at midnight';
      case '0 0 * * 0':
        return 'Weekly on Sunday at midnight';
      case '0 0 1 * *':
        return 'Monthly on the 1st at midnight';
      case '0 0 1 1 *':
        return 'Yearly on January 1st at midnight';
      default:
        return cronExpression;
    }
  };

  return (
    <div className="overflow-x-auto">
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-md mb-4">{error}</div>
      )}
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Display Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Schedule</th>
            <th className="px-4 py-2 text-left">Success Count</th>
            <th className="px-4 py-2 text-left">Error Count</th>
            <th className="px-4 py-2 text-left">Last Success</th>
            <th className="px-4 py-2 text-left">Last Error</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Next Execution</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="px-4 py-2">{task.displayName}</td>
                <td className="px-4 py-2">{task.email}</td>
                <td className="px-4 py-2">
                  {getCronDescription(task.cronExpression)}
                </td>
                <td className="px-4 py-2">{task.successCount}</td>
                <td className="px-4 py-2">{task.errorCount}</td>
                <td className="px-4 py-2">
                  {task.lastSuccess
                    ? new Date(task.lastSuccess).toLocaleString()
                    : 'N/A'}
                </td>
                <td className="px-4 py-2">
                  {task.lastError
                    ? new Date(task.lastError).toLocaleString()
                    : 'N/A'}
                </td>
                <td className="px-4 py-2">{task.status}</td>
                <td className="px-4 py-2">
                  {task.nextExecution
                    ? new Date(task.nextExecution).toLocaleString()
                    : 'N/A'}
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="mb-2 sm:mb-0 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/update/${task._id}`}
                      className="mb-2 sm:mb-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/logs/${task._id}`}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                      View Logs
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListTable;
