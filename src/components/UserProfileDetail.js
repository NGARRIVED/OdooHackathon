import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  StarIcon, 
  MapPinIcon, 
  BriefcaseIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const UserProfileDetail = ({ user }) => {
  const { user: currentUser } = useAuth();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestData, setRequestData] = useState({
    offeredSkill: '',
    wantedSkill: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // Fallback for avatar
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  const handleRequestClick = () => {
    if (!currentUser) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    setShowRequestModal(true);
  };

  const handleSubmitRequest = async () => {
    if (!requestData.offeredSkill || !requestData.wantedSkill) {
      alert('Please fill in both offered and wanted skills');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/swaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          toUser: user._id || user.id,
          offeredSkill: requestData.offeredSkill,
          wantedSkill: requestData.wantedSkill,
          message: requestData.message
        })
      });

      if (response.ok) {
        setRequestSent(true);
        setShowRequestModal(false);
        setRequestData({ offeredSkill: '', wantedSkill: '', message: '' });
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to send request');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOwnProfile = currentUser && (currentUser._id === user._id || currentUser.id === user.id);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-md overflow-hidden">
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

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
          {user.title && (
            <p className="text-blue-600 font-medium text-lg mb-1">{user.title}</p>
          )}
          {user.company && (
            <div className="flex items-center text-gray-600 mb-2">
              <BriefcaseIcon className="w-4 h-4 mr-2" />
              {user.company}
            </div>
          )}
          {user.location && (
            <div className="flex items-center text-gray-600 mb-3">
              <MapPinIcon className="w-4 h-4 mr-2" />
              {user.location}
            </div>
          )}
          {user.availability && (
            <div className="inline-flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              <ClockIcon className="w-4 h-4 mr-1" />
              {user.availability}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          {!isOwnProfile && (
            <button
              onClick={handleRequestClick}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span>Send Request</span>
            </button>
          )}
          {requestSent && (
            <div className="flex items-center space-x-2 text-green-600 text-sm">
              <CheckIcon className="w-4 h-4" />
              <span>Request sent!</span>
            </div>
          )}
        </div>
      </div>

      {/* Rating Section */}
      {user.rating && (
        <div className="flex items-center space-x-2 mb-6 p-4 bg-gray-50 rounded-lg">
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold text-gray-900">{user.rating.toFixed(1)}</span>
          <span className="text-gray-600">({user.numRatings || 0} ratings)</span>
        </div>
      )}

      {/* Skills Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills Offered */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Skills Offered</h3>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered && user.skillsOffered.length > 0 ? (
              user.skillsOffered.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills listed</p>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Skills Wanted</h3>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted && user.skillsWanted.length > 0 ? (
              user.skillsWanted.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills listed</p>
            )}
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Send Swap Request</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill You'll Offer
                </label>
                <input
                  type="text"
                  value={requestData.offeredSkill}
                  onChange={(e) => setRequestData({ ...requestData, offeredSkill: e.target.value })}
                  placeholder="e.g., React Development"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill You Want to Learn
                </label>
                <input
                  type="text"
                  value={requestData.wantedSkill}
                  onChange={(e) => setRequestData({ ...requestData, wantedSkill: e.target.value })}
                  placeholder="e.g., UI/UX Design"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={requestData.message}
                  onChange={(e) => setRequestData({ ...requestData, message: e.target.value })}
                  placeholder="Tell them why you'd like to exchange skills..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRequest}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDetail; 