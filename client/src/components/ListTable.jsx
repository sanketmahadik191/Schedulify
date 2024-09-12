import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import cronParser from 'cron-parser';

const ListTable = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:10000/api/getTasks");
        setTasks(res.data);
      } catch (error) {
        setError("Error fetching tasks. Please try again later.");
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:10000/api/tasks/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (error) {
        setError("Error deleting task. Please try again later.");
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
        return 'Unknown schedule';
    }
  };
  

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {error && <div className="bg-red-500 text-white p-4 rounded-md mb-4">{error}</div>}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="checkbox" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Display Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Success</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Error</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disabled</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retries</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Execution</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.displayName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getCronDescription(task.cronExpression)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.successCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.errorCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.lastSuccess ? new Date(task.lastSuccess).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.lastError ? new Date(task.lastError).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.disabled ? "Yes" : "No"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.retries}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.nextExecution ? new Date(task.nextExecution).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/update/${task._id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
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
                <td colSpan="12" className="text-center py-4">No tasks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTable;
