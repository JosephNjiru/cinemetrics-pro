// Rigour Consulting - Contact Page
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// World-Class Strategic Business Consulting Platform

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ContactContainer = styled.div`
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

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate components on load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      description: 'contact@rigourconsulting.com.au'
    },
    {
      icon: '📱',
      title: 'Phone',
      description: '+61 (0)3 XXXX XXXX'
    },
    {
      icon: '🏢',
      title: 'Office',
      description: 'Melbourne, Victoria, Australia'
    },
    {
      icon: '🌐',
      title: 'Website',
      description: 'www.rigourconsulting.com.au'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      description: 'linkedin.com/in/joseph-n-njiru-phd'
    },
    {
      icon: '⏰',
      title: 'Business Hours',
      description: 'Monday - Friday: 9:00 AM - 6:00 PM AEDT'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Rigour Consulting | Get in Touch for Strategic Consulting</title>
        <meta name="description" content="Contact Rigour Consulting for world-class strategic business consulting services. Reach out to Dr. Joseph N. Njiru, PhD for expert consulting solutions." />
        <meta name="keywords" content="contact rigour consulting, business consulting contact, strategic consulting melbourne, consulting inquiry, dr joseph njiru contact" />
        <link rel="canonical" href="https://rigourconsulting.com.au/contact" />
      </Helmet>
      
      <ContactContainer>
        <HeroSection>
          <HeroTitle>📞 Contact Us</HeroTitle>
          <HeroSubtitle>Ready to Transform Your Business?</HeroSubtitle>
          <HeroDescription>
            Get in touch with our expert consulting team to discuss how we can help 
            your organization achieve its strategic goals. We offer free initial 
            consultations to understand your challenges and explore solutions.
          </HeroDescription>
          
          <CreatorInfo>
            <p><strong>Principal Consultant</strong></p>
            <p><strong>Dr. Joseph N. Njiru, PhD</strong></p>
            <p>M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI</p>
          </CreatorInfo>
          
          <CTASection>
            <PrimaryButton to="/services">
              <span>🎯</span>
              Our Services
            </PrimaryButton>
            <CTAButton to="/about">
              <span>💼</span>
              About Us
            </CTAButton>
          </CTASection>
          
          <StatsBar>
            <StatItem>
              <span className="stat-number">24h</span>
              <div className="stat-label">Response Time</div>
            </StatItem>
            <StatItem>
              <span className="stat-number">Free</span>
              <div className="stat-label">Initial Consultation</div>
            </StatItem>
            <StatItem>
              <span className="stat-number">100%</span>
              <div className="stat-label">Confidential</div>
            </StatItem>
            <StatItem>
              <span className="stat-number">Global</span>
              <div className="stat-label">Remote Support</div>
            </StatItem>
          </StatsBar>
        </HeroSection>

        <FeaturesGrid>
          {contactInfo.map((item, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{item.icon}</FeatureIcon>
              <FeatureTitle>{item.title}</FeatureTitle>
              <FeatureDescription>{item.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </ContactContainer>
    </>
  );
};

export default Contact;