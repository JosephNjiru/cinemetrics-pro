// Rigour Consulting - About Page
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// World-Class Strategic Business Consulting Platform

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const AboutContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.gradient};
  padding: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  color: white;
  max-width: 800px;
  margin: 0 auto 4rem;
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: ${props => props.theme.shadows.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  font-weight: 400;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.6;
`;

const CreatorInfo = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 3rem;
  
  p {
    margin: 0.2rem 0;
  }
`;

const CTASection = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`;

const CTAButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    color: white;
  }
  
  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const PrimaryButton = styled(CTAButton)`
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.theme.colors.primary};
  
  &:hover {
    background: white;
    color: ${props => props.theme.colors.primary};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
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

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
  color: white;
  
  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    display: block;
    color: ${props => props.theme.colors.accent};
  }
  
  .stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.5rem;
  }
`;

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate components on load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const expertise = [
    {
      icon: '🎓',
      title: 'Academic Excellence',
      description: 'PhD in advanced data science with extensive research in predictive analytics and strategic business optimization.'
    },
    {
      icon: '💼',
      title: 'Industry Experience',
      description: 'Over 15 years of hands-on consulting experience across Fortune 500 companies and emerging enterprises.'
    },
    {
      icon: '🏆',
      title: 'Proven Results',
      description: 'Track record of delivering measurable results with 98% client satisfaction and 500+ successful projects.'
    },
    {
      icon: '🌟',
      title: 'Innovation Leadership',
      description: 'Pioneer in applying advanced analytics and AI-driven solutions to complex business challenges.'
    },
    {
      icon: '🔬',
      title: 'Research & Development',
      description: 'Continuous research in emerging technologies and methodologies to stay ahead of industry trends.'
    },
    {
      icon: '🤝',
      title: 'Partnership Approach',
      description: 'Collaborative methodology that ensures knowledge transfer and sustainable organizational transformation.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Rigour Consulting | Meet Our Expert Team</title>
        <meta name="description" content="Learn about Rigour Consulting's founder Dr. Joseph N. Njiru, PhD, and our commitment to delivering world-class strategic business consulting solutions across Australia." />
        <meta name="keywords" content="about rigour consulting, dr joseph njiru, business consulting expert, strategic consulting team, consulting founder, australia consulting" />
        <link rel="canonical" href="https://rigourconsulting.com.au/about" />
      </Helmet>
      
      <AboutContainer>
        <HeroSection>
          <HeroTitle>👨‍💼 About Rigour Consulting</HeroTitle>
          <HeroSubtitle>Leading Australia's Business Transformation</HeroSubtitle>
          <HeroDescription>
            Founded by Dr. Joseph N. Njiru, PhD, Rigour Consulting brings world-class expertise 
            in strategic business consulting, digital transformation, and advanced analytics. 
            Our mission is to partner with organizations to unlock their full potential 
            through innovative solutions and proven methodologies.
          </HeroDescription>
          
          <CreatorInfo>
            <p><strong>Founder & Principal Consultant</strong></p>
            <p><strong>Dr. Joseph N. Njiru, PhD</strong></p>
            <p>M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI</p>
          </CreatorInfo>
          
          <CTASection>
            <PrimaryButton to="/services">
              <span>🎯</span>
              Our Services
            </PrimaryButton>
            <CTAButton to="/contact">
              <span>📞</span>
              Contact Us
            </CTAButton>
          </CTASection>
          
          <StatsBar>
            <StatItem>
              <span className="stat-number">15+</span>
              <div className="stat-label">Years Experience</div>
            </StatItem>
            <StatItem>
              <span className="stat-number">500+</span>
              <div className="stat-label">Successful Projects</div>
            </StatItem>
            <StatItem>
              <span className="stat-number">98%</span>
              <div className="stat-label">Client Satisfaction</div>
            </StatItem>
            <StatItem>
              <span className="stat-number">200+</span>
              <div className="stat-label">Enterprise Clients</div>
            </StatItem>
          </StatsBar>
        </HeroSection>

        <FeaturesGrid>
          {expertise.map((item, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{item.icon}</FeatureIcon>
              <FeatureTitle>{item.title}</FeatureTitle>
              <FeatureDescription>{item.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </AboutContainer>
    </>
  );
};

export default About;