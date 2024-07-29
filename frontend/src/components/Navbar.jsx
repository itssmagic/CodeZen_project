import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAdmin }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/">CodeZen</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/problems" className="text-gray-300 hover:text-white">
            Problems
          </Link>
          {isAdmin && (
            <>
              <Link to="/problems/add" className="text-gray-300 hover:text-white">
                Add Problem
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
