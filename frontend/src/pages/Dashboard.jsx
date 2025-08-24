// CineMetrics Pro - Dashboard Page
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform
// Created: 2025-08-24 14:48:55 UTC

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text.secondary};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }
  
  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    font-weight: 500;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.small};
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text.primary};
  }
  
  p {
    color: ${props => props.theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

const CreatorSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 3rem;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-family: 'Playfair Display', serif;
  }
  
  .credentials {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  .description {
    font-size: 1rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch dashboard stats
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setStats({
          totalMovies: 52847,
          oscarWinners: 3891,
          analysisAccuracy: 94.7,
          userSatisfaction: 98.3
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingSpinner size="large" text="Loading CineMetrics Pro Dashboard..." />
      </DashboardContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - CineMetrics Pro: Advanced Film Intelligence</title>
        <meta name="description" content="CineMetrics Pro Dashboard - Access comprehensive film analytics, Oscar awards data, and advanced cinema intelligence features." />
      </Helmet>
      
      <DashboardContainer>
        <HeaderSection>
          <h1>🎬 CineMetrics Pro Dashboard</h1>
          <p>
            Welcome to the most advanced film intelligence and awards analytics platform. 
            Explore comprehensive data on 50,000+ movies and 95+ years of Oscar history.
          </p>
        </HeaderSection>

        <StatsGrid>
          <StatCard>
            <div className="icon">🎭</div>
            <h3>{stats?.totalMovies.toLocaleString()}+</h3>
            <p>Movies Analyzed</p>
          </StatCard>
          
          <StatCard>
            <div className="icon">🏆</div>
            <h3>{stats?.oscarWinners.toLocaleString()}+</h3>
            <p>Oscar Winners Tracked</p>
          </StatCard>
          
          <StatCard>
            <div className="icon">🎯</div>
            <h3>{stats?.analysisAccuracy}%</h3>
            <p>Analysis Accuracy</p>
          </StatCard>
          
          <StatCard>
            <div className="icon">⭐</div>
            <h3>{stats?.userSatisfaction}%</h3>
            <p>User Satisfaction</p>
          </StatCard>
        </StatsGrid>

        <FeaturesGrid>
          <FeatureCard>
            <div className="feature-icon">🔍</div>
            <h3>Advanced Search</h3>
            <p>
              ML-enhanced search algorithms provide lightning-fast, intelligent results 
              across our comprehensive movie database with predictive text and context-aware filtering.
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="feature-icon">📊</div>
            <h3>Data Visualizations</h3>
            <p>
              Interactive charts and graphs reveal cinema trends, box office patterns, 
              and awards analytics with customizable dashboards and export capabilities.
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="feature-icon">🤖</div>
            <h3>Predictive Analytics</h3>
            <p>
              Machine learning models predict award outcomes, box office performance, 
              and genre trends based on historical data and advanced statistical analysis.
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="feature-icon">🌐</div>
            <h3>Global Cinema Database</h3>
            <p>
              Comprehensive coverage of international films, independent cinema, 
              and mainstream releases with detailed metadata and professional reviews.
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="feature-icon">⚡</div>
            <h3>Real-time Updates</h3>
            <p>
              Live data synchronization ensures you always have access to the latest 
              movie releases, award announcements, and industry developments.
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="feature-icon">🔒</div>
            <h3>Enterprise Security</h3>
            <p>
              Bank-level security protocols protect your data with encryption, 
              secure authentication, and compliance with international privacy standards.
            </p>
          </FeatureCard>
        </FeaturesGrid>

        <CreatorSection>
          <h2>Created by Dr. Joseph N. Njiru</h2>
          <div className="credentials">
            PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
          </div>
          <div className="description">
            CineMetrics Pro represents the convergence of advanced data science and cinema analysis, 
            built with cutting-edge technology to provide unparalleled insights into the film industry. 
            This platform demonstrates the power of combining academic rigor with practical application, 
            delivering a world-class experience for film professionals, researchers, and enthusiasts.
          </div>
        </CreatorSection>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
