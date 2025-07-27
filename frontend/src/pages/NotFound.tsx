import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FiHome } from '@react-icons/all-files/fi/FiHome';

const NotFound: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-neo-black' : 'bg-neo-white'} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200`}>
      <div className="text-center">
        <div className={`w-32 h-32 border-2 border-neo-black dark:border-neo-white shadow-neo-lg ${darkMode ? 'bg-neo-red' : 'bg-neo-red'} flex items-center justify-center mx-auto mb-8`}>
          <span className="text-6xl font-black text-neo-white">404</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          PAGE NOT FOUND
        </h1>
        <p className={`text-xl font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} mb-8 max-w-md mx-auto`}>
          THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST OR HAS BEEN MOVED.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center text-lg">
          <FiHome className="mr-2 text-xl" />
          GO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 