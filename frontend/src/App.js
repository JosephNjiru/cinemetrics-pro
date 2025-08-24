// CineMetrics Pro - Main React Application
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform
// Created: 2025-08-24 14:40:59 UTC

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Components
import BrandHeader from './components/BrandHeader';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import Awards from './pages/Awards';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';

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

// Theme configuration
const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f4d03f',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    text: {
      primary: '#343a40',
      secondary: '#6c757d',
      light: '#ffffff',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    border: '#dee2e6',
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
        const response = await fetch('/api/health');
        if (response.ok) {
          setApiStatus('healthy');
        } else {
          setApiStatus('unhealthy');
        }
      } catch (error) {
        console.warn('API health check failed:', error.message);
        setApiStatus('offline');
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</div>
            <h2 style={{ marginBottom: '0.5rem', fontFamily: theme.fonts.heading }}>CineMetrics Pro</h2>
            <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Loading Advanced Film Intelligence...</p>
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
            <Router basename={process.env.NODE_ENV === 'production' ? '/cinemetrics-pro' : ''}>
              <AppContainer>
                <BrandHeader apiStatus={apiStatus} />
                <ContentWrapper>
                  <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/awards" element={<Awards />} />
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
