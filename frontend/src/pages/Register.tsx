import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { BsEnvelope } from '@react-icons/all-files/bs/BsEnvelope';
import { BsLock } from '@react-icons/all-files/bs/BsLock';
import { BsPersonPlus } from '@react-icons/all-files/bs/BsPersonPlus';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';

interface ValidationError {
  type?: string;
  loc?: string[];
  msg?: string;
  input?: string;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const { register, signInWithGoogle, isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // Handle different error formats
      if (err.response?.data?.detail) {
        // Simple string error
        if (typeof err.response.data.detail === 'string') {
          setError(err.response.data.detail);
        } 
        // Validation error object
        else if (typeof err.response.data.detail === 'object') {
          // Check if it's an array of validation errors
          if (Array.isArray(err.response.data.detail)) {
            const errorMessages = err.response.data.detail
              .map((error: ValidationError) => error.msg)
              .filter(Boolean)
              .join('. ');
            setError(errorMessages || 'Validation error occurred');
          } else {
            // Single validation error object
            setError(err.response.data.detail.msg || 'Validation error occurred');
          }
        }
      } else {
        setError('Failed to register. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      // No need to navigate, the OAuth redirect will handle it
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-neo-black' : 'bg-neo-white'} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200`}>
      <div className={`max-w-md w-full ${darkMode ? 'bg-neo-black' : 'bg-neo-white'} shadow-neo-lg border-2 border-neo-black dark:border-neo-white p-8 transition-colors duration-200`}>
        <div className="text-center">
          <h1 className="text-5xl font-black gradient-text mb-2">RESEARCHER</h1>
          <h2 className={`mt-4 text-3xl font-black ${darkMode ? 'text-neo-white' : 'text-neo-black'} transition-colors duration-200`}>
            CREATE ACCOUNT
          </h2>
          <p className={`mt-2 text-sm font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} transition-colors duration-200`}>
            JOIN US AND START YOUR RESEARCH JOURNEY
          </p>
        </div>
        
        {/* Google Sign In Button */}
        <div className="mt-8">
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className={`w-full flex items-center justify-center px-4 py-3 border-2 border-neo-black dark:border-neo-white shadow-neo 
              ${darkMode ? 'bg-neo-black hover:bg-neo-purple/20' : 'bg-neo-white hover:bg-neo-yellow/20'} 
              transition-all duration-200 font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-0 active:translate-y-0`}
          >
            {isGoogleLoading ? (
              <svg className="animate-spin h-5 w-5 text-neo-black dark:text-neo-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <FcGoogle className="w-5 h-5" />
                <span className={`ml-2 font-bold ${darkMode ? 'text-neo-white' : 'text-neo-black'}`}>
                  CONTINUE WITH GOOGLE
                </span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-neo-black dark:border-neo-white"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 font-bold ${darkMode ? 'bg-neo-black text-neo-white' : 'bg-neo-white text-neo-black'}`}>
                OR CONTINUE WITH EMAIL
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className={`${darkMode ? 'bg-neo-red/20 border-neo-red' : 'bg-neo-red/20 border-neo-red'} border-2 p-4 shadow-neo flex items-start`}>
              <div className="text-neo-red mt-0.5 mr-3 flex-shrink-0 text-xl">⚠️</div>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-red' : 'text-neo-red'}`}>{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="username" className={`block text-sm font-black ${darkMode ? 'text-neo-white' : 'text-neo-black'} mb-2`}>
              USERNAME
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className={`h-5 w-5 ${darkMode ? 'text-neo-white/50' : 'text-neo-black/50'}`} />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`neo-input pl-10 text-lg font-bold`}
                placeholder="ENTER YOUR USERNAME"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={`block text-sm font-black ${darkMode ? 'text-neo-white' : 'text-neo-black'} mb-2`}>
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsEnvelope className={`h-5 w-5 ${darkMode ? 'text-neo-white/50' : 'text-neo-black/50'}`} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`neo-input pl-10 text-lg font-bold`}
                placeholder="ENTER YOUR EMAIL"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-black ${darkMode ? 'text-neo-white' : 'text-neo-black'} mb-2`}>
              PASSWORD
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsLock className={`h-5 w-5 ${darkMode ? 'text-neo-white/50' : 'text-neo-black/50'}`} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`neo-input pl-10 text-lg font-bold`}
                placeholder="ENTER YOUR PASSWORD"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-black ${darkMode ? 'text-neo-white' : 'text-neo-black'} mb-2`}>
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsLock className={`h-5 w-5 ${darkMode ? 'text-neo-white/50' : 'text-neo-black/50'}`} />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`neo-input pl-10 text-lg font-bold`}
                placeholder="CONFIRM YOUR PASSWORD"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full text-lg font-black"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <BsPersonPlus className="mr-2 text-xl" />
              )}
              {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
            ALREADY HAVE AN ACCOUNT?{' '}
            <Link
              to="/login"
              className={`font-black hover:text-neo-blue transition-colors duration-200 ${darkMode ? 'text-neo-white' : 'text-neo-black'}`}
            >
              SIGN IN HERE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 