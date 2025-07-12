import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileDetail from '../components/UserProfileDetail';

const UserPublicProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        // Replace with your real API endpoint
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError('Could not load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500 text-lg">Loading...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      ) : user ? (
        <UserProfileDetail user={user} />
      ) : null}
    </div>
  );
};

export default UserPublicProfilePage; 