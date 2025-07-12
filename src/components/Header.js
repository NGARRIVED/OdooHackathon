import React, { useState } from 'react';
import { MagnifyingGlassIcon, HomeIcon, UserIcon, CogIcon, UsersIcon, ShieldCheckIcon, ChevronDownIcon, BuildingOffice2Icon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [availability, setAvailability] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('/');

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // In a real app, this would trigger search functionality
  };

  const handleNavigation = (path) => {
    setCurrentPage(path);
    navigate(path);
  };

  const isActive = (path) => currentPage === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
      {/* Professional background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white opacity-80" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <button onClick={() => navigate('/')} className="flex items-center space-x-3 group">
              <div className="relative p-2 rounded-lg bg-blue-600 group-hover:bg-blue-700 transition-all duration-300">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Skill Exchange
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Professional Network</p>
              </div>
            </button>
            
            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => navigate('/')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/') 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </button>
              {isLoggedIn && (
                <>
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive('/dashboard') 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive('/profile') 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/swap-requests')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive('/swap-requests') 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    <UsersIcon className="w-4 h-4" />
                    <span>Requests</span>
                  </button>
                  {user?.isAdmin && (
                    <button
                      onClick={() => handleNavigation('/admin')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isActive('/admin') 
                          ? 'bg-red-600 text-white shadow-md' 
                          : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Admin</span>
                    </button>
                  )}
                </>
              )}
            </nav>
          </div>

          {/* Center - Professional Search and Filters */}
          <div className="flex items-center space-x-4 flex-1 max-w-lg mx-8">
            <div className="relative">
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="appearance-none bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium cursor-pointer transition-all duration-300"
              >
                <option value="all">All Professionals</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="away">Away</option>
              </select>
              <ChevronDownIcon className="absolute right-2 top-3 w-4 h-4 pointer-events-none text-gray-400" />
            </div>

            <div className="flex-1 relative">
              <div className="flex">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search professionals, skills, or companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Professional User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <NotificationDropdown />

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-semibold text-sm">
                          {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </span>
                      </div>
                      <div className="text-left hidden md:block">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.title || 'Professional'}
                        </p>
                      </div>
                    </div>
                    <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                            <p className="text-sm text-gray-500">{user?.title || 'Professional'}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <BuildingOffice2Icon className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{user?.company || 'Company'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <button
                          onClick={() => {
                            handleNavigation('/dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <UserIcon className="w-4 h-4" />
                          <span>Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            handleNavigation('/profile');
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <UserIcon className="w-4 h-4" />
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            handleNavigation('/settings');
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <CogIcon className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={logout}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-300"
                >
                  <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="flex items-center space-x-2 px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                >
                  <UserPlusIcon className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="lg:hidden border-t border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className={`p-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <HomeIcon className="w-5 h-5" />
            </button>
            {isLoggedIn && (
              <>
                <button
                  onClick={() => handleNavigation('/profile')}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive('/profile') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <UserIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleNavigation('/swap-requests')}
                  className={`p-2 rounded-lg transition-colors ${
                    isActive('/swap-requests') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <UsersIcon className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;