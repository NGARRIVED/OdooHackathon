import React, { useState } from 'react';
import { Eye, EyeOff, Users, Shield, Sparkles, Building2, Globe, Award } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
        // Simulate successful login
        console.log('Admin login successful');
      } else if (formData.email === 'user@example.com' && formData.password === 'user123') {
        // Simulate successful login
        console.log('User login successful');
      } else {
        setError('Invalid email or password. Try admin@example.com/admin123 or user@example.com/user123');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      {/* Professional background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 opacity-60" />
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative w-full max-w-md">
        {/* Professional Login Card */}
        <div 
          className={`relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-500 transform ${
            isHovered ? 'scale-102' : 'scale-100'
          }`}
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e5e7eb',
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)' 
              : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(229, 231, 235, 0.6)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Professional gradient overlay */}
          <div 
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(37, 99, 235, 0.02) 100%)'
            }}
          />
          
          {/* Professional border accent */}
          <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} style={{ backgroundColor: '#3b82f6' }} />
          
          <div className="relative p-8">
            {/* Professional Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="relative p-4 rounded-2xl bg-white shadow-lg border border-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl opacity-5" />
                  <Shield className="w-12 h-12 text-blue-600 relative z-10" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-3 text-gray-900">
                Welcome Back
              </h1>
              <p className="text-gray-600 mb-6">
                Sign in to your professional account
              </p>
              
              {/* Professional trust indicators */}
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-blue-600" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-green-600" />
                  <span>Trusted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-3 h-3 text-purple-600" />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="relative p-4 rounded-xl border border-red-200 bg-red-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gray-900 text-white hover:bg-gray-800 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Demo Accounts</span>
                </div>
              </div>

              {/* Demo Account Info */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Administrator</p>
                      <p className="text-xs text-gray-600">admin@example.com</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                      admin123
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Demo User</p>
                      <p className="text-xs text-gray-600">user@example.com</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      user123
                    </div>
                  </div>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    Create one now
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Professional Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span>Global Network</span>
            </div>
            <div className="flex items-center space-x-1">
              <Building2 className="w-3 h-3" />
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;