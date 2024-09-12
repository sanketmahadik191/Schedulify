
import './App.css'
import Navbar from './components/Navbar'
import ListTable from './components/ListTable'
import {Route, Routes } from 'react-router-dom';
import CreateTask from './components/CreateTask';
import UpdateTask from './components/UpdateTask';
import TaskLogs from './components/TaskLogs';

function App() {
 
  return (
    <>
      <Navbar></Navbar>
      <div>
        <Routes>
          <Route path="/" element={<ListTable />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/update/:taskId" element={<UpdateTask />} />
          <Route path="/logs/:taskId" element={<TaskLogs />} />
        </Routes>
      </div>
    </>
  )
}

export default App
