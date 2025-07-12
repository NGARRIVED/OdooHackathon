import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';
import { mockUsers } from '../data/mockData';

const HomePage = () => {
  const location = useLocation();
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const usersPerPage = 6;

  // Handle search from header
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

  // Filter users based on search and availability
  useEffect(() => {
    let filtered = users;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skillsOffered.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        user.skillsWanted.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by availability (mock implementation)
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(user => {
        // Mock availability logic - in real app this would come from user data
        const availabilityMap = {
          'available': [1, 2, 3], // User IDs that are available
          'busy': [4, 5],
          'away': [6]
        };
        return availabilityMap[availabilityFilter]?.includes(user.id) || false;
      });
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [users, searchQuery, availabilityFilter]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Find Your Skill Swap Partner
        </h1>
        <p className="text-gray-400">
          Connect with people who can teach you new skills while sharing your expertise
        </p>
        
        {/* Search Results Info */}
        {searchQuery && (
          <div className="mt-4 p-4 bg-dark-800 rounded-lg border border-dark-600">
            <p className="text-white">
              Showing {filteredUsers.length} results for "{searchQuery}"
              {filteredUsers.length !== users.length && (
                <span className="text-gray-400 ml-2">
                  (filtered from {users.length} total users)
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-gray-300 text-sm">Availability:</label>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="bg-dark-700 border border-dark-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Users</option>
            <option value="available">Available Now</option>
            <option value="busy">Busy</option>
            <option value="away">Away</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-gray-300 text-sm">Sort by:</label>
          <select
            onChange={(e) => {
              const sorted = [...filteredUsers].sort((a, b) => {
                switch (e.target.value) {
                  case 'rating':
                    return b.rating - a.rating;
                  case 'name':
                    return a.name.localeCompare(b.name);
                  default:
                    return 0;
                }
              });
              setFilteredUsers(sorted);
            }}
            className="bg-dark-700 border border-dark-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="default">Default</option>
            <option value="rating">Highest Rating</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      {currentUsers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
          <p className="text-gray-400 mb-4">
            {searchQuery 
              ? `No users match your search for "${searchQuery}"`
              : "No users are currently available with the selected filters"
            }
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setAvailabilityFilter('all');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage; 