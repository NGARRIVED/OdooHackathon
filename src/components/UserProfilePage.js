import React, { useState } from 'react';

const UserProfilePage = ({ onNavigate }) => {
  // User details state
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    location: 'New York, NY',
    availability: 'weekends',
    profile: 'Public'
  });

  // Skills state
  const [skillsOffered, setSkillsOffered] = useState([
    'Graphic Design',
    'Video Editing',
    'Photoshop'
  ]);
  const [skillsWanted, setSkillsWanted] = useState([
    'Python',
    'JavaScript',
    'Manager'
  ]);

  // Input states for new skills
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');

  // Profile photo state
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUserDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new skill to offered skills
  const addSkillOffered = () => {
    if (newSkillOffered.trim() && !skillsOffered.includes(newSkillOffered.trim())) {
      setSkillsOffered(prev => [...prev, newSkillOffered.trim()]);
      setNewSkillOffered('');
    }
  };

  // Add new skill to wanted skills
  const addSkillWanted = () => {
    if (newSkillWanted.trim() && !skillsWanted.includes(newSkillWanted.trim())) {
      setSkillsWanted(prev => [...prev, newSkillWanted.trim()]);
      setNewSkillWanted('');
    }
  };

  // Remove skill from offered skills
  const removeSkillOffered = (skillToRemove) => {
    setSkillsOffered(prev => prev.filter(skill => skill !== skillToRemove));
  };

  // Remove skill from wanted skills
  const removeSkillWanted = (skillToRemove) => {
    setSkillsWanted(prev => prev.filter(skill => skill !== skillToRemove));
  };

  // Handle key press for adding skills
  const handleKeyPress = (e, addFunction) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFunction();
    }
  };

  // Handle profile photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle photo removal
  const handlePhotoRemove = () => {
    setProfilePhoto(null);
  };

  // Action handlers
  const handleSave = () => {
    console.log('Save clicked', { userDetails, skillsOffered, skillsWanted });
    alert('Profile saved successfully!');
  };

  const handleDiscard = () => {
    console.log('Discard clicked');
    if (confirm('Are you sure you want to discard changes?')) {
      // Reset to original values
      setUserDetails({
        name: 'John Doe',
        location: 'New York, NY',
        availability: 'weekends',
        profile: 'Public'
      });
      setSkillsOffered(['Graphic Design', 'Video Editing', 'Photoshop']);
      setSkillsWanted(['Python', 'JavaScript', 'Manager']);
      setProfilePhoto(null);
    }
  };

  const handleSwapRequest = () => {
    console.log('Swap request clicked');
    alert('Swap request functionality would be implemented here');
  };

  const handleHome = () => {
    console.log('Home clicked');
    // Navigate back to main page
    if (onNavigate) {
      onNavigate('main');
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="bg-dark-800 rounded-lg shadow-xl p-8 w-full max-w-6xl">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-dark-600">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-400 font-medium transition-colors cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={handleDiscard}
              className="text-red-500 hover:text-red-400 font-medium transition-colors cursor-pointer"
            >
              Discard
            </button>
            <button
              onClick={handleSwapRequest}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer hover:underline"
            >
              Swap request
            </button>
            <button
              onClick={handleHome}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer hover:underline"
            >
              Home
            </button>
          </div>
          <div className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Name */}
            <div className="flex items-center space-x-4">
              <label className="text-white font-medium w-24">Name:</label>
              <input
                type="text"
                value={userDetails.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="flex-1 bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-blue-500 pb-1"
              />
            </div>

            {/* Location */}
            <div className="flex items-center space-x-4">
              <label className="text-white font-medium w-24">Location:</label>
              <input
                type="text"
                value={userDetails.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="flex-1 bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-blue-500 pb-1"
              />
            </div>

            {/* Skills Offered */}
            <div className="space-y-3">
              <label className="text-white font-medium block">Skills Offered:</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {skillsOffered.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm text-white"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkillOffered(skill)}
                      className="ml-2 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkillOffered}
                  onChange={(e) => setNewSkillOffered(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addSkillOffered)}
                  placeholder="Add new skill..."
                  className="flex-1 bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-blue-500 pb-1"
                />
                <button
                  onClick={addSkillOffered}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center space-x-4">
              <label className="text-white font-medium w-24">Availability:</label>
              <input
                type="text"
                value={userDetails.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="flex-1 bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-blue-500 pb-1"
              />
            </div>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <label className="text-white font-medium w-24">Profile:</label>
              <input
                type="text"
                value={userDetails.profile}
                onChange={(e) => handleInputChange('profile', e.target.value)}
                className="flex-1 bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-blue-500 pb-1"
              />
            </div>
          </div>

          {/* Right Column - Profile Photo and Skills Wanted */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <div className="space-y-3">
              <label className="text-white font-medium block">Profile Photo:</label>
              <div className="flex flex-col items-center space-y-3">
                <div className="w-32 h-32 rounded-full border-2 border-gray-600 flex items-center justify-center bg-dark-700">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div className="flex space-x-3">
                  <label className="text-blue-400 hover:text-blue-300 cursor-pointer hover:underline">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    Add/Edit
                  </label>
                  <button
                    onClick={handlePhotoRemove}
                    className="text-red-400 hover:text-red-300 cursor-pointer hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="space-y-3">
              <label className="text-white font-medium block">Skills Wanted:</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {skillsWanted.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm text-white"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkillWanted(skill)}
                      className="ml-2 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkillWanted}
                  onChange={(e) => setNewSkillWanted(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addSkillWanted)}
                  placeholder="Add new skill..."
                  className="flex-1 bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-blue-500 pb-1"
                />
                <button
                  onClick={addSkillWanted}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage; 