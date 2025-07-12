import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MagnifyingGlassIcon, HomeIcon, UserIcon, CogIcon, BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { isLoggedIn, user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [availability, setAvailability] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Navigate to home page with search query
    navigate('/', { state: { searchQuery } });
  };

  const handleLoginToggle = () => {
    if (isLoggedIn) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-dark-800 border-b border-dark-600 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
            <HomeIcon className="w-6 h-6" />
            <h1 className="text-xl font-bold">Skill Swap</h1>
          </Link>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-dark-700'
              }`}
            >
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive('/profile') 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  Profile
                </Link>
                <Link
                  to="/swap-requests"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive('/swap-requests') 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  Requests
                </Link>
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      isActive('/admin') 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>

        {/* Center - Search and Filters */}
        <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="bg-dark-700 border border-dark-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Availability</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="away">Away</option>
          </select>

          <div className="flex-1 flex">
            <input
              type="text"
              placeholder="Search skills or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-dark-700 border border-dark-600 text-white rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right side - User Actions */}
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <button className="text-gray-400 hover:text-white transition-colors relative">
                <BellIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </span>
                </div>
                <button
                  onClick={handleLoginToggle}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 