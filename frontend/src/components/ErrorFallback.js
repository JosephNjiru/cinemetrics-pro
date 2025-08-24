// CineMetrics Pro - Error Fallback Component
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform

import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.error};
`;

const ErrorTitle = styled.h2`
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const ErrorButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <ErrorContainer>
      <ErrorTitle>🚨 Something went wrong</ErrorTitle>
      <ErrorMessage>{error?.message || 'An unexpected error occurred'}</ErrorMessage>
      <ErrorButton onClick={resetErrorBoundary}>
        Try Again
      </ErrorButton>
    </ErrorContainer>
  );
};

export default ErrorFallback;