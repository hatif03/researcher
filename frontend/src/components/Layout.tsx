import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiHome } from '@react-icons/all-files/fi/FiHome';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiClock } from '@react-icons/all-files/fi/FiClock';
import { FiLogOut } from '@react-icons/all-files/fi/FiLogOut';
import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { FiMenu } from '@react-icons/all-files/fi/FiMenu';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { BsSun } from '@react-icons/all-files/bs/BsSun';
import { BsMoon } from '@react-icons/all-files/bs/BsMoon';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { path: '/', icon: <FiHome size={20} />, label: 'Home' },
    { path: '/research', icon: <FiSearch size={20} />, label: 'Research' },
    { path: '/history', icon: <FiClock size={20} />, label: 'History' },
  ];

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-neo-black' : 'bg-neo-white'} transition-colors duration-200`}>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex flex-col w-72 ${darkMode ? 'bg-neo-black border-neo-white' : 'bg-neo-white border-neo-black'} border-r-2 transition-colors duration-200`}>
        <div className="p-6 border-b-2 border-neo-black dark:border-neo-white">
          <h1 className="text-3xl font-black gradient-text">RESEARCHER</h1>
          <p className={`${darkMode ? 'text-neo-white/70' : 'text-neo-black/70'} text-sm mt-1 font-bold transition-colors duration-200`}>RESEARCH PLATFORM</p>
        </div>
        
        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-item ${
                    location.pathname === item.path
                      ? 'nav-item-active'
                      : darkMode
                        ? 'text-neo-white hover:bg-neo-purple/20'
                        : 'text-neo-black hover:bg-neo-yellow/20'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 font-bold">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={`p-4 border-t-2 ${darkMode ? 'border-neo-white' : 'border-neo-black'} transition-colors duration-200`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`${darkMode ? 'bg-neo-purple text-neo-white' : 'bg-neo-yellow text-neo-black'} p-2 border-2 border-neo-black dark:border-neo-white shadow-neo transition-colors duration-200`}>
                <FiUser size={18} />
              </div>
              <div className="ml-3">
                <p className="font-bold text-sm">{user?.username}</p>
                <p className={`text-xs ${darkMode ? 'text-neo-white/70' : 'text-neo-black/70'} transition-colors duration-200`}>{user?.email}</p>
              </div>
            </div>
            
            {/* Dark mode toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-yellow text-neo-black' : 'bg-neo-purple text-neo-white'} transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-0 active:translate-y-0`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
            </button>
          </div>
          
          <button
            onClick={handleLogout}
            className={`flex items-center w-full py-2 px-3 text-sm font-bold border-2 border-neo-black dark:border-neo-white shadow-neo transition-all duration-200 ${
              darkMode 
                ? 'text-neo-white bg-neo-red hover:bg-neo-red/90' 
                : 'text-neo-black bg-neo-red hover:bg-neo-red/90'
            } hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-0 active:translate-y-0`}
          >
            <FiLogOut size={18} />
            <span className="ml-3">LOGOUT</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 ${darkMode ? 'bg-neo-black border-neo-white' : 'bg-neo-white border-neo-black'} border-b-2 z-10 transition-colors duration-200`}>
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-black gradient-text">RESEARCHER</h1>
          <div className="flex items-center">
            {/* Dark mode toggle for mobile */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 mr-2 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-yellow text-neo-black' : 'bg-neo-purple text-neo-white'} transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-0 active:translate-y-0`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
            </button>
            
            <button
              onClick={toggleMobileMenu}
              className={`p-2 border-2 border-neo-black dark:border-neo-white shadow-neo ${
                darkMode 
                  ? 'text-neo-white bg-neo-black hover:bg-neo-purple/20' 
                  : 'text-neo-black bg-neo-white hover:bg-neo-yellow/20'
              } transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-0 active:translate-y-0`}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`${darkMode ? 'bg-neo-black border-neo-white' : 'bg-neo-white border-neo-black'} border-b-2 transition-colors duration-200 py-2`}>
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-item ${
                      location.pathname === item.path
                        ? 'nav-item-active'
                        : darkMode
                          ? 'text-neo-white hover:bg-neo-purple/20'
                          : 'text-neo-black hover:bg-neo-yellow/20'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3 font-bold">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`nav-item w-full ${
                    darkMode 
                      ? 'text-neo-white bg-neo-red hover:bg-neo-red/90' 
                      : 'text-neo-black bg-neo-red hover:bg-neo-red/90'
                  }`}
                >
                  <FiLogOut size={20} />
                  <span className="ml-3 font-bold">LOGOUT</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content area */}
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 mt-16 md:mt-0 transition-colors duration-200`}>
          {children}
        </main>
        
        {/* Footer */}
        <footer className={`py-4 px-6 text-center ${darkMode ? 'text-neo-white/70' : 'text-neo-black/70'} text-sm font-bold border-t-2 ${darkMode ? 'border-neo-white' : 'border-neo-black'}`}>
          BUILT BY{' '}
          <a
            href="https://github.com/hatif03"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-black hover:text-neo-blue transition-colors duration-200 ${darkMode ? 'text-neo-white' : 'text-neo-black'}`}
          >
            HATIF03
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Layout; 