import React from 'react';

const WelcomeMessage = () => {
  return (
    <div className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Welcome! You are now logged in.</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage; 