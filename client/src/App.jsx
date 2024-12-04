import React from 'react';
import Navbar from './components/Navbar';
import ListTable from './components/ListTable';
import CreateTask from './components/CreateTask';
import UpdateTask from './components/UpdateTask';
import TaskLogs from './components/TaskLogs';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ListTable />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/update/:taskId" element={<UpdateTask />} />
          <Route path="/logs/:taskId" element={<TaskLogs />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
