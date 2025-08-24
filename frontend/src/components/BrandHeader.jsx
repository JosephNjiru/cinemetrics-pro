// CineMetrics Pro - Brand Header Component
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  font-size: 2.5rem;
`;

const BrandText = styled.div`
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    margin: 0;
    font-weight: 700;
  }
  
  p {
    font-size: 0.85rem;
    margin: 0;
    opacity: 0.9;
    font-weight: 300;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: #f4d03f;
      border-radius: 1px;
    }
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch(props.status) {
      case 'healthy': return '#28a745';
      case 'demo': return '#007bff';
      case 'unhealthy': return '#ffc107';
      case 'checking': return '#6c757d';
      default: return '#dc3545';
    }
  }};
`;

const CreatorInfo = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  text-align: center;
  
  @media (max-width: 768px) {
    order: -1;
  }
`;

const BrandHeader = ({ apiStatus = 'checking' }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/movies', label: 'Movies' },
    { path: '/awards', label: 'Awards' }
  ];
  
  const getStatusText = (status) => {
    switch(status) {
      case 'healthy': return 'Live API';
      case 'demo': return 'Demo Mode';
      case 'unhealthy': return 'API Issues';
      case 'checking': return 'Checking...';
      default: return 'Offline';
    }
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <BrandSection>
          <Logo>🎬</Logo>
          <BrandText>
            <h1>CineMetrics Pro</h1>
            <p>Where Cinema Meets Advanced Data Science</p>
          </BrandText>
        </BrandSection>
        
        <Navigation>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          ))}
          
          <StatusIndicator>
            <StatusDot status={apiStatus} />
            {getStatusText(apiStatus)}
          </StatusIndicator>
        </Navigation>
        
        <CreatorInfo>
          <div>Dr. Joseph N. Njiru, PhD</div>
          <div>M PredAnylt (Data Science)</div>
        </CreatorInfo>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default BrandHeader;
