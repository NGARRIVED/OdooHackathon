import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import UserListings from './components/UserListings';
import Pagination from './components/Pagination';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-dark-900">
        <Header />
        <main>
          <UserListings />
          <Pagination />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App; 