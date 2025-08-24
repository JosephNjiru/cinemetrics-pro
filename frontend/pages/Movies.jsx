// CineMetrics Pro - Movies Page
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform
// Created: 2025-08-24 14:48:55 UTC

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../components/LoadingSpinner';

const MoviesContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const SearchSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: 3rem;
  
  h2 {
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text.primary};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MovieCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.small};
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const MovieInfo = styled.div`
  padding: 1.5rem;
  
  h3 {
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text.primary};
    font-size: 1.2rem;
  }
  
  .year {
    color: ${props => props.theme.colors.text.secondary};
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .genre {
    color: ${props => props.theme.colors.primary};
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    .star {
      color: #ffd700;
    }
    
    .score {
      font-weight: 600;
      color: ${props => props.theme.colors.text.primary};
    }
  }
  
  .description {
    font-size: 0.9rem;
    line-height: 1.5;
    color: ${props => props.theme.colors.text.secondary};
    margin-bottom: 1rem;
  }
  
  .awards {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    display: inline-block;
  }
`;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // In production, this would be a real API call
        const response = await fetch('/api/movies');
        if (response.ok) {
          const data = await response.json();
          setMovies(data.data || []);
        } else {
          // Fallback sample data
          setMovies([
            {
              imdb_title_id: 'tt0111161',
              title: 'The Shawshank Redemption',
              year: 1994,
              genre: 'Drama',
              country: 'USA',
              director: 'Frank Darabont',
              avg_vote: 9.3,
              votes: 2500000,
              description: 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.',
              awards: ['Best Cinematography', 'Best Sound Mixing']
            },
            {
              imdb_title_id: 'tt0068646',
              title: 'The Godfather',
              year: 1972,
              genre: 'Crime, Drama',
              country: 'USA',
              director: 'Francis Ford Coppola',
              avg_vote: 9.2,
              votes: 1700000,
              description: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
              awards: ['Best Picture', 'Best Actor', 'Best Adapted Screenplay']
            }
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        // Set sample data as fallback
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <MoviesContainer>
        <LoadingSpinner size="large" text="Loading CineMetrics Pro Movie Database..." />
      </MoviesContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>Movies Database - CineMetrics Pro: Advanced Film Intelligence</title>
        <meta name="description" content="Search and explore 50,000+ movies with advanced analytics, ratings, and comprehensive film data in CineMetrics Pro." />
      </Helmet>
      
      <MoviesContainer>
        <HeaderSection>
          <h1>🎭 Movies Database</h1>
          <p>
            Explore our comprehensive collection of 50,000+ movies with advanced search, 
            detailed analytics, and ML-enhanced recommendations.
          </p>
        </HeaderSection>

        <SearchSection>
          <h2>🔍 Advanced Movie Search</h2>
          <SearchInput
            type="text"
            placeholder="Search by title, genre, director, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchSection>

        {filteredMovies.length > 0 ? (
          <MoviesGrid>
            {filteredMovies.map(movie => (
              <MovieCard key={movie.imdb_title_id}>
                <MovieInfo>
                  <h3>{movie.title}</h3>
                  <div className="year">{movie.year} • {movie.country}</div>
                  <div className="genre">{movie.genre}</div>
                  
                  <div className="rating">
                    <span className="star">⭐</span>
                    <span className="score">{movie.avg_vote}/10</span>
                    <span>({movie.votes.toLocaleString()} votes)</span>
                  </div>
                  
                  <div className="description">{movie.description}</div>
                  
                  {movie.awards && movie.awards.length > 0 && (
                    <div className="awards">
                      🏆 {movie.awards.length} Award{movie.awards.length > 1 ? 's' : ''}
                    </div>
                  )}
                </MovieInfo>
              </MovieCard>
            ))}
          </MoviesGrid>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>No movies found</h3>
            <p>Try adjusting your search terms or check back later for more content.</p>
          </div>
        )}
      </MoviesContainer>
    </>
  );
};

export default Movies;
