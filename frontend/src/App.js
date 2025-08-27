// Rigour Consulting - Main React Application
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// World-Class Strategic Business Consulting Platform
// Excellence in Strategy, Innovation & Digital Transformation
// Created: 2025-08-27

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Components
import BrandHeader from './components/BrandHeader';
import Welcome from './pages/Welcome';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';

// Import API service with smart fallback
import apiService from './services/apiService';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Theme configuration - Professional Consulting Brand
const theme = {
  colors: {
    primary: '#1e3a8a',        // Professional Blue
    secondary: '#1e40af',      // Rich Blue
    accent: '#fbbf24',         // Consulting Gold
    success: '#10b981',        // Success Green
    warning: '#f59e0b',        // Warning Amber
    error: '#dc2626',          // Error Red
    text: {
      primary: '#1f2937',      // Dark Gray
      secondary: '#4b5563',    // Medium Gray
      light: '#ffffff',        // White
    },
    background: {
      primary: '#ffffff',      // Pure White
      secondary: '#f9fafb',    // Light Gray
      gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', // Blue Gradient
      consultingGradient: 'linear-gradient(135deg, #1e3a8a 0%, #fbbf24 100%)', // Blue to Gold
    },
    border: '#e5e7eb',         // Light Border
    consulting: {
      navy: '#1e3a8a',
      gold: '#fbbf24',
      white: '#ffffff',
      lightGray: '#f9fafb',
    },
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    heading: "'Playfair Display', serif",
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 12px rgba(0,0,0,0.15)',
    large: '0 8px 24px rgba(0,0,0,0.2)',
  },
  borderRadius: '8px',
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    wide: '1200px',
  },
};

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    line-height: 1.6;
    color: ${props => props.theme.colors.text.primary};
    background-color: ${props => props.theme.colors.background.secondary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: ${props => props.theme.borderRadius};
    transition: all 0.3s ease;

    &:focus {
      outline: 2px solid ${props => props.theme.colors.primary};
      outline-offset: 2px;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

// Main App container
const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.secondary};
`;

// Content wrapper
const ContentWrapper = styled.main`
  padding-top: 80px; // Account for fixed header
  min-height: calc(100vh - 80px);
`;

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState('checking');

  // Check API status on app load
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        console.log('💼 Rigour Consulting: Initializing platform...');
        const response = await apiService.checkHealth();
        
        if (response && response.status === 'healthy') {
          const status = apiService.getStatus();
          if (status.demoMode) {
            setApiStatus('demo');
            console.log('✨ Running in demonstration mode');
          } else {
            setApiStatus('healthy');
            console.log('✅ Connected to live platform services');
          }
        } else {
          setApiStatus('demo');
          console.log('✨ Using demonstration mode');
        }
      } catch (error) {
        console.warn('⚠️ Platform initialization in demo mode:', error.message);
        setApiStatus('demo');
      } finally {
        // Simulate loading time for better UX
        setTimeout(() => setIsLoading(false), 1500);
      }
    };

    checkApiHealth();
  }, []);

  // Show loading screen
  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
          fontFamily: theme.fonts.primary
        }}>
          <div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💼</div>
            <h2 style={{ marginBottom: '0.5rem', fontFamily: theme.fonts.heading }}>Rigour Consulting</h2>
            <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Loading World-Class Consulting Platform...</p>
            <LoadingSpinner />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router basename={process.env.NODE_ENV === 'production' ? '/rigour-consulting' : ''}>
              <AppContainer>
                <BrandHeader apiStatus={apiStatus} />
                <ContentWrapper>
                  <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </ContentWrapper>
              </AppContainer>
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
