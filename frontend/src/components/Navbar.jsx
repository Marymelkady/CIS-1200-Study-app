import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold">
            CIS 1200 <span className="text-red-300">Study Tool</span>
          </Link>
          <div className="text-sm text-gray-300 mt-1">
            Programming Languages and Techniques
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:text-red-200">Home</Link>
          <Link to="/exercises" className="hover:text-red-200">Exercises</Link>
          <Link to="/ide" className="hover:text-red-200">OCaml IDE</Link>
          <Link to="/videos" className="hover:text-red-200">Videos</Link>
          <Link to="/test" className="hover:text-red-200">Proficiency Test</Link>
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-200">Login</Link>
              <Link to="/register" className="hover:text-red-200">Register</Link>
              <span className="text-gray-400 text-sm">(Guest)</span>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
