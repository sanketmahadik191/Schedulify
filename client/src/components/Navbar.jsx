import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 flex justify-center items-center bg-slate-800 text-white">
      {/* <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-md text-black border bg-slate-300"
        />
      </div> */}

      {/* Navbar Links */}
      <div className="space-x-10">
        <Link to="/" className="hover:text-gray-400">View List</Link>
        <Link to="/create" className="hover:text-gray-400">Create Task</Link>
      </div>
    </nav>
  );
};

export default Navbar;
