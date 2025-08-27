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

const ConsultationSection = styled.section`
  max-width: 800px;
  margin: 6rem auto 0;
  padding: 0 2rem;
  text-align: center;
`;

const FormTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const FormSubtitle = styled.p`
  font-size: 1.1rem;
  color: white;
  opacity: 0.9;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ConsultationForm = styled.form`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.large};
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.875rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.875rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  box-sizing: border-box;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.875rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #1e3a8a 0%, #fbbf24 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FormDisclaimer = styled.p`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-top: 1rem;
  text-align: center;
  line-height: 1.5;
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
        
        {/* Consultation Request Form */}
        <ConsultationSection>
          <FormTitle>Request a Free Strategic Consultation</FormTitle>
          <FormSubtitle>
            Let's discuss how we can help transform your business. Our experts will provide 
            a customized assessment and strategic recommendations.
          </FormSubtitle>
          
          <ConsultationForm>
            <FormRow>
              <FormField>
                <FormLabel>Full Name *</FormLabel>
                <FormInput type="text" placeholder="Enter your full name" required />
              </FormField>
              <FormField>
                <FormLabel>Job Title *</FormLabel>
                <FormInput type="text" placeholder="e.g. CEO, Director, Manager" required />
              </FormField>
            </FormRow>
            
            <FormRow>
              <FormField>
                <FormLabel>Company Name *</FormLabel>
                <FormInput type="text" placeholder="Your company name" required />
              </FormField>
              <FormField>
                <FormLabel>Industry *</FormLabel>
                <FormSelect required>
                  <option value="">Select your industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Financial Services</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="education">Education</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </FormSelect>
              </FormField>
            </FormRow>
            
            <FormRow>
              <FormField>
                <FormLabel>Email Address *</FormLabel>
                <FormInput type="email" placeholder="your.email@company.com" required />
              </FormField>
              <FormField>
                <FormLabel>Phone Number</FormLabel>
                <FormInput type="tel" placeholder="+61 XXX XXX XXX" />
              </FormField>
            </FormRow>
            
            <FormField>
              <FormLabel>Company Size *</FormLabel>
              <FormSelect required>
                <option value="">Select company size</option>
                <option value="startup">Startup (1-10 employees)</option>
                <option value="small">Small Business (11-50 employees)</option>
                <option value="medium">Medium Business (51-200 employees)</option>
                <option value="large">Large Enterprise (200+ employees)</option>
              </FormSelect>
            </FormField>
            
            <FormField>
              <FormLabel>Consulting Area of Interest *</FormLabel>
              <FormSelect required>
                <option value="">Select primary interest</option>
                <option value="strategic">Strategic Business Consulting</option>
                <option value="digital">Digital Transformation</option>
                <option value="analytics">Data Analytics & BI</option>
                <option value="innovation">Innovation & Change Management</option>
                <option value="process">Process Optimization</option>
                <option value="performance">Performance Management</option>
                <option value="multiple">Multiple Areas</option>
              </FormSelect>
            </FormField>
            
            <FormField>
              <FormLabel>Project Description *</FormLabel>
              <FormTextarea 
                placeholder="Please describe your current challenges, objectives, and how we can help transform your business..."
                rows="5"
                required
              />
            </FormField>
            
            <FormField>
              <FormLabel>Preferred Timeline</FormLabel>
              <FormSelect>
                <option value="">Select timeline</option>
                <option value="immediate">Immediate (within 1 month)</option>
                <option value="short">Short-term (1-3 months)</option>
                <option value="medium">Medium-term (3-6 months)</option>
                <option value="long">Long-term (6+ months)</option>
                <option value="planning">Planning phase</option>
              </FormSelect>
            </FormField>
            
            <FormField>
              <FormLabel>Budget Range (Optional)</FormLabel>
              <FormSelect>
                <option value="">Select budget range</option>
                <option value="under50k">Under $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k-250k">$100,000 - $250,000</option>
                <option value="250k-500k">$250,000 - $500,000</option>
                <option value="500k-1m">$500,000 - $1,000,000</option>
                <option value="over1m">Over $1,000,000</option>
                <option value="discuss">Prefer to discuss</option>
              </FormSelect>
            </FormField>
            
            <SubmitButton type="submit">
              🚀 Request Free Consultation
            </SubmitButton>
            
            <FormDisclaimer>
              * Required fields. We respect your privacy and will never share your information. 
              You'll receive a response within 24 hours from our senior consulting team.
            </FormDisclaimer>
          </ConsultationForm>
        </ConsultationSection>
      </ContactContainer>
    </>
  );
};

export default Contact;