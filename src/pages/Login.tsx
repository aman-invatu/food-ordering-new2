
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface LocationState {
  from?: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, authState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const locationState = location.state as LocationState | null;
  const from = locationState?.from || '/';
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If already logged in, redirect
    if (authState.isAuthenticated) {
      navigate(from);
    }
  }, [authState.isAuthenticated, navigate, from]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear form
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(email, password);
        navigate(from);
      } else {
        await register(name, email, password);
        navigate(from);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-foodRed text-white p-6 text-center">
            <h1 className="text-2xl font-bold mb-1">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h1>
            <p className="text-white/80">
              {isLogin
                ? 'Sign in to continue to FoodEats'
                : 'Join FoodEats to start ordering delicious food'
              }
            </p>
          </div>
          
          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field (only for register) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      placeholder="John Doe"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              
              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
              
              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Remember me & Forgot password */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-foodRed focus:ring-foodRed border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-foodRed hover:text-foodOrange">
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}
              
              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-foodRed hover:bg-foodOrange text-white"
                disabled={authState.isLoading}
              >
                {authState.isLoading
                  ? 'Processing...'
                  : isLogin
                    ? 'Sign In'
                    : 'Create Account'
                }
              </Button>
            </form>
            
            {/* Social login options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.59 22.56 12.25Z" fill="#4285F4" />
                    <path d="M12 23C14.97 23 17.46 22.06 19.28 20.34L15.71 17.57C14.73 18.22 13.48 18.58 12 18.58C9.19 18.58 6.8 16.64 5.96 14H2.29V16.83C4.1 20.64 7.76 23 12 23Z" fill="#34A853" />
                    <path d="M5.96 14C5.75 13.34 5.63 12.63 5.63 11.9C5.63 11.17 5.75 10.46 5.96 9.8V6.97H2.29C1.55 8.44 1.14 10.08 1.14 11.9C1.14 13.72 1.55 15.36 2.29 16.83L5.96 14Z" fill="#FBBC05" />
                    <path d="M12 5.22C13.62 5.22 15.06 5.8 16.21 6.91L19.36 3.76C17.45 1.98 14.97 0.9 12 0.9C7.76 0.9 4.1 3.26 2.29 7.07L5.96 9.91C6.8 7.26 9.19 5.22 12 5.22Z" fill="#EA4335" />
                  </svg>
                </button>
                
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Toggle between login and register */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  className="text-foodRed hover:text-foodOrange font-medium"
                  onClick={toggleForm}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Demo account info */}
            <div className="mt-6 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
              <p className="font-medium">Demo Account:</p>
              <p>Email: demo@example.com</p>
              <p>Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
