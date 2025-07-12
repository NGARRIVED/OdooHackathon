import React from 'react';
import Header from './components/Header';
import UserListings from './components/UserListings';
import Pagination from './components/Pagination';
import WelcomeMessage from './components/WelcomeMessage';

function App({ onNavigate }) {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header onNavigate={onNavigate} />
      <main>
        <WelcomeMessage />
        <UserListings />
        <Pagination />
      </main>
    </div>
  );
}

export default App; 