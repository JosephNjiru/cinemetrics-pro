// CineMetrics Pro - Mock Data Service
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform - Demo Data

// Sample movies data for demo mode
export const mockMovies = [
  {
    imdb_title_id: 'tt0111161',
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: 'Drama',
    country: 'USA',
    language: 'English',
    director: 'Frank Darabont',
    writer: 'Stephen King, Frank Darabont',
    production_company: 'Columbia Pictures',
    actors: 'Tim Robbins, Morgan Freeman',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    avg_vote: 9.3,
    votes: 2343110,
    budget: 25000000,
    usa_gross_income: 16000000,
    worlwide_gross_income: 16000000,
    metascore: 80,
    reviews_from_users: 319.0,
    reviews_from_critics: 23.0
  },
  {
    imdb_title_id: 'tt0468569',
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action, Crime, Drama',
    country: 'USA, UK',
    language: 'English, Mandarin',
    director: 'Christopher Nolan',
    writer: 'Jonathan Nolan, Christopher Nolan',
    production_company: 'Warner Bros.',
    actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    avg_vote: 9.0,
    votes: 2303232,
    budget: 185000000,
    usa_gross_income: 534858444,
    worlwide_gross_income: 1004934033,
    metascore: 84,
    reviews_from_users: 3576.0,
    reviews_from_critics: 152.0
  },
  {
    imdb_title_id: 'tt0816692',
    title: 'Interstellar',
    year: 2014,
    genre: 'Adventure, Drama, Sci-Fi',
    country: 'USA, UK',
    language: 'English',
    director: 'Christopher Nolan',
    writer: 'Jonathan Nolan, Christopher Nolan',
    production_company: 'Paramount Pictures',
    actors: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    avg_vote: 8.6,
    votes: 1534777,
    budget: 165000000,
    usa_gross_income: 188020017,
    worlwide_gross_income: 677471339,
    metascore: 74,
    reviews_from_users: 2702.0,
    reviews_from_critics: 124.0
  },
  {
    imdb_title_id: 'tt0110912',
    title: 'Pulp Fiction',
    year: 1994,
    genre: 'Crime, Drama',
    country: 'USA',
    language: 'English, Spanish, French',
    director: 'Quentin Tarantino',
    writer: 'Quentin Tarantino, Roger Avary',
    production_company: 'Miramax',
    actors: 'John Travolta, Uma Thurman, Samuel L. Jackson',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    avg_vote: 8.9,
    votes: 1795442,
    budget: 8000000,
    usa_gross_income: 107928762,
    worlwide_gross_income: 214179088,
    metascore: 94,
    reviews_from_users: 1139.0,
    reviews_from_critics: 24.0
  },
  {
    imdb_title_id: 'tt0109830',
    title: 'Forrest Gump',
    year: 1994,
    genre: 'Drama, Romance',
    country: 'USA',
    language: 'English',
    director: 'Robert Zemeckis',
    writer: 'Winston Groom, Eric Roth',
    production_company: 'Paramount Pictures',
    actors: 'Tom Hanks, Robin Wright, Gary Sinise',
    description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    avg_vote: 8.8,
    votes: 1785935,
    budget: 55000000,
    usa_gross_income: 330252182,
    worlwide_gross_income: 677387716,
    metascore: 82,
    reviews_from_users: 1775.0,
    reviews_from_critics: 20.0
  }
];

// Sample awards data
export const mockAwards = [
  {
    year_film: 1995,
    year_ceremony: 1995,
    ceremony: 67,
    category: 'Best Picture',
    name: 'Forrest Gump',
    film: 'Forrest Gump',
    winner: true,
    imdb_title_id: 'tt0109830'
  },
  {
    year_film: 1994,
    year_ceremony: 1995,
    ceremony: 67,
    category: 'Best Actor',
    name: 'Tom Hanks',
    film: 'Forrest Gump',
    winner: true,
    imdb_title_id: 'tt0109830'
  },
  {
    year_film: 1994,
    year_ceremony: 1995,
    ceremony: 67,
    category: 'Best Director',
    name: 'Robert Zemeckis',
    film: 'Forrest Gump',
    winner: true,
    imdb_title_id: 'tt0109830'
  },
  {
    year_film: 1994,
    year_ceremony: 1995,
    ceremony: 67,
    category: 'Best Picture',
    name: 'Pulp Fiction',
    film: 'Pulp Fiction',
    winner: false,
    imdb_title_id: 'tt0110912'
  },
  {
    year_film: 1994,
    year_ceremony: 1995,
    ceremony: 67,
    category: 'Best Original Screenplay',
    name: 'Quentin Tarantino, Roger Avary',
    film: 'Pulp Fiction',
    winner: true,
    imdb_title_id: 'tt0110912'
  }
];

