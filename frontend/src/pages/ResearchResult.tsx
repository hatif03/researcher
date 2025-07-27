import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import researchService from '../services/researchService';
import { FiDownload, FiExternalLink, FiLoader, FiAlertCircle } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import './ResearchResult.css';
import { useTheme } from '../contexts/ThemeContext';

interface Source {
  title: string;
  url: string;
  snippet?: string;
}

interface Section {
  title: string;
  content: string;
}

interface Report {
  id: string;
  topic: string;
  summary: string;
  sections: Section[];
  sources: Source[];
  created_at: string;
}

const ResearchResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('in_progress');
  const [activeSection, setActiveSection] = useState(0);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const { darkMode } = useTheme();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        // First check the status
        const statusResponse = await researchService.getResearchStatus(id);
        setStatus(statusResponse.status);
        
        if (statusResponse.status === 'completed') {
          // If completed, get the report
          const reportData = await researchService.getResearchResult(id);
          setReport(reportData);
          setIsLoading(false);
        } else if (statusResponse.status === 'failed') {
          setError('Research failed. Please try again.');
          setIsLoading(false);
        } else {
          // If still in progress, poll every 5 seconds
          setTimeout(fetchData, 5000);
        }
      } catch (err: any) {
        console.error('Error fetching research:', err);
        setError(err.response?.data?.detail || 'Failed to load research. Please try again.');
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const handleDownloadPdf = async () => {
    if (!id) return;
    
    setIsPdfLoading(true);
    setPdfError(null);
    
    try {
      const blob = await researchService.downloadPdf(id);
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `Research_Report_${id}.pdf`;
      // Trigger download
      document.body.appendChild(link);
      link.click();
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Error downloading PDF:', err);
      setPdfError(err.message || 'Failed to download PDF. Please try again later.');
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setPdfError(null);
      }, 5000);
    } finally {
      setIsPdfLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center py-16">
          <div className={`w-24 h-24 border-2 border-neo-black dark:border-neo-white shadow-neo-lg ${darkMode ? 'bg-neo-blue' : 'bg-neo-blue'} flex items-center justify-center mx-auto mb-8`}>
            <FiLoader className="animate-spin text-neo-white text-4xl" />
          </div>
          <h2 className="text-3xl font-black mb-4">
            {status === 'in_progress' ? 'RESEARCHING...' : 'LOADING...'}
          </h2>
          <p className={`text-xl font-bold ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
            {status === 'in_progress' 
              ? 'OUR AI IS CONDUCTING COMPREHENSIVE RESEARCH ON YOUR TOPIC' 
              : 'LOADING YOUR RESEARCH REPORT'
            }
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="neo-card text-center">
          <div className="flex items-center justify-center text-neo-red mb-6">
            <FiAlertCircle size={64} />
          </div>
          <h2 className="text-3xl font-black mb-6">ERROR</h2>
          <p className="font-bold mb-8">{error}</p>
          <Link to="/research" className="btn btn-primary inline-flex items-center text-lg">
            <span className="mr-2 text-xl">←</span>
            START NEW RESEARCH
          </Link>
        </div>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/history" className="btn btn-secondary inline-flex items-center mb-6">
          <span className="mr-2 text-xl">←</span>
          BACK TO HISTORY
        </Link>
        
        <div className="neo-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-black mb-4">{report.topic}</h1>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-white/70' : 'text-neo-black/70'}`}>
                CREATED: {new Date(report.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleDownloadPdf}
                disabled={isPdfLoading}
                className="btn btn-primary inline-flex items-center text-lg"
              >
                {isPdfLoading ? (
                  <FiLoader className="animate-spin mr-2 text-xl" />
                ) : (
                  <FiDownload className="mr-2 text-xl" />
                )}
                {isPdfLoading ? 'GENERATING PDF...' : 'DOWNLOAD PDF'}
              </button>
            </div>
          </div>
          
          {pdfError && (
            <div className={`${darkMode ? 'bg-neo-red/20 border-neo-red' : 'bg-neo-red/20 border-neo-red'} border-2 p-4 shadow-neo mb-6 flex items-start`}>
              <div className="text-neo-red mt-0.5 mr-3 flex-shrink-0 text-xl">⚠️</div>
              <p className={`text-sm font-bold ${darkMode ? 'text-neo-red' : 'text-neo-red'}`}>{pdfError}</p>
            </div>
          )}
          
          <div className={`p-6 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-purple/20' : 'bg-neo-yellow/20'}`}>
            <h2 className="text-2xl font-black mb-4">EXECUTIVE SUMMARY</h2>
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                className={`${darkMode ? 'text-neo-white' : 'text-neo-black'} font-bold`}
              >
                {report.summary}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveSection(0)}
            className={`px-6 py-3 font-black text-lg border-2 border-neo-black dark:border-neo-white shadow-neo transition-all duration-200 ${
              activeSection === 0
                ? `${darkMode ? 'bg-neo-blue text-neo-white' : 'bg-neo-blue text-neo-white'}`
                : `${darkMode ? 'bg-neo-black text-neo-white hover:bg-neo-purple/20' : 'bg-neo-white text-neo-black hover:bg-neo-yellow/20'}`
            } hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-0 active:translate-y-0`}
          >
            RESEARCH SECTIONS
          </button>
          <button
            onClick={() => setActiveSection(1)}
            className={`px-6 py-3 font-black text-lg border-2 border-neo-black dark:border-neo-white shadow-neo transition-all duration-200 ${
              activeSection === 1
                ? `${darkMode ? 'bg-neo-green text-neo-white' : 'bg-neo-green text-neo-white'}`
                : `${darkMode ? 'bg-neo-black text-neo-white hover:bg-neo-purple/20' : 'bg-neo-white text-neo-black hover:bg-neo-yellow/20'}`
            } hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-0 active:translate-y-0`}
          >
            SOURCES & CITATIONS
          </button>
        </div>
      </div>

      {/* Content */}
      {activeSection === 0 && (
        <div className="space-y-6">
          {report.sections.map((section, index) => (
            <div key={index} className="neo-card">
              <h3 className="text-2xl font-black mb-6">{section.title}</h3>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  className={`${darkMode ? 'text-neo-white' : 'text-neo-black'} font-bold`}
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 1 && (
        <div className="neo-card">
          <h3 className="text-2xl font-black mb-6">SOURCES & CITATIONS</h3>
          <div className="grid gap-4">
            {report.sources.map((source, index) => (
              <div key={index} className={`p-4 border-2 border-neo-black dark:border-neo-white shadow-neo ${darkMode ? 'bg-neo-green/20' : 'bg-neo-orange/20'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-black text-lg mb-2">{source.title}</h4>
                    {source.snippet && (
                      <p className={`text-sm font-bold mb-3 ${darkMode ? 'text-neo-white/80' : 'text-neo-black/80'}`}>
                        {source.snippet}
                      </p>
                    )}
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-bold ${darkMode ? 'text-neo-blue' : 'text-neo-blue'} hover:underline`}
                    >
                      {source.url}
                    </a>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary ml-4"
                  >
                    <FiExternalLink className="text-xl" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchResult; 