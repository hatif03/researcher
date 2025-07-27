import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        
        if (error) {
          setStatus('error');
          setError('Authentication failed. Please try again.');
          return;
        }
        
        if (!code) {
          setStatus('error');
          setError('No authorization code received.');
          return;
        }
        
        // Check if authentication was successful
        if (isAuthenticated) {
          setStatus('success');
          
          // Redirect to home after a short delay
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setStatus('error');
          setError('Authentication failed. Please try again.');
        }
        
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setError(err.message || 'Authentication failed. Please try again.');
      }
    };
    
    processCallback();
  }, [searchParams, isAuthenticated, navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-neo-black' : 'bg-neo-white'} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200`}>
      <div className={`max-w-md w-full ${darkMode ? 'bg-neo-black' : 'bg-neo-white'} shadow-neo-lg border-2 border-neo-black dark:border-neo-white p-8 transition-colors duration-200 text-center`}>
        {status === 'loading' && (
          <>
            <div className={`w-24 h-24 border-2 border-neo-black dark:border-neo-white shadow-neo-lg ${darkMode ? 'bg-neo-blue' : 'bg-neo-blue'} flex items-center justify-center mx-auto mb-8`}>
              <FiLoader className="animate-spin text-neo-white text-4xl" />
            </div>
            <h2 className="text-3xl font-black mb-4">AUTHENTICATING</h2>
            <p className={`text-lg font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
              COMPLETING YOUR SIGN-IN PROCESS...
            </p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className={`w-24 h-24 border-2 border-neo-black dark:border-neo-white shadow-neo-lg ${darkMode ? 'bg-neo-green' : 'bg-neo-green'} flex items-center justify-center mx-auto mb-8`}>
              <span className="text-neo-white text-6xl font-black">✓</span>
            </div>
            <h2 className="text-3xl font-black mb-4">SUCCESS!</h2>
            <p className={`text-lg font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} mb-6`}>
              YOU HAVE BEEN SUCCESSFULLY SIGNED IN.
            </p>
            <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/60' : 'text-neo-black/60'}`}>
              REDIRECTING TO DASHBOARD...
            </p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className={`w-24 h-24 border-2 border-neo-black dark:border-neo-white shadow-neo-lg ${darkMode ? 'bg-neo-red' : 'bg-neo-red'} flex items-center justify-center mx-auto mb-8`}>
              <FiAlertCircle className="text-neo-white text-4xl" />
            </div>
            <h2 className="text-3xl font-black mb-4">AUTHENTICATION FAILED</h2>
            <p className={`text-lg font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} mb-6`}>
              {error}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="btn btn-primary inline-flex items-center text-lg"
            >
              GO BACK TO LOGIN
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback; 