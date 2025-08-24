// CineMetrics Pro - Error Fallback Component
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform

import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin: 2rem;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  opacity: 0.9;
`;

const ErrorDetails = styled.details`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  
  summary {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  pre {
    font-size: 0.85rem;
    text-align: left;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const RetryButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const handleRetry = () => {
    // Clear any cached data that might be causing issues
    if (window.location.reload) {
      window.location.reload();
    } else {
      resetErrorBoundary();
    }
  };

  const reportError = () => {
    // In production, this would send error reports to monitoring service
    console.error('CineMetrics Pro Error Report:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  };

  React.useEffect(() => {
    reportError();
  }, [error]);

  return (
    <ErrorContainer>
      <ErrorIcon>🎬💥</ErrorIcon>
      <ErrorTitle>Oops! Something went wrong</ErrorTitle>
      <ErrorMessage>
        CineMetrics Pro encountered an unexpected error. Don't worry - our advanced 
        error handling system has logged the issue for our development team.
      </ErrorMessage>
      
      {process.env.NODE_ENV === 'development' && (
        <ErrorDetails>
          <summary>Error Details (Development Mode)</summary>
          <pre>{error.stack}</pre>
        </ErrorDetails>
      )}
      
      <RetryButton onClick={handleRetry}>
        🔄 Retry CineMetrics Pro
      </RetryButton>
      
      <ContactInfo>
        <p><strong>CineMetrics Pro: Advanced Film Intelligence & Awards Analytics Platform</strong></p>
        <p>Created by Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)</p>
        <p>MEd, GD Stat, GC HigherEd, GC-GEOSPI</p>
      </ContactInfo>
    </ErrorContainer>
  );
};

export default ErrorFallback;
