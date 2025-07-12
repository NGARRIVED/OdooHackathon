import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Star, Clock, User, ChevronDown, Zap, Target, Globe, Sparkles, Award, TrendingUp, Building2, Shield } from 'lucide-react';

// Mock data since we don't have access to the original
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    skillsOffered: ["React", "JavaScript", "UI/UX Design"],
    skillsWanted: ["Python", "Machine Learning"],
    rating: 4.8,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Marcus Thompson",
    skillsOffered: ["Python", "Data Science", "SQL"],
    skillsWanted: ["React", "Frontend Development"],
    rating: 4.9,
    title: "Data Scientist",
    company: "DataFlow Inc",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    skillsOffered: ["Graphic Design", "Adobe Creative Suite"],
    skillsWanted: ["Web Development", "CSS"],
    rating: 4.7,
    title: "Creative Director",
    company: "Design Studio",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David Kim",
    skillsOffered: ["Node.js", "Backend Development"],
    skillsWanted: ["DevOps", "AWS"],
    rating: 4.6,
    title: "Backend Engineer",
    company: "CloudTech",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Lisa Wang",
    skillsOffered: ["Machine Learning", "TensorFlow"],
    skillsWanted: ["Mobile Development", "React Native"],
    rating: 4.8,
    title: "ML Engineer",
    company: "AI Solutions",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Alex Johnson",
    skillsOffered: ["Digital Marketing", "SEO"],
    skillsWanted: ["Analytics", "Data Visualization"],
    rating: 4.5,
    title: "Marketing Manager",
    company: "Growth Labs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

const UserCard = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative group overflow-hidden rounded-xl backdrop-blur-sm border transition-all duration-500 transform ${
        isHovered ? 'scale-102' : 'scale-100'
      }`}
      style={{
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        boxShadow: isHovered 
          ? '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)' 
          : '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(229, 231, 235, 0.6)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Professional gradient overlay on hover */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(37, 99, 235, 0.02) 100%)'
        }}
      />
      
      {/* Professional border accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} style={{ backgroundColor: '#3b82f6' }} />
      
      <div className="relative p-6">
        {/* Header with avatar and status */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 transition-all duration-300"
                style={{
                  borderColor: isHovered ? '#3b82f6' : '#e5e7eb'
                }}
              />
              {/* Professional status indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                   style={{ backgroundColor: '#10b981' }}>
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{user.title}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Building2 className="w-3 h-3" />
                <span>{user.company}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span className="text-sm font-medium text-gray-900">{user.rating}</span>
            </div>
            <Shield className="w-4 h-4 text-blue-600 mx-auto" />
          </div>
        </div>
        
        {/* Skills sections */}
        <div className="space-y-5 mb-6">
          {/* Expertise */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-1.5 rounded-md bg-blue-50">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Expertise</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-100 transition-all duration-300 hover:bg-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Learning interests */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-1.5 rounded-md bg-green-50">
                <Target className="w-3.5 h-3.5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Learning</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-green-50 text-green-700 border border-green-100 transition-all duration-300 hover:bg-green-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Professional action button */}
        <button 
          className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
        >
          <div className="flex items-center justify-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Connect</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return (
    <div className="flex justify-center items-center space-x-2">
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
            currentPage === page 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }`}
        >
          {page}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};

const HomePage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const usersPerPage = 6;

  // Filter users based on search and availability
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
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

      // Filter by availability
      if (availabilityFilter !== 'all') {
        filtered = filtered.filter(user => {
          const availabilityMap = {
            'available': [1, 2, 3],
            'busy': [4, 5],
            'away': [6]
          };
          return availabilityMap[availabilityFilter]?.includes(user.id) || false;
        });
      }

      // Sort users
      if (sortBy !== 'default') {
        filtered = [...filtered].sort((a, b) => {
          switch (sortBy) {
            case 'rating':
              return b.rating - a.rating;
            case 'name':
              return a.name.localeCompare(b.name);
            default:
              return 0;
          }
        });
      }

      setFilteredUsers(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300);
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
        ) : currentUsers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentUsers.map((user, index) => (
                <div 
                  key={user.id}
                  className="opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <UserCard user={user} />
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