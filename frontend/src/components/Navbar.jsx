import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="cis-header">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold">
            CIS 1200 <span className="text-red-300">Study Tool</span>
          </Link>
          <div className="text-sm text-gray-300 mt-1">
            Programming Languages and Techniques
          </div>
        </div>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-red-200">Home</Link>
          <Link to="/exercises" className="hover:text-red-200">Exercises</Link>
          <Link to="/ide" className="hover:text-red-200">OCaml IDE</Link>
          <Link to="/videos" className="hover:text-red-200">Videos</Link>
          {user ? (
            <>
              <span className="text-gray-300">Welcome, {user.name}</span>
              <button onClick={logout} className="cis-button cis-button-primary text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-200">Login</Link>
              <Link to="/register" className="cis-button text-sm">Register</Link>
              <span className="text-gray-400 text-sm">(Guest)</span>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
