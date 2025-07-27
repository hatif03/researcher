import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiClock } from '@react-icons/all-files/fi/FiClock';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          WELCOME TO <span className="gradient-text">RESEARCHER</span>, {user?.username?.toUpperCase()}!
        </h1>
        <p className={`text-xl font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} max-w-4xl mx-auto`}>
          YOUR AI-POWERED RESEARCH ASSISTANT. GET COMPREHENSIVE REPORTS ON ANY TOPIC WITH JUST A FEW CLICKS.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`neo-card ${darkMode ? 'hover:bg-neo-purple/10' : 'hover:bg-neo-yellow/10'}`}>
            <div className={`w-16 h-16 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-purple' : 'bg-neo-blue'} flex items-center justify-center mb-6`}>
              <FiSearch className={`${darkMode ? 'text-neo-white' : 'text-neo-white'} text-2xl`} />
            </div>
            <h2 className="text-3xl font-black mb-4">START NEW RESEARCH</h2>
            <p className={`${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} mb-6 font-bold`}>
              ENTER ANY TOPIC AND OUR AI WILL GENERATE A COMPREHENSIVE RESEARCH REPORT WITH SOURCES.
            </p>
            <Link to="/research" className="btn btn-primary inline-flex items-center text-lg">
              START RESEARCHING
              <BsArrowRight className="ml-2 text-xl" />
            </Link>
          </div>

          <div className={`neo-card ${darkMode ? 'hover:bg-neo-purple/10' : 'hover:bg-neo-yellow/10'}`}>
            <div className={`w-16 h-16 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-green' : 'bg-neo-orange'} flex items-center justify-center mb-6`}>
              <FiClock className={`${darkMode ? 'text-neo-white' : 'text-neo-white'} text-2xl`} />
            </div>
            <h2 className="text-3xl font-black mb-4">VIEW RESEARCH HISTORY</h2>
            <p className={`${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} mb-6 font-bold`}>
              ACCESS YOUR PAST RESEARCH REPORTS AND CONTINUE WHERE YOU LEFT OFF.
            </p>
            <Link to="/history" className="btn btn-secondary inline-flex items-center text-lg">
              VIEW HISTORY
              <BsArrowRight className="ml-2 text-xl" />
            </Link>
          </div>
        </div>

        <div className={`mt-16 neo-card ${darkMode ? 'bg-neo-black/50' : 'bg-neo-white'} animated-bg`}>
          <h2 className="text-3xl font-black mb-8">HOW IT WORKS</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className={`${darkMode ? 'bg-neo-purple text-neo-white' : 'bg-neo-blue text-neo-white'} w-12 h-12 border-2 border-neo-black dark:border-neo-white shadow-neo flex items-center justify-center font-black text-xl mr-6 flex-shrink-0`}>1</div>
              <div>
                <h3 className="font-black text-xl mb-2">ENTER YOUR TOPIC</h3>
                <p className={`${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} font-bold`}>PROVIDE A RESEARCH TOPIC YOU WANT TO EXPLORE IN DEPTH.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className={`${darkMode ? 'bg-neo-purple text-neo-white' : 'bg-neo-blue text-neo-white'} w-12 h-12 border-2 border-neo-black dark:border-neo-white shadow-neo flex items-center justify-center font-black text-xl mr-6 flex-shrink-0`}>2</div>
              <div>
                <h3 className="font-black text-xl mb-2">AI RESEARCH</h3>
                <p className={`${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} font-bold`}>OUR ADVANCED AI CONDUCTS COMPREHENSIVE RESEARCH USING GOOGLE GEMINI.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className={`${darkMode ? 'bg-neo-purple text-neo-white' : 'bg-neo-blue text-neo-white'} w-12 h-12 border-2 border-neo-black dark:border-neo-white shadow-neo flex items-center justify-center font-black text-xl mr-6 flex-shrink-0`}>3</div>
              <div>
                <h3 className="font-black text-xl mb-2">REVIEW REPORT</h3>
                <p className={`${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} font-bold`}>RECEIVE A STRUCTURED REPORT WITH CITATIONS AND SOURCES.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className={`${darkMode ? 'bg-neo-purple text-neo-white' : 'bg-neo-blue text-neo-white'} w-12 h-12 border-2 border-neo-black dark:border-neo-white shadow-neo flex items-center justify-center font-black text-xl mr-6 flex-shrink-0`}>4</div>
              <div>
                <h3 className="font-black text-xl mb-2">DOWNLOAD & SHARE</h3>
                <p className={`${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} font-bold`}>DOWNLOAD YOUR REPORT AS A PDF FOR EASY SHARING AND REFERENCE.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;