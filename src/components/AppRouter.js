import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginPage from './LoginPage';
import App from '../App';
import UserProfilePage from './UserProfilePage';

const AppRouter = () => {
  const { isLoggedIn } = useAuth();
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'login', 'profile'

  // If user is not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // If user is logged in, show appropriate page
  switch (currentPage) {
    case 'profile':
      return <UserProfilePage onNavigate={(page) => setCurrentPage(page)} />;
    case 'main':
    default:
      return <App onNavigate={(page) => setCurrentPage(page)} />;
  }
};

export default AppRouter; 