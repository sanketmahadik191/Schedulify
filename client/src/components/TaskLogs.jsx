import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskLogs = () => {
const {taskId} = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`http://localhost:10000/api/tasks/${taskId}/logs`);
        setLogs(res.data);
      } catch (error) {
        setError('Error fetching logs');
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [taskId]);

  if (loading) {
    return <div className="text-center py-4">Loading logs...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Logs for Task {taskId}</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b px-4 py-2 text-left">Status</th>
            <th className="border-b px-4 py-2 text-left">Message</th>
            <th className="border-b px-4 py-2 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="3" className="border-b px-4 py-2 text-center">No logs available</td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log._id}>
                <td className="border-b px-4 py-2">{log.status}</td>
                <td className="border-b px-4 py-2">{log.message}</td>
                <td className="border-b px-4 py-2">{new Date(log.timeStamp).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskLogs;
