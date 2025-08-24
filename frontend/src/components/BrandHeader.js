// CineMetrics Pro - Brand Header Component
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.background.gradient};
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  &:hover {
    opacity: 0.9;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover, &.active {
    background: rgba(255,255,255,0.1);
  }
`;

const BrandHeader = () => {
  const location = useLocation();
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">🎬 CineMetrics Pro</Logo>
        <NavLinks>
          <NavLink 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={location.pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/movies" 
            className={location.pathname === '/movies' ? 'active' : ''}
          >
            Movies
          </NavLink>
          <NavLink 
            to="/awards" 
            className={location.pathname === '/awards' ? 'active' : ''}
          >
            Awards
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default BrandHeader;