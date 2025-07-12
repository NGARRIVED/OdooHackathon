import React, { useState } from 'react';
import { StarIcon, MapPinIcon, BriefcaseIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserProfileCard = ({ user }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
  // Fallback for avatar
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  const handleRequestClick = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    // Navigate to the detailed profile page where they can send a request
    navigate(`/user/${user._id || user.id}`);
  };

  const isOwnProfile = currentUser && (currentUser._id === user._id || currentUser.id === user.id);

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center space-y-6">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-md mb-2 overflow-hidden">
        {user.profilePhoto ? (
          <img
            src={user.profilePhoto}
            alt={user.name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {/* Name, Title, Company */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
        {user.title && (
          <p className="text-blue-600 font-medium">{user.title}</p>
        )}
        {user.company && (
          <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
            <BriefcaseIcon className="w-4 h-4 mr-1" />
            {user.company}
          </div>
        )}
      </div>
      {/* Location & Availability */}
      <div className="flex flex-col items-center space-y-1 text-gray-500 text-sm">
        {user.location && (
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-1" />
            {user.location}
          </div>
        )}
        {user.availability && (
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
            {user.availability}
          </div>
        )}
      </div>
      {/* Skills Offered */}
      <div className="w-full">
        <h4 className="text-gray-700 font-semibold mb-1">Skills Offered</h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsOffered && user.skillsOffered.length > 0 ? (
            user.skillsOffered.map((skill, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No skills listed</span>
          )}
        </div>
      </div>
      {/* Skills Wanted */}
      <div className="w-full">
        <h4 className="text-gray-700 font-semibold mb-1">Skills Wanted</h4>
        <div className="flex flex-wrap gap-2">
          {user.skillsWanted && user.skillsWanted.length > 0 ? (
            user.skillsWanted.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No skills listed</span>
          )}
        </div>
      </div>
      {/* Rating */}
      {user.rating && (
        <div className="flex items-center space-x-1 mt-2">
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <span className="text-gray-700 font-medium">{user.rating.toFixed(1)}</span>
          <span className="text-gray-400 text-xs">({user.numRatings || 0} ratings)</span>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-3 w-full">
        <button
          onClick={() => navigate(`/user/${user._id || user.id}`)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          View Profile
        </button>
        {!isOwnProfile && (
          <button
            onClick={handleRequestClick}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-1" />
            Request
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard; 