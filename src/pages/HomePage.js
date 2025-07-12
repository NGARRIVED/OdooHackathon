import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Star, Clock, User, ChevronDown, Zap, Target, Globe, Sparkles, Award, TrendingUp, Building2, Shield } from 'lucide-react';
import UserProfileCard from '../components/UserProfileCard';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const usersPerPage = 6;

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('/api/user/public');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data.users || []);
        setFilteredUsers(data.users || []);
      } catch (err) {
        setError('Could not load users.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on search and availability
  useEffect(() => {
    let filtered = users;
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.skillsOffered && user.skillsOffered.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (user.skillsWanted && user.skillsWanted.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(user => user.availability === availabilityFilter);
    }
    if (sortBy !== 'default') {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, searchQuery, availabilityFilter, sortBy]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setAvailabilityFilter('all');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 opacity-60" />
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Professional Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="relative p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl opacity-5" />
              <Users className="w-16 h-16 text-blue-600 relative z-10" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-900">
            Professional Skill Exchange
            <br />
            <span className="text-blue-600">Network</span>
          </h1>
          
          <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-8 text-gray-600">
            Connect with verified professionals to share expertise and accelerate your career growth. 
            Join our trusted community of industry experts and lifelong learners.
          </p>
          
          {/* Professional search bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search professionals by name, skills, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Professional Stats and Filter Section */}
        <div className="mb-12">
          {/* Search Results Info */}
          {(searchQuery || availabilityFilter !== 'all') && (
            <div className="mb-6 p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {filteredUsers.length} {filteredUsers.length === 1 ? 'professional' : 'professionals'} found
                    </p>
                    {searchQuery && (
                      <p className="text-sm text-gray-600">
                        Searching for "{searchQuery}"
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-50 border border-gray-300 text-gray-700"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}

          {/* Professional Filter Controls */}
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-wrap gap-6 items-center justify-between">
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">Filter & Sort</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {/* Availability Filter */}
                <div className="relative">
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="appearance-none px-4 py-2 pr-8 rounded-lg font-medium cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 bg-white text-gray-900"
                  >
                    <option value="all">All Professionals</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="away">Away</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-3 w-4 h-4 pointer-events-none text-gray-400" />
                </div>
                
                {/* Sort Filter */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2 pr-8 rounded-lg font-medium cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 bg-white text-gray-900"
                  >
                    <option value="default">Default Sort</option>
                    <option value="rating">Highest Rating</option>
                    <option value="name">Name A-Z</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-3 w-4 h-4 pointer-events-none text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-20 text-lg">{error}</div>
        ) : currentUsers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentUsers.map((user, index) => (
                <div key={user._id || user.id} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                  <UserProfileCard user={user} />
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {Math.ceil(filteredUsers.length / usersPerPage) > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="relative p-8 rounded-2xl bg-white shadow-lg border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl opacity-5" />
                <Search className="w-20 h-20 text-gray-400 relative z-10" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold mb-4 text-gray-900">
              No professionals found
            </h3>
            <p className="text-lg mb-8 max-w-md mx-auto text-gray-600">
              {searchQuery 
                ? `We couldn't find any professionals matching "${searchQuery}". Try adjusting your search terms.`
                : "No professionals match your current filters. Try broadening your search criteria."
              }
            </p>
            
            <button
              onClick={clearAllFilters}
              className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default HomePage;