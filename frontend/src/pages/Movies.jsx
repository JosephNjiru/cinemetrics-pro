// CineMetrics Pro - Movies Page
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const MoviesContainer = styled.div`
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

const SearchSection = styled.div`
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchButton = styled.button`
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 0.9rem;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const MovieCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const MoviePoster = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const MovieContent = styled.div`
  padding: 1.5rem;
`;

const MovieTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text.primary};
`;

const MovieMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const MovieRating = styled.span`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
`;

const MovieDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    genre: 'all',
    year: 'all',
    rating: 'all'
  });

  // Sample movie data
  useEffect(() => {
    const sampleMovies = [
      {
        id: 1,
        title: 'The Shawshank Redemption',
        year: 1994,
        genre: 'Drama',
        rating: 9.3,
        country: 'USA',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
      },
      {
        id: 2,
        title: 'The Godfather',
        year: 1972,
        genre: 'Crime',
        rating: 9.2,
        country: 'USA',
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
      },
      {
        id: 3,
        title: 'The Dark Knight',
        year: 2008,
        genre: 'Action',
        rating: 9.0,
        country: 'USA',
        description: 'When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests.'
      },
      {
        id: 4,
        title: 'Pulp Fiction',
        year: 1994,
        genre: 'Crime',
        rating: 8.9,
        country: 'USA',
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.'
      },
      {
        id: 5,
        title: 'Forrest Gump',
        year: 1994,
        genre: 'Drama',
        rating: 8.8,
        country: 'USA',
        description: 'The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.'
      },
      {
        id: 6,
        title: 'Inception',
        year: 2010,
        genre: 'Sci-Fi',
        rating: 8.8,
        country: 'USA',
        description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.'
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setMovies(sampleMovies);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = () => {
    // In a real app, this would trigger an API call
    console.log('Searching for:', searchTerm, 'with filters:', filters);
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filters.genre === 'all' || movie.genre === filters.genre;
    const matchesYear = filters.year === 'all' || movie.year.toString() === filters.year;
    const matchesRating = filters.rating === 'all' || 
      (filters.rating === 'high' && movie.rating >= 9) ||
      (filters.rating === 'medium' && movie.rating >= 8 && movie.rating < 9) ||
      (filters.rating === 'low' && movie.rating < 8);
    
    return matchesSearch && matchesGenre && matchesYear && matchesRating;
  });

  return (
    <>
      <Helmet>
        <title>Movies Database - CineMetrics Pro</title>
        <meta name="description" content="Explore our comprehensive database of 50,000+ movies with advanced search and filtering capabilities" />
        <meta name="keywords" content="movies, film database, movie search, cinema, film analytics" />
      </Helmet>
      
      <MoviesContainer>
        <Header>
          <Title>🎭 Movies Database</Title>
          <Subtitle>Explore 50,000+ Movies with Advanced Analytics</Subtitle>
        </Header>

        <SearchSection>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="Search movies by title, director, or actor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <SearchButton onClick={handleSearch}>
              🔍 Search
            </SearchButton>
          </SearchBox>

          <FilterGrid>
            <FilterSelect 
              value={filters.genre}
              onChange={(e) => setFilters({...filters, genre: e.target.value})}
            >
              <option value="all">All Genres</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Crime">Crime</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Comedy">Comedy</option>
            </FilterSelect>

            <FilterSelect 
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
            >
              <option value="all">All Years</option>
              <option value="2020">2020s</option>
              <option value="2010">2010s</option>
              <option value="2000">2000s</option>
              <option value="1990">1990s</option>
              <option value="1980">1980s</option>
            </FilterSelect>

            <FilterSelect 
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
            >
              <option value="all">All Ratings</option>
              <option value="high">9.0+ Stars</option>
              <option value="medium">8.0-8.9 Stars</option>
              <option value="low">Below 8.0</option>
            </FilterSelect>
          </FilterGrid>
        </SearchSection>

        {loading ? (
          <LoadingMessage>
            🎬 Loading movies from our comprehensive database...
          </LoadingMessage>
        ) : (
          <MoviesGrid>
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id}>
                <MoviePoster>🎬</MoviePoster>
                <MovieContent>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieMeta>
                    <span>{movie.year} • {movie.genre}</span>
                    <MovieRating>⭐ {movie.rating}</MovieRating>
                  </MovieMeta>
                  <MovieDescription>{movie.description}</MovieDescription>
                </MovieContent>
              </MovieCard>
            ))}
          </MoviesGrid>
        )}

        {!loading && filteredMovies.length === 0 && (
          <LoadingMessage>
            No movies found matching your criteria. Try adjusting your search or filters.
          </LoadingMessage>
        )}
      </MoviesContainer>
    </>
  );
};

export default Movies;