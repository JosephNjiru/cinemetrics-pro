// CineMetrics Pro - Awards Page
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const AwardsContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.secondary};
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: ${props => props.theme.colors.background.gradient};
  color: white;
  border-radius: ${props => props.theme.borderRadius};
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const AnalyticsCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardContent = styled.div`
  color: ${props => props.theme.colors.text.secondary};
`;

const YearSelector = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const YearSelect = styled.select`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  background: white;
  min-width: 200px;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const AwardsSection = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CategorySection = styled.div`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
`;

const WinnerCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.medium};
  border-left: 5px solid ${props => props.theme.colors.accent};
  margin-bottom: 1.5rem;
`;

const WinnerTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WinnerDetails = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

const NomineesList = styled.div`
  margin-top: 1rem;
`;

const NomineeItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text.secondary};
  
  &:last-child {
    border-bottom: none;
  }
`;

const PredictionBadge = styled.span`
  background: ${props => props.theme.colors.success};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const Awards = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalCeremonies: 96,
    predictionAccuracy: '91.7%',
    categoriesAnalyzed: 24,
    yearsOfData: 95
  });

  // Sample awards data
  useEffect(() => {
    const sampleAwards = [
      {
        category: 'Best Picture',
        winner: {
          title: 'Oppenheimer',
          director: 'Christopher Nolan',
          year: 2023,
          predicted: true
        },
        nominees: [
          'American Fiction',
          'Anatomy of a Fall', 
          'Barbie',
          'The Holdovers',
          'Killers of the Flower Moon',
          'Maestro',
          'Past Lives',
          'Poor Things',
          'The Zone of Interest'
        ]
      },
      {
        category: 'Best Director',
        winner: {
          title: 'Christopher Nolan - Oppenheimer',
          year: 2023,
          predicted: true
        },
        nominees: [
          'Justine Triet - Anatomy of a Fall',
          'Martin Scorsese - Killers of the Flower Moon',
          'Jonathan Glazer - The Zone of Interest',
          'Yorgos Lanthimos - Poor Things'
        ]
      },
      {
        category: 'Best Actor',
        winner: {
          title: 'Cillian Murphy - Oppenheimer',
          year: 2023,
          predicted: false
        },
        nominees: [
          'Bradley Cooper - Maestro',
          'Colman Domingo - Rustin',
          'Paul Giamatti - The Holdovers',
          'Jeffrey Wright - American Fiction'
        ]
      },
      {
        category: 'Best Actress',
        winner: {
          title: 'Emma Stone - Poor Things',
          year: 2023,
          predicted: true
        },
        nominees: [
          'Annette Bening - Nyad',
          'Lily Gladstone - Killers of the Flower Moon',
          'Sandra Hüller - Anatomy of a Fall',
          'Carey Mulligan - Maestro'
        ]
      }
    ];

    setTimeout(() => {
      setAwards(sampleAwards);
      setLoading(false);
    }, 1000);
  }, [selectedYear]);

  return (
    <>
      <Helmet>
        <title>Awards Analytics - CineMetrics Pro</title>
        <meta name="description" content="Comprehensive Oscar and film awards analytics with 95+ years of data and ML-powered predictions" />
        <meta name="keywords" content="oscar awards, academy awards, film awards, awards prediction, cinema analytics" />
      </Helmet>
      
      <AwardsContainer>
        <Header>
          <Title>🏆 Awards Analytics</Title>
          <Subtitle>95+ Years of Oscar Data with ML-Powered Predictions</Subtitle>
        </Header>

        <AnalyticsGrid>
          <AnalyticsCard>
            <CardTitle>
              <span>📊</span>
              Analytics Overview
            </CardTitle>
            <CardContent>
              <p><strong>Total Ceremonies:</strong> {analytics.totalCeremonies}</p>
              <p><strong>Prediction Accuracy:</strong> {analytics.predictionAccuracy}</p>
              <p><strong>Categories Analyzed:</strong> {analytics.categoriesAnalyzed}</p>
              <p><strong>Years of Data:</strong> {analytics.yearsOfData}</p>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardTitle>
              <span>🎯</span>
              Prediction Model
            </CardTitle>
            <CardContent>
              <p>Our advanced machine learning model analyzes historical patterns, critical reception, box office performance, and industry trends to predict award winners with industry-leading accuracy.</p>
            </CardContent>
          </AnalyticsCard>
          
          <AnalyticsCard>
            <CardTitle>
              <span>📈</span>
              Historical Insights
            </CardTitle>
            <CardContent>
              <p>Discover trends and patterns across nearly a century of Academy Awards, from genre preferences to directorial styles that resonate with voters.</p>
            </CardContent>
          </AnalyticsCard>
        </AnalyticsGrid>

        <YearSelector>
          <YearSelect 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2024">2024 Ceremony</option>
            <option value="2023">2023 Ceremony</option>
            <option value="2022">2022 Ceremony</option>
            <option value="2021">2021 Ceremony</option>
            <option value="2020">2020 Ceremony</option>
          </YearSelect>
        </YearSelector>

        <AwardsSection>
          {loading ? (
            <LoadingMessage>
              🏆 Loading awards data and predictions...
            </LoadingMessage>
          ) : (
            <CategorySection>
              <CategoryTitle>🏆 {selectedYear} Academy Awards</CategoryTitle>
              
              {awards.map((award, index) => (
                <WinnerCard key={index}>
                  <WinnerTitle>
                    <span>👑</span>
                    {award.category}
                    {award.winner.predicted && <PredictionBadge>Predicted ✓</PredictionBadge>}
                  </WinnerTitle>
                  <WinnerDetails>
                    <strong>Winner:</strong> {award.winner.title}
                  </WinnerDetails>
                  
                  <NomineesList>
                    <strong>Other Nominees:</strong>
                    {award.nominees.map((nominee, idx) => (
                      <NomineeItem key={idx}>• {nominee}</NomineeItem>
                    ))}
                  </NomineesList>
                </WinnerCard>
              ))}
            </CategorySection>
          )}
        </AwardsSection>
      </AwardsContainer>
    </>
  );
};

export default Awards;