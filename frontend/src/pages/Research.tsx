import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FiSearch, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const Research: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Please enter a research topic');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      const response = await api.post('/research/', {
        topic: topic.trim()
      });
      
      // Redirect to the research status page
      navigate(`/research/${response.data.research_id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to start research. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      {/* Hidden debug info in production */}
      {process.env.NODE_ENV === 'production' && (
        <div className="hidden">
          <div id="api-url-debug">API URL: {process.env.REACT_APP_API_URL}</div>
          <div id="base-url-debug">Base URL: {window.location.origin}</div>
        </div>
      )}
      
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          <span className="gradient-text">DEEP RESEARCH</span>
        </h1>
        <p className={`${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'} max-w-3xl mx-auto text-xl font-bold`}>
          ENTER YOUR RESEARCH TOPIC AND OUR AI WILL GENERATE A COMPREHENSIVE, ACADEMIC-QUALITY REPORT WITH SOURCES.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="mb-8">
          {error && (
            <div className={`${darkMode ? 'bg-neo-red/20 border-neo-red' : 'bg-neo-red/20 border-neo-red'} border-2 p-4 shadow-neo mb-6 flex items-start`}>
              <FiAlertCircle className="text-neo-red mt-0.5 mr-3 flex-shrink-0 text-xl" />
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-red' : 'text-neo-red'}`}>{error}</p>
            </div>
          )}
          
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="search-input pr-16 text-xl font-bold"
              placeholder="WHAT DO YOU WANT TO KNOW?"
              disabled={isSubmitting}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 border-2 border-neo-black dark:border-neo-white bg-neo-blue text-neo-white shadow-neo hover:bg-neo-blue/90 transition-all duration-200 disabled:opacity-70 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-0 active:translate-y-0"
              aria-label="Start Research"
            >
              {isSubmitting ? (
                <FiLoader className="animate-spin" size={20} />
              ) : (
                <FiSearch size={20} />
              )}
            </button>
          </div>
        </form>
        
        <div className={`neo-card ${darkMode ? 'bg-neo-black/50' : 'bg-neo-white'} animated-bg`}>
          <h3 className={`text-xl font-black ${darkMode ? 'text-neo-blue' : 'text-neo-blue'} mb-6`}>WHAT CAN YOU RESEARCH?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-purple/20' : 'bg-neo-yellow/20'}`}>
              <h4 className="font-black text-lg mb-3">ACADEMIC TOPICS</h4>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
                "THE IMPACT OF CLIMATE CHANGE ON OCEAN ECOSYSTEMS"
              </p>
            </div>
            <div className={`p-6 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-green/20' : 'bg-neo-orange/20'}`}>
              <h4 className="font-black text-lg mb-3">BUSINESS RESEARCH</h4>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
                "MARKET ANALYSIS OF ELECTRIC VEHICLE INDUSTRY"
              </p>
            </div>
            <div className={`p-6 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-orange/20' : 'bg-neo-green/20'}`}>
              <h4 className="font-black text-lg mb-3">TECHNOLOGY TRENDS</h4>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
                "THE FUTURE OF ARTIFICIAL INTELLIGENCE IN HEALTHCARE"
              </p>
            </div>
            <div className={`p-6 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-yellow/20' : 'bg-neo-purple/20'}`}>
              <h4 className="font-black text-lg mb-3">HISTORICAL EVENTS</h4>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
                "THE ECONOMIC IMPACT OF THE INDUSTRIAL REVOLUTION"
              </p>
            </div>
          </div>
        </div>

        <div className={`mt-8 neo-card ${darkMode ? 'bg-neo-black/50' : 'bg-neo-white'}`}>
          <h3 className={`text-xl font-black ${darkMode ? 'text-neo-green' : 'text-neo-green'} mb-6`}>RESEARCH FEATURES</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`w-16 h-16 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-green' : 'bg-neo-green'} flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl font-black text-neo-white">📊</span>
              </div>
              <h4 className="font-black text-lg mb-2">COMPREHENSIVE ANALYSIS</h4>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
                DETAILED RESEARCH WITH MULTIPLE SOURCES
              </p>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-blue' : 'bg-neo-blue'} flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl font-black text-neo-white">📚</span>
              </div>
              <h4 className="font-black text-lg mb-2">ACADEMIC CITATIONS</h4>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
                PROPERLY CITED SOURCES AND REFERENCES
              </p>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-purple' : 'bg-neo-purple'} flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl font-black text-neo-white">📄</span>
              </div>
              <h4 className="font-black text-lg mb-2">PDF EXPORT</h4>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
                DOWNLOAD REPORTS AS PROFESSIONAL PDFS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research; 