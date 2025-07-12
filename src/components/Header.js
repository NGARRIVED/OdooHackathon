import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header = ({ onNavigate }) => {
  const { isLoggedIn, login, logout } = useAuth();
  const [availability, setAvailability] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleLoginToggle = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login();
    }
  };

  return (
    <header className="bg-dark-800 border-b border-dark-600 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Title and Home button */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">Skill Swap Platform</h1>
        </div>

        {/* Center - Availability dropdown and search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="bg-dark-700 border border-dark-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="flex-1 bg-dark-700 border border-dark-600 text-white rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right side - Profile and Login/Logout buttons */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <button
              onClick={() => onNavigate && onNavigate('profile')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Profile
            </button>
          )}
          <button
            onClick={handleLoginToggle}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isLoggedIn
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 