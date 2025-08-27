// Rigour Consulting - Welcome Page
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// World-Class Strategic Business Consulting Platform

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const WelcomeContainer = styled.div`
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

const TestimonialsSection = styled.section`
  max-width: 1200px;
  margin: 6rem auto 0;
  padding: 0 2rem;
  text-align: center;
`;

const TestimonialsTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const TestimonialsSubtitle = styled.p`
  font-size: 1.1rem;
  color: white;
  opacity: 0.9;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: left;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const TestimonialQuote = styled.blockquote`
  font-style: italic;
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1.5rem;
  position: relative;
  
  &:before {
    content: '"';
    font-size: 4rem;
    color: ${props => props.theme.colors.primary};
    position: absolute;
    top: -1rem;
    left: -0.5rem;
    font-family: serif;
  }
`;

const TestimonialAuthor = styled.cite`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  display: block;
  font-style: normal;
`;

const TestimonialResults = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.consulting.navy};
  background: linear-gradient(135deg, #1e3a8a10, #fbbf2410);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  border: 1px solid ${props => props.theme.colors.consulting.navy}20;
`;

const Welcome = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate components on load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: '🎯',
      title: 'Strategic Consulting',
      description: 'Comprehensive business strategy development and implementation with proven methodologies that drive sustainable growth and competitive advantage.'
    },
    {
      icon: '🚀',
      title: 'Digital Transformation',
      description: 'End-to-end digital transformation solutions that modernize operations, enhance efficiency, and unlock new opportunities.'
    },
    {
      icon: '📈',
      title: 'Data Analytics & Insights',
      description: 'Advanced data analytics and business intelligence solutions that transform raw data into actionable strategic insights.'
    },
    {
      icon: '💡',
      title: 'Innovation Consulting',
      description: 'Innovation strategies and implementation frameworks that foster creative thinking and drive breakthrough solutions.'
    },
    {
      icon: '⚡',
      title: 'Process Optimization',
      description: 'Business process re-engineering and optimization that eliminates inefficiencies and maximizes operational excellence.'
    },
    {
      icon: '🏆',
      title: 'Change Management',
      description: 'Comprehensive change management programs that ensure successful organizational transformation and adoption.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Rigour Consulting - World-Class Strategic Business Consulting | Excellence in Strategy & Innovation</title>
        <meta name="description" content="Australia's premier strategic business consulting firm. Expert consulting in digital transformation, business strategy, process optimization, and enterprise solutions. Delivering unmatched consulting excellence with proven methodologies." />
        <meta name="keywords" content="business consulting, strategic consulting, digital transformation, management consulting, business strategy, process optimization, enterprise solutions, australia consulting, innovation consulting" />
        <link rel="canonical" href="https://rigourconsulting.com.au/" />
      </Helmet>
      
      <WelcomeContainer>
        <HeroSection>
          <HeroTitle>💼 Rigour Consulting</HeroTitle>
          <HeroSubtitle>Excellence in Strategy, Innovation & Digital Transformation</HeroSubtitle>
          <HeroDescription>
            Australia's premier strategic business consulting firm delivering world-class solutions 
            in digital transformation, business strategy, and enterprise optimization. 
            Partner with us to unlock your organization's full potential.
          </HeroDescription>
          
          <CreatorInfo>
            <p>Founded by <strong>Dr. Joseph N. Njiru, PhD</strong></p>
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
            <CTAButton to="/contact">
              <span>📞</span>
              Contact Us
            </CTAButton>
          </CTASection>
          
          <StatsBar>
            <StatItem>
              <span className="stat-number">500+</span>
              <div className="stat-label">Successful Projects</div>
            </StatItem>
            <StatItem>
              <span className="stat-number">15+</span>
              <div className="stat-label">Years Experience</div>
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
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
        
        {/* Client Success Stories */}
        <TestimonialsSection>
          <TestimonialsTitle>Client Success Stories</TestimonialsTitle>
          <TestimonialsSubtitle>Hear from leaders who've transformed their organizations with our expertise</TestimonialsSubtitle>
          
          <TestimonialsGrid>
            <TestimonialCard>
              <TestimonialQuote>
                "Rigour Consulting transformed our digital strategy completely. Their data-driven approach 
                resulted in a 40% increase in operational efficiency and positioned us as an industry leader."
              </TestimonialQuote>
              <TestimonialAuthor>
                <strong>Sarah Chen</strong><br />
                CEO, TechForward Solutions
              </TestimonialAuthor>
              <TestimonialResults>
                Results: 40% efficiency gain, $2M cost savings
              </TestimonialResults>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialQuote>
                "The strategic framework Dr. Njiru developed helped us navigate a complex market transition. 
                We achieved 25% market share growth within 6 months of implementation."
              </TestimonialQuote>
              <TestimonialAuthor>
                <strong>Michael Rodriguez</strong><br />
                Managing Director, Global Manufacturing Inc.
              </TestimonialAuthor>
              <TestimonialResults>
                Results: 25% market share growth, successful transition
              </TestimonialResults>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialQuote>
                "Outstanding expertise in change management. The team guided us through our largest 
                organizational transformation with 95% employee adoption rate - exceptional results."
              </TestimonialQuote>
              <TestimonialAuthor>
                <strong>Dr. Emma Thompson</strong><br />
                Chief Operating Officer, HealthCare Plus
              </TestimonialAuthor>
              <TestimonialResults>
                Results: 95% adoption rate, seamless transformation
              </TestimonialResults>
            </TestimonialCard>
          </TestimonialsGrid>
        </TestimonialsSection>
      </WelcomeContainer>
    </>
  );
};

export default Welcome;