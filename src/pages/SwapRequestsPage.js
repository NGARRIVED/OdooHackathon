import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckIcon, XMarkIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

const SwapRequestsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('sent');

  // Mock swap requests data
  const [swapRequests] = useState({
    sent: [
      {
        id: 1,
        toUser: { name: 'Sarah Johnson', id: 2 },
        fromUser: { name: user?.name || 'You', id: user?.id },
        status: 'pending',
        message: 'I can help you with React development in exchange for UI/UX design tips.',
        createdAt: '2024-01-15T10:30:00Z',
        skillsOffered: ['React', 'JavaScript'],
        skillsWanted: ['UI/UX Design']
      },
      {
        id: 2,
        toUser: { name: 'Alex Chen', id: 3 },
        fromUser: { name: user?.name || 'You', id: user?.id },
        status: 'accepted',
        message: 'Would love to learn data analysis from you while teaching you video editing.',
        createdAt: '2024-01-10T14:20:00Z',
        skillsOffered: ['Video Editing'],
        skillsWanted: ['Data Analysis']
      }
    ],
    received: [
      {
        id: 3,
        fromUser: { name: 'Emma Wilson', id: 4 },
        toUser: { name: user?.name || 'You', id: user?.id },
        status: 'pending',
        message: 'I can teach you content writing and SEO in exchange for web development help.',
        createdAt: '2024-01-16T09:15:00Z',
        skillsOffered: ['Content Writing', 'SEO'],
        skillsWanted: ['Web Development']
      },
      {
        id: 4,
        fromUser: { name: 'David Brown', id: 5 },
        toUser: { name: user?.name || 'You', id: user?.id },
        status: 'rejected',
        message: 'Looking for someone to teach me programming basics.',
        createdAt: '2024-01-12T16:45:00Z',
        skillsOffered: ['Motion Graphics'],
        skillsWanted: ['Programming']
      }
    ]
  });

  const handleAccept = (requestId) => {
    console.log('Accepting request:', requestId);
    // In a real app, this would make an API call
  };

  const handleReject = (requestId) => {
    console.log('Rejecting request:', requestId);
    // In a real app, this would make an API call
  };

  const handleCancel = (requestId) => {
    console.log('Canceling request:', requestId);
    // In a real app, this would make an API call
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-900/20';
      case 'accepted':
        return 'text-green-400 bg-green-900/20';
      case 'rejected':
        return 'text-red-400 bg-red-900/20';
      case 'completed':
        return 'text-blue-400 bg-blue-900/20';
      default:
        return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'accepted':
        return <CheckIcon className="w-4 h-4" />;
      case 'rejected':
        return <XMarkIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please log in to view your swap requests</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Swap Requests</h1>
        <p className="text-gray-400">Manage your skill exchange requests</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-dark-800 rounded-lg p-1 mb-8">
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'sent'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-dark-700'
          }`}
        >
          Sent ({swapRequests.sent.length})
        </button>
        <button
          onClick={() => setActiveTab('received')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'received'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-dark-700'
          }`}
        >
          Received ({swapRequests.received.length})
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {swapRequests[activeTab].length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-white mb-2">No {activeTab} requests</h3>
            <p className="text-gray-400">
              {activeTab === 'sent' 
                ? "You haven't sent any swap requests yet."
                : "You haven't received any swap requests yet."
              }
            </p>
          </div>
        ) : (
          swapRequests[activeTab].map((request) => (
            <div key={request.id} className="bg-dark-800 border border-dark-600 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {activeTab === 'sent' ? request.toUser.name : request.fromUser.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {formatDate(request.createdAt)}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span className="capitalize">{request.status}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-300">{request.message}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Skills Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {request.skillsOffered.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-green-600 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Skills Wanted</h4>
                  <div className="flex flex-wrap gap-2">
                    {request.skillsWanted.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {activeTab === 'received' && request.status === 'pending' && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <CheckIcon className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}

              {activeTab === 'sent' && request.status === 'pending' && (
                <button
                  onClick={() => handleCancel(request.id)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SwapRequestsPage; 