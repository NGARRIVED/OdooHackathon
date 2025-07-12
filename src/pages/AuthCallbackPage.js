import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setErrorMessage(error);
          return;
        }

        if (!token || !userParam) {
          setStatus('error');
          setErrorMessage('Authentication failed. Missing token or user data.');
          return;
        }

        // Parse user data
        const user = JSON.parse(decodeURIComponent(userParam));

        // Store token in localStorage
        localStorage.setItem('token', token);

        // Update auth context
        login(user);

        setStatus('success');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);

      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setErrorMessage('Failed to process authentication. Please try again.');
      }
    };

    handleAuthCallback();
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="mb-6">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Completing Sign In
              </h2>
              <p className="text-gray-600">
                Please wait while we complete your authentication...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mb-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sign In Successful!
              </h2>
              <p className="text-gray-600 mb-4">
                Welcome back! Redirecting you to your dashboard...
              </p>
              <div className="flex justify-center">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mb-6">
                <AlertCircle className="w-12 h-12 text-red-600 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Authentication Failed
              </h2>
              <p className="text-gray-600 mb-6">
                {errorMessage}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Go to Home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCallbackPage; 