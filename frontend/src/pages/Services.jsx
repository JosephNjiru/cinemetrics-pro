// Rigour Consulting - Services Page
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// World-Class Strategic Business Consulting Platform

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import apiService from '../services/apiService';

const ServicesContainer = styled.div`
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

const Services = () => {
  const [services, setServices] = useState([
    {
      icon: '🎯',
      title: 'Strategic Business Consulting',
      description: 'Comprehensive business strategy development, competitive analysis, and strategic planning to drive sustainable growth and market leadership.',
      features: ['Market Analysis', 'Strategic Planning', 'Competitive Intelligence', 'Growth Strategy']
    },
    {
      icon: '🚀',
      title: 'Digital Transformation',
      description: 'End-to-end digital transformation solutions including technology assessment, digital strategy, and implementation roadmaps.',
      features: ['Digital Strategy', 'Technology Assessment', 'Process Automation', 'Digital Culture']
    },
    {
      icon: '📈',
      title: 'Data Analytics & Business Intelligence',
      description: 'Advanced analytics solutions that transform raw data into actionable insights and strategic business intelligence.',
      features: ['Data Strategy', 'Predictive Analytics', 'Dashboard Development', 'Reporting Solutions']
    },
    {
      icon: '💡',
      title: 'Innovation & Change Management',
      description: 'Innovation frameworks and change management programs that foster creative thinking and successful organizational transformation.',
      features: ['Innovation Strategy', 'Change Leadership', 'Organizational Design', 'Cultural Transformation']
    },
    {
      icon: '⚡',
      title: 'Process Optimization',
      description: 'Business process re-engineering and optimization that eliminates inefficiencies and maximizes operational excellence.',
      features: ['Process Mapping', 'Efficiency Analysis', 'Automation Design', 'Quality Management']
    },
    {
      icon: '🏆',
      title: 'Performance Management',
      description: 'Performance measurement systems and KPI development that align organizational activities with strategic objectives.',
      features: ['KPI Development', 'Performance Dashboards', 'Benchmarking', 'ROI Analysis']
    }
  ]);

  return (
    <>
      <Helmet>
        <title>Our Services - Rigour Consulting | Strategic Business Consulting Services</title>
        <meta name="description" content="Explore Rigour Consulting's comprehensive range of strategic business consulting services including digital transformation, data analytics, innovation consulting, and more." />
        <meta name="keywords" content="business consulting services, strategic consulting, digital transformation services, data analytics consulting, innovation consulting, process optimization" />
        <link rel="canonical" href="https://rigourconsulting.com.au/services" />
      </Helmet>
      
      <ServicesContainer>
        <Header>
          <Title>💼 Our Services</Title>
          <Subtitle>
            Comprehensive Strategic Business Consulting Solutions
          </Subtitle>
          <CreatorInfo>World-Class Expertise by Dr. Joseph N. Njiru, PhD</CreatorInfo>
          <CreatorInfo>M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI</CreatorInfo>
        </Header>

        <StatsGrid>
          {services.map((service, index) => (
            <StatCard key={index}>
              <StatIcon>{service.icon}</StatIcon>
              <FeatureTitle>{service.title}</FeatureTitle>
              <FeatureDescription>{service.description}</FeatureDescription>
              <div style={{ marginTop: '1rem' }}>
                <strong>Key Features:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={{ marginBottom: '0.3rem' }}>{feature}</li>
                  ))}
                </ul>
              </div>
            </StatCard>
          ))}
        </StatsGrid>
        
      </ServicesContainer>
    </>
  );
};

export default Services;