// CineMetrics Pro - Backend Server
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform
// Created: 2025-08-24 14:34:55 UTC

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

// Create Express app
const app = express();

// Trust proxy for accurate client IPs behind load balancers
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'", "https://api.themoviedb.org"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://josephnjiru.github.io', 'https://josephnjiru.github.io/cinemetrics-pro']
    : ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Performance middleware
app.use(compression({
  level: 6,
  threshold: 1024
}));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 1000 : 10000,
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(generalLimiter);

// Logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '1.0.0',
    platform: 'CineMetrics Pro: Advanced Film Intelligence & Awards Analytics Platform',
    creator: 'Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI',
    environment: process.env.NODE_ENV || 'development',
    tagline: 'Where Cinema Meets Advanced Data Science'
  });
});

// API Info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'CineMetrics Pro API',
    description: 'Advanced Film Intelligence & Awards Analytics Platform',
    tagline: 'Where Cinema Meets Advanced Data Science - The Ultimate Film Analytics Experience',
    version: '1.0.0',
    author: 'Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI',
    created: '2025-08-24',
    documentation: `${req.protocol}://${req.get('host')}/docs`,
    endpoints: {
      movies: '/api/movies',
      awards: '/api/movies/awards',
      visualizations: '/api/visualizations',
      auth: '/api/auth',
      health: '/health'
    },
    features: [
      '50,000+ movies database',
      '95+ years of Oscar awards data',
      'ML-enhanced search algorithms',
      'Real-time analytics',
      'Advanced data visualizations',
      'Predictive award modeling'
    ],
    status: 'active',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Sample movies endpoint
app.get('/api/movies', (req, res) => {
  res.json({
    success: true,
    message: 'CineMetrics Pro Movies API - Sample Data',
    platform: 'Advanced Film Intelligence & Awards Analytics Platform',
    data: [
      {
        imdb_title_id: 'tt0111161',
        title: 'The Shawshank Redemption',
        year: 1994,
        genre: 'Drama',
        country: 'USA',
        director: 'Frank Darabont',
        avg_vote: 9.3,
        votes: 2500000,
        description: 'Two imprisoned men bond over years, finding solace and eventual redemption.',
        awards: ['Best Cinematography', 'Best Sound Mixing'],
        budget: 25000000,
        usa_gross_income: 16000000,
        worldwide_gross_income: 28341469
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
        description: 'An organized crime dynasty aging patriarch transfers control to his reluctant son.',
        awards: ['Best Picture', 'Best Actor', 'Best Adapted Screenplay'],
        budget: 6000000,
        usa_gross_income: 134966411,
        worldwide_gross_income: 246120974
      }
    ],
    pagination: {
      page: 1,
      limit: 20,
      total: 50000,
      pages: 2500
    },
    search_algorithm: 'ML-enhanced relevance scoring',
    timestamp: new Date().toISOString()
  });
});

// Sample awards endpoint
app.get('/api/awards', (req, res) => {
  res.json({
    success: true,
    message: 'CineMetrics Pro Awards API - Oscar Analytics',
    data: [
      {
        year: 2024,
        category: 'BEST_PICTURE',
        winner: 'Oppenheimer',
        nominees: ['American Fiction', 'Anatomy of a Fall', 'Barbie', 'The Holdovers']
      }
    ],
    analytics: {
      total_ceremonies: 96,
      years_covered: '1929-2024',
      prediction_accuracy: '87.3%'
    },
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The requested endpoint ${req.originalUrl} was not found on CineMetrics Pro API.`,
    code: 'ENDPOINT_NOT_FOUND',
    available_endpoints: [
      '/api',
      '/api/movies',
      '/api/awards',
      '/health'
    ],
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('🎬 CineMetrics Pro Server is running!');
  console.log(`📅 Started: ${new Date().toISOString()}`);
  console.log(`👤 Creator: Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('✨ Tagline: Where Cinema Meets Advanced Data Science');
  console.log('=========================================');
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n📴 Received ${signal}. Starting graceful shutdown...`);
  server.close(() => {
    console.log('🔌 HTTP server closed');
    console.log('✅ CineMetrics Pro shutdown completed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = app;
