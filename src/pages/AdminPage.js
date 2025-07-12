import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UsersIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock admin data
  const [adminData] = useState({
    stats: {
      totalUsers: 1247,
      activeUsers: 892,
      pendingSwaps: 45,
      completedSwaps: 234,
      reportedContent: 12,
      bannedUsers: 3
    },
    pendingReports: [
      {
        id: 1,
        type: 'inappropriate_skill',
        user: { name: 'John Doe', id: 123 },
        content: 'Skill description contains inappropriate language',
        reportedAt: '2024-01-16T10:30:00Z',
        status: 'pending'
      },
      {
        id: 2,
        type: 'spam',
        user: { name: 'Jane Smith', id: 456 },
        content: 'Multiple identical skill listings',
        reportedAt: '2024-01-15T14:20:00Z',
        status: 'pending'
      }
    ],
    recentActivity: [
      {
        id: 1,
        action: 'user_banned',
        user: 'SpamUser123',
        admin: 'Admin User',
        timestamp: '2024-01-16T09:15:00Z'
      },
      {
        id: 2,
        action: 'content_approved',
        user: 'NewUser456',
        admin: 'Admin User',
        timestamp: '2024-01-16T08:45:00Z'
      }
    ]
  });

  const handleApproveContent = (reportId) => {
    console.log('Approving content for report:', reportId);
    // In a real app, this would make an API call
  };

  const handleRejectContent = (reportId) => {
    console.log('Rejecting content for report:', reportId);
    // In a real app, this would make an API call
  };

  const handleBanUser = (userId) => {
    console.log('Banning user:', userId);
    // In a real app, this would make an API call
  };

  const handleSendMessage = () => {
    console.log('Sending platform message');
    // In a real app, this would make an API call
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

  if (!user || !user.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
        <p className="text-gray-400">Manage platform content, users, and settings</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-dark-800 rounded-lg p-1 mb-8">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-dark-700'
          }`}
        >
          <ChartBarIcon className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'reports'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-dark-700'
          }`}
        >
          <ExclamationTriangleIcon className="w-4 h-4" />
          <span>Reports ({adminData.pendingReports.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-dark-700'
          }`}
        >
          <UsersIcon className="w-4 h-4" />
          <span>Users</span>
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          className={`flex items-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'moderation'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-dark-700'
          }`}
        >
          <ShieldCheckIcon className="w-4 h-4" />
          <span>Moderation</span>
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{adminData.stats.totalUsers}</p>
                </div>
                <UsersIcon className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-white">{adminData.stats.activeUsers}</p>
                </div>
                <ChartBarIcon className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Swaps</p>
                  <p className="text-2xl font-bold text-white">{adminData.stats.pendingSwaps}</p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed Swaps</p>
                  <p className="text-2xl font-bold text-white">{adminData.stats.completedSwaps}</p>
                </div>
                <CheckIcon className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Reported Content</p>
                  <p className="text-2xl font-bold text-white">{adminData.stats.reportedContent}</p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
              </div>
            </div>
            <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Banned Users</p>
                  <p className="text-2xl font-bold text-white">{adminData.stats.bannedUsers}</p>
                </div>
                <XMarkIcon className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {adminData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-dark-600 last:border-b-0">
                  <div>
                    <p className="text-white">
                      <span className="font-medium">{activity.admin}</span> {activity.action.replace('_', ' ')} 
                      <span className="font-medium"> {activity.user}</span>
                    </p>
                    <p className="text-gray-400 text-sm">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {adminData.pendingReports.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-green-500 text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-white mb-2">No pending reports</h3>
              <p className="text-gray-400">All reported content has been reviewed.</p>
            </div>
          ) : (
            adminData.pendingReports.map((report) => (
              <div key={report.id} className="bg-dark-800 border border-dark-600 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">Report #{report.id}</h3>
                    <p className="text-gray-400 text-sm">{formatDate(report.reportedAt)}</p>
                  </div>
                  <span className="bg-yellow-900/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                    Pending Review
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-300 mb-2">
                    <strong>Type:</strong> {report.type.replace('_', ' ')}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong>User:</strong> {report.user.name}
                  </p>
                  <p className="text-gray-300">
                    <strong>Content:</strong> {report.content}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApproveContent(report.id)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <CheckIcon className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleRejectContent(report.id)}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleBanUser(report.user.id)}
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Ban User</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">User Management</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Export Users
            </button>
          </div>
          <p className="text-gray-400">User management interface would be implemented here.</p>
        </div>
      )}

      {/* Moderation Tab */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Platform Message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-dark-600 text-white bg-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter message title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-dark-600 text-white bg-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter platform-wide message"
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>

          <div className="bg-dark-800 border border-dark-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Content Moderation Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto-flag inappropriate content</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Require skill approval</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Enable user reporting</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage; 