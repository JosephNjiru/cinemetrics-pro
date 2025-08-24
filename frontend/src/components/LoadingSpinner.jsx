// CineMetrics Pro - Loading Spinner Component
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform

import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.size === 'large' ? '3rem' : '1rem'};
`;

const Spinner = styled.div`
  width: ${props => {
    switch(props.size) {
      case 'small': return '20px';
      case 'large': return '60px';
      default: return '40px';
    }
  }};
  height: ${props => {
    switch(props.size) {
      case 'small': return '20px';
      case 'large': return '60px';
      default: return '40px';
    }
  }};
  border: ${props => {
    const width = props.size === 'small' ? '2px' : props.size === 'large' ? '6px' : '4px';
    return `${width} solid rgba(102, 126, 234, 0.3)`;
  }};
  border-top: ${props => {
    const width = props.size === 'small' ? '2px' : props.size === 'large' ? '6px' : '4px';
    return `${width} solid #667eea`;
  }};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: ${props => props.theme?.colors?.text?.secondary || '#6c757d'};
  font-size: ${props => props.size === 'large' ? '1.1rem' : '0.9rem'};
  text-align: center;
`;

const LoadingSpinner = ({ 
  size = 'medium', 
  text = '', 
  className = '' 
}) => {
  return (
    <SpinnerWrapper className={className} size={size}>
      <div>
        <Spinner size={size} />
        {text && <LoadingText size={size}>{text}</LoadingText>}
      </div>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
