import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="text-2xl font-bold mb-2 sm:mb-0">
          <Link to="/">Task Scheduler</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-200">
            View Tasks
          </Link>
          <Link to="/create" className="hover:text-gray-200">
            Create Task
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