// Mock API service
export const mockApiService = {
  // Health check - always returns healthy for demo
  async checkHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Math.random() * 1000,
      memory: {
        rss: 57319424,
        heapTotal: 8626176,
        heapUsed: 7469048,
        external: 2044052,
        arrayBuffers: 16619
      },
      version: '1.0.0',
      platform: 'CineMetrics Pro: Advanced Film Intelligence & Awards Analytics Platform',
      creator: 'Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI',
      environment: 'demo',
      tagline: 'Where Cinema Meets Advanced Data Science'
    };
  },

  // API info
  async getApiInfo() {
    return {
      name: 'CineMetrics Pro API (Demo Mode)',
      description: 'Advanced Film Intelligence & Awards Analytics Platform',
      tagline: 'Where Cinema Meets Advanced Data Science - The Ultimate Film Analytics Experience',
      version: '1.0.0',
      author: 'Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI',
      created: '2025-08-24',
      mode: 'demo',
      endpoints: {
        movies: '/api/movies',
        awards: '/api/movies/awards',
        visualizations: '/api/visualizations',
        auth: '/api/auth',
        health: '/health'
      },
      features: [
        'Sample movies database (5 featured films)',
        'Oscar awards data demonstration',
        'Demo-ready analytics',
        'Offline-first experience',
        'Advanced data visualizations',
        'Educational film analytics'
      ],
      status: 'demo-active',
      uptime: Math.random() * 1000,
      timestamp: new Date().toISOString()
    };
  },

  // Get movies
  async getMovies(limit = 5) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
    
    return {
      success: true,
      message: 'CineMetrics Pro Movies API - Demo Data',
      platform: 'Advanced Film Intelligence & Awards Analytics Platform (Demo Mode)',
      data: mockMovies.slice(0, limit),
      total: mockMovies.length,
      mode: 'demo'
    };
  },

  // Get awards
  async getAwards() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
    
    return {
      success: true,
      message: 'CineMetrics Pro Awards API - Demo Data',
      platform: 'Advanced Film Intelligence & Awards Analytics Platform (Demo Mode)',
      data: mockAwards,
      total: mockAwards.length,
      mode: 'demo'
    };
  },

  // Search movies
  async searchMovies(query) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 150));
    
    const results = mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.director.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase())
    );

    return {
      success: true,
      message: `Search results for: "${query}" (Demo Mode)`,
      platform: 'Advanced Film Intelligence & Awards Analytics Platform (Demo Mode)',
      data: results,
      total: results.length,
      query,
      mode: 'demo'
    };
  }
};

// Statistics for dashboard
export const mockDashboardStats = {
  totalMovies: 5,
  totalAwards: 5,
  avgRating: 8.82,
  totalRevenue: 2040000000,
  topGenres: [
    { name: 'Drama', count: 4 },
    { name: 'Crime', count: 2 },
    { name: 'Action', count: 1 },
    { name: 'Sci-Fi', count: 1 },
    { name: 'Adventure', count: 1 }
  ],
  yearlyTrends: [
    { year: 1994, movies: 3, revenue: 1019000000 },
    { year: 2008, movies: 1, revenue: 1004934033 },
    { year: 2014, movies: 1, revenue: 677471339 }
  ],
  topDirectors: [
    { name: 'Christopher Nolan', movies: 2 },
    { name: 'Quentin Tarantino', movies: 1 },
    { name: 'Frank Darabont', movies: 1 },
    { name: 'Robert Zemeckis', movies: 1 }
  ]
};

export default mockApiService;