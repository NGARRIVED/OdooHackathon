import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './components/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
); 