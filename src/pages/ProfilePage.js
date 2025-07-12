import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import UserProfileCard from '../components/UserProfileCard';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    skillsOffered: user?.skillsOffered?.join(', ') || '',
    skillsWanted: user?.skillsWanted?.join(', ') || '',
    availability: user?.availability || 'weekends'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUser({
      ...user,
      ...editData,
      skillsOffered: editData.skillsOffered.split(',').map(s => s.trim()).filter(s => s),
      skillsWanted: editData.skillsWanted.split(',').map(s => s.trim()).filter(s => s)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      location: user?.location || '',
      skillsOffered: user?.skillsOffered?.join(', ') || '',
      skillsWanted: user?.skillsWanted?.join(', ') || '',
      availability: user?.availability || 'weekends'
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please log in to view your profile</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-dark-800 border border-dark-600 rounded-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-gray-400 mt-1">Manage your account and skills</p>
          </div>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <CheckIcon className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Info */}
        {!isEditing ? (
          <UserProfileCard user={user} />
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-dark-600 text-white bg-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-dark-600 text-white bg-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Availability
              </label>
              <select
                name="availability"
                value={editData.availability}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-dark-600 text-white bg-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekends">Weekends</option>
                <option value="evenings">Evenings</option>
                <option value="weekdays">Weekdays</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills You Can Offer
              </label>
              <textarea
                name="skillsOffered"
                value={editData.skillsOffered}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-dark-600 text-white bg-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter skills separated by commas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills You Want to Learn
              </label>
              <textarea
                name="skillsWanted"
                value={editData.skillsWanted}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-dark-600 text-white bg-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter skills separated by commas"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 