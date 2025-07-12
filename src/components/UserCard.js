import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserCard = ({ user }) => {
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleRequest = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      // Auto-hide modal after 3 seconds
      setTimeout(() => setShowLoginModal(false), 3000);
    } else {
      console.log(`Request sent to ${user.name}`);
      // Show success message
      alert(`Request sent successfully to ${user.name}!`);
      // Here you would typically make an API call
    }
  };

  return (
    <div className="relative">
      <div className="bg-dark-800 border border-dark-600 rounded-lg p-6 hover:border-dark-500 transition-colors">
        {/* Profile Section */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{user.name}</h3>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(user.rating) ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400 text-sm ml-1">{user.rating}/5</span>
            </div>
          </div>
        </div>

        {/* Skills Offered */}
        <div className="mb-4">
          <h4 className="text-gray-300 text-sm font-medium mb-2">Skills Offered</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill, index) => (
              <span
                key={index}
                className="bg-green-600 text-white text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-4">
          <h4 className="text-gray-300 text-sm font-medium mb-2">Skills Wanted</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Request Button */}
        <button
          onClick={handleRequest}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Request
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="bg-dark-700 border border-dark-600 rounded-lg p-4 max-w-sm mx-4">
            <div className="text-center">
              <h3 className="text-white font-semibold mb-2">Login Required</h3>
              <p className="text-gray-300 text-sm mb-4">
                Please login or sign up to send a request to {user.name}.
              </p>
              <button
                onClick={() => setShowLoginModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard; 