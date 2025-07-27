import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import researchService from '../services/researchService';
import { FiSearch, FiClock, FiArrowRight, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

interface ResearchItem {
  id: string;
  user_id: number;
  topic: string;
  created_at: string;
}

const History: React.FC = () => {
  const [researches, setResearches] = useState<ResearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const { darkMode } = useTheme();
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await researchService.getResearchHistory();
        setResearches(response.researches);
        setIsLoading(false);
      } catch (err: any) {
        // Detailed error logging
        let errorMessage = 'Failed to load research history.';
        let debugDetails = '';
        
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = err.response.data?.detail || errorMessage;
          debugDetails = `Status: ${err.response.status}, Data: ${JSON.stringify(err.response.data)}`;
        } else if (err.request) {
          // The request was made but no response was received
          debugDetails = 'No response received from server';
        } else {
          // Something happened in setting up the request that triggered an Error
          debugDetails = err.message || 'Unknown error';
        }
        
        setError(errorMessage);
        setDebugInfo(debugDetails);
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, []);
  
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <FiLoader className="animate-spin text-neo-blue" size={48} />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="neo-card">
          <div className="flex items-center justify-center text-neo-red mb-6">
            <FiAlertCircle size={64} />
          </div>
          <h2 className="text-3xl font-black text-center mb-6">ERROR</h2>
          <p className="text-center font-bold mb-8">{error}</p>
          {debugInfo && (
            <div className="mt-6 p-4 border-2 border-neo-black dark:border-neo-white shadow-neo overflow-auto">
              <p className="text-xs font-mono font-bold">{debugInfo}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  if (researches.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">RESEARCH HISTORY</h1>
          <p className={`text-xl font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>TRACK AND ACCESS YOUR PAST RESEARCH</p>
        </div>
        
        <div className="neo-card text-center py-16">
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-purple' : 'bg-neo-yellow'} flex items-center justify-center`}>
              <FiClock className={`${darkMode ? 'text-neo-white' : 'text-neo-black'} text-3xl`} />
            </div>
          </div>
          <h2 className="text-3xl font-black mb-6">NO RESEARCH HISTORY</h2>
          <p className={`font-bold mb-8 max-w-md mx-auto ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
            YOU HAVEN'T CONDUCTED ANY RESEARCH YET. START YOUR FIRST RESEARCH TO SEE IT HERE.
          </p>
          <Link to="/research" className="btn btn-primary inline-flex items-center text-lg">
            <FiSearch className="mr-2 text-xl" />
            START RESEARCHING
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">RESEARCH HISTORY</h1>
        <p className={`text-xl font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>YOUR PREVIOUS RESEARCH PROJECTS</p>
      </div>
      
      <div className="grid gap-6">
        {researches.map((research) => (
          <div key={research.id} className={`neo-card ${darkMode ? 'hover:bg-neo-purple/10' : 'hover:bg-neo-yellow/10'}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-black mb-2">{research.topic}</h3>
                <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/70' : 'text-neo-black/70'}`}>
                  CREATED: {new Date(research.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <Link
                to={`/research/${research.id}`}
                className="btn btn-primary inline-flex items-center ml-4"
              >
                VIEW REPORT
                <FiArrowRight className="ml-2 text-xl" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link to="/research" className="btn btn-secondary inline-flex items-center text-lg">
          <FiSearch className="mr-2 text-xl" />
          START NEW RESEARCH
        </Link>
      </div>
    </div>
  );
};

export default History; 