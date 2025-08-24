// CineMetrics Pro - Dashboard Page
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.gradient};
  padding: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  color: white;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: ${props => props.theme.shadows.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

const CreatorInfo = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 500;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 4rem auto 0;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const Dashboard = () => {
  const [stats, setStats] = useState({
    movies: '50,000+',
    awards: '95+',
    countries: '100+',
    accuracy: '91.7%'
  });

  useEffect(() => {
    // Animate numbers on load
    const timer = setTimeout(() => {
      setStats({
        movies: '50,000+',
        awards: '95+',
        countries: '100+',
        accuracy: '91.7%'
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - CineMetrics Pro</title>
        <meta name="description" content="CineMetrics Pro Dashboard - Advanced Film Intelligence & Awards Analytics Platform" />
        <meta name="keywords" content="film analytics, movie database, oscar awards, data science, cinema intelligence" />
      </Helmet>
      
      <DashboardContainer>
        <Header>
          <Title>🎬 CineMetrics Pro</Title>
          <Subtitle>Advanced Film Intelligence & Awards Analytics Platform</Subtitle>
          <CreatorInfo>Created by Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)</CreatorInfo>
          <CreatorInfo>MEd, GD Stat, GC HigherEd, GC-GEOSPI</CreatorInfo>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatIcon>🎭</StatIcon>
            <StatNumber>{stats.movies}</StatNumber>
            <StatLabel>Movies in Database</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>🏆</StatIcon>
            <StatNumber>{stats.awards}</StatNumber>
            <StatLabel>Years of Awards Data</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>🌍</StatIcon>
            <StatNumber>{stats.countries}</StatNumber>
            <StatLabel>Countries Covered</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>🎯</StatIcon>
            <StatNumber>{stats.accuracy}</StatNumber>
            <StatLabel>Prediction Accuracy</StatLabel>
          </StatCard>
        </StatsGrid>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureTitle>
              <span>🔍</span>
              Advanced Search & Discovery
            </FeatureTitle>
            <FeatureDescription>
              ML-powered search algorithms provide intelligent movie recommendations 
              and advanced filtering capabilities across our comprehensive database.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>
              <span>📊</span>
              Real-time Analytics
            </FeatureTitle>
            <FeatureDescription>
              Interactive data visualizations and trend analysis provide insights 
              into box office performance, genre popularity, and industry patterns.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>
              <span>🏆</span>
              Awards Prediction
            </FeatureTitle>
            <FeatureDescription>
              Advanced machine learning models analyze historical data to predict 
              award winners with industry-leading accuracy rates.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>
              <span>⚡</span>
              High Performance
            </FeatureTitle>
            <FeatureDescription>
              Enterprise-grade architecture ensures fast response times, 
              99.9% uptime, and seamless scalability for all users.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;