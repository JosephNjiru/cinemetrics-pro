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

// Multi-Service Configuration
const SERVICES_ENABLED = process.env.SERVICES_ENABLED?.split(',').map(s => s.trim()) || ['cinemetrics'];
const PRIMARY_SERVICE = process.env.PRIMARY_SERVICE || 'cinemetrics';
const RIGOUR_ENABLED = process.env.RIGOUR_CONSULTING_ENABLED === 'true';

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
    ? ['https://github.com/JosephNjiru/cinemetrics-pro', 'https://cinemetrics-pro.com']
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
    platform: PRIMARY_SERVICE === 'cinemetrics' 
      ? 'CineMetrics Pro: Advanced Film Intelligence & Awards Analytics Platform'
      : 'Multi-Service API Platform',
    creator: 'Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI',
    environment: process.env.NODE_ENV || 'development',
    services: {
      enabled: SERVICES_ENABLED,
      primary: PRIMARY_SERVICE,
      rigour_consulting: RIGOUR_ENABLED
    },
    tagline: PRIMARY_SERVICE === 'cinemetrics' 
      ? 'Where Cinema Meets Advanced Data Science'
      : `Professional Multi-Service Platform (${SERVICES_ENABLED.join(', ')})`
  });
});

// API Info endpoint - Multi-service support
app.get('/api', (req, res) => {
  const baseInfo = {
    services: SERVICES_ENABLED,
    primary_service: PRIMARY_SERVICE,
    version: '1.0.0',
    author: 'Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI',
    created: '2025-08-24',
    documentation: `${req.protocol}://${req.get('host')}/docs`,
    status: 'active',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };

  // Build endpoints based on enabled services
  const endpoints = {};
  
  if (SERVICES_ENABLED.includes('cinemetrics')) {
    endpoints.cinemetrics = {
      movies: '/api/cinemetrics/movies',
      awards: '/api/cinemetrics/awards',
      visualizations: '/api/cinemetrics/visualizations',
      auth: '/api/cinemetrics/auth'
    };
  }
  
  if (SERVICES_ENABLED.includes('rigour')) {
    endpoints.rigour = {
      services: '/api/rigour/services',
      consultations: '/api/rigour/consultations',
      team: '/api/rigour/team',
      auth: '/api/rigour/auth'
    };
  }

  // Legacy endpoints for backward compatibility
  if (PRIMARY_SERVICE === 'cinemetrics') {
    endpoints.legacy = {
      movies: '/api/movies',
      awards: '/api/awards',
      visualizations: '/api/visualizations',
      auth: '/api/auth'
    };
  }

  endpoints.common = {
    health: '/health',
    api: '/api'
  };

  res.json({
    name: PRIMARY_SERVICE === 'cinemetrics' ? 'CineMetrics Pro API' : 'Multi-Service API Platform',
    description: 'Multi-Service Backend Platform with CineMetrics Pro & Rigour Consulting',
    tagline: PRIMARY_SERVICE === 'cinemetrics' 
      ? 'Where Cinema Meets Advanced Data Science - The Ultimate Film Analytics Experience'
      : 'Professional Multi-Service API Platform',
    ...baseInfo,
    endpoints,
    features: {
      cinemetrics: SERVICES_ENABLED.includes('cinemetrics') ? [
        '50,000+ movies database',
        '95+ years of Oscar awards data',
        'ML-enhanced search algorithms',
        'Real-time analytics',
        'Advanced data visualizations',
        'Predictive award modeling'
      ] : [],
      rigour: SERVICES_ENABLED.includes('rigour') ? [
        'Professional consulting services',
        'Team management',
        'Client consultation booking',
        'Service portfolio management',
        'Expert consultation platform'
      ] : []
    }
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

// ===== NAMESPACED ENDPOINTS =====

// CineMetrics Pro - Namespaced endpoints
app.get('/api/cinemetrics/movies', (req, res) => {
  res.json({
    success: true,
    service: 'cinemetrics',
    message: 'CineMetrics Pro Movies API - Namespaced Endpoint',
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
        votes: 1800000,
        description: 'The aging patriarch of an organized crime dynasty transfers control.',
        awards: ['Best Picture', 'Best Adapted Screenplay', 'Best Actor'],
        budget: 6000000,
        usa_gross_income: 134966411,
        worldwide_gross_income: 245066411
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

app.get('/api/cinemetrics/awards', (req, res) => {
  res.json({
    success: true,
    service: 'cinemetrics',
    message: 'CineMetrics Pro Awards API - Namespaced Endpoint',
    data: [
      {
        year: 2024,
        category: 'BEST_PICTURE',
        winner: 'Oppenheimer',
        nominees: ['American Fiction', 'Anatomy of a Fall', 'Barbie', 'The Holdovers']
      },
      {
        year: 2023,
        category: 'BEST_PICTURE',
        winner: 'Everything Everywhere All at Once',
        nominees: ['Avatar: The Way of Water', 'The Banshees of Inisherin', 'Elvis', 'The Fabelmans']
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

// ===== RIGOUR CONSULTING ENDPOINTS =====

// Rigour Consulting - Services endpoint
app.get('/api/rigour/services', (req, res) => {
  if (!RIGOUR_ENABLED) {
    return res.status(404).json({
      error: 'Service not enabled',
      message: 'Rigour Consulting services are not enabled',
      code: 'SERVICE_DISABLED'
    });
  }
  
  res.json({
    success: true,
    service: 'rigour',
    message: 'Rigour Consulting Services API',
    platform: 'Professional Consulting Services Platform',
    data: {
      services: [
        {
          id: 'strategic-consulting',
          name: 'Strategic Consulting',
          description: 'Business strategy development and implementation guidance',
          duration: '3-6 months',
          category: 'Strategy',
          price_range: 'Enterprise',
          features: [
            'Market Analysis',
            'Competitive Intelligence',
            'Strategic Planning',
            'Implementation Roadmap'
          ]
        },
        {
          id: 'process-optimization',
          name: 'Process Optimization',
          description: 'Business process analysis and efficiency improvements',
          duration: '1-3 months',
          category: 'Operations',
          price_range: 'Professional',
          features: [
            'Process Mapping',
            'Bottleneck Analysis',
            'Workflow Optimization',
            'Performance Metrics'
          ]
        },
        {
          id: 'digital-transformation',
          name: 'Digital Transformation',
          description: 'Technology adoption and digital strategy consulting',
          duration: '6-12 months',
          category: 'Technology',
          price_range: 'Enterprise',
          features: [
            'Technology Assessment',
            'Digital Strategy',
            'Change Management',
            'Implementation Support'
          ]
        }
      ],
      categories: ['Strategy', 'Operations', 'Technology', 'Finance', 'HR'],
      consultation_types: ['One-time', 'Project-based', 'Retainer', 'Ongoing']
    },
    meta: {
      total_services: 3,
      available_categories: 5,
      consultation_formats: ['Remote', 'On-site', 'Hybrid']
    },
    timestamp: new Date().toISOString()
  });
});

// Rigour Consulting - Team endpoint
app.get('/api/rigour/team', (req, res) => {
  if (!RIGOUR_ENABLED) {
    return res.status(404).json({
      error: 'Service not enabled',
      message: 'Rigour Consulting services are not enabled',
      code: 'SERVICE_DISABLED'
    });
  }

  res.json({
    success: true,
    service: 'rigour',
    message: 'Rigour Consulting Team API',
    platform: 'Professional Consulting Services Platform',
    data: {
      team: [
        {
          id: 'lead-consultant',
          name: 'Senior Consultant',
          title: 'Lead Strategic Advisor',
          specializations: ['Strategy', 'Digital Transformation', 'Process Optimization'],
          experience_years: '10+',
          certifications: ['MBA', 'PMP', 'Six Sigma Black Belt'],
          bio: 'Experienced consultant with expertise in strategic planning and digital transformation',
          availability: 'Available'
        },
        {
          id: 'process-specialist',
          name: 'Process Specialist',
          title: 'Operations Consultant',
          specializations: ['Operations', 'Process Improvement', 'Quality Management'],
          experience_years: '8+',
          certifications: ['Lean Six Sigma', 'CISA', 'ITIL'],
          bio: 'Operations expert focused on process optimization and quality improvement',
          availability: 'Available'
        },
        {
          id: 'tech-advisor',
          name: 'Technology Advisor',
          title: 'Digital Transformation Lead',
          specializations: ['Technology', 'Digital Strategy', 'IT Governance'],
          experience_years: '12+',
          certifications: ['CISSP', 'TOGAF', 'Cloud Architecture'],
          bio: 'Technology leader specializing in digital transformation and IT strategy',
          availability: 'Limited'
        }
      ],
      expertise_areas: [
        'Strategic Planning',
        'Process Optimization',
        'Digital Transformation',
        'Change Management',
        'Risk Management',
        'Quality Assurance'
      ]
    },
    meta: {
      total_consultants: 3,
      available_consultants: 2,
      expertise_areas: 6
    },
    timestamp: new Date().toISOString()
  });
});

// Rigour Consulting - Consultations endpoint
app.get('/api/rigour/consultations', (req, res) => {
  if (!RIGOUR_ENABLED) {
    return res.status(404).json({
      error: 'Service not enabled',
      message: 'Rigour Consulting services are not enabled',
      code: 'SERVICE_DISABLED'
    });
  }

  res.json({
    success: true,
    service: 'rigour',
    message: 'Rigour Consulting Appointments API',
    platform: 'Professional Consulting Services Platform',
    data: {
      available_slots: [
        {
          date: '2025-08-26',
          time_slots: ['09:00', '11:00', '14:00', '16:00'],
          consultant: 'lead-consultant',
          duration: 60,
          type: 'initial_consultation'
        },
        {
          date: '2025-08-27',
          time_slots: ['10:00', '13:00', '15:00'],
          consultant: 'process-specialist',
          duration: 60,
          type: 'follow_up'
        }
      ],
      consultation_types: [
        {
          id: 'initial_consultation',
          name: 'Initial Consultation',
          description: 'Free 60-minute consultation to discuss your needs',
          duration: 60,
          price: 0,
          includes: ['Needs Assessment', 'Preliminary Recommendations', 'Service Overview']
        },
        {
          id: 'strategy_session',
          name: 'Strategy Session',
          description: 'In-depth strategic planning session',
          duration: 120,
          price: 500,
          includes: ['Strategic Analysis', 'Action Plan', 'Follow-up Report']
        },
        {
          id: 'process_review',
          name: 'Process Review',
          description: 'Comprehensive process analysis and optimization',
          duration: 90,
          price: 350,
          includes: ['Process Mapping', 'Gap Analysis', 'Improvement Recommendations']
        }
      ]
    },
    meta: {
      booking_window_days: 30,
      timezone: 'Australia/Sydney',
      booking_policies: [
        'Cancellation allowed up to 24 hours before appointment',
        'Rescheduling available with 48 hours notice',
        'Initial consultation is complimentary'
      ]
    },
    timestamp: new Date().toISOString()
  });
});

// POST endpoint for booking consultations
app.post('/api/rigour/consultations', (req, res) => {
  if (!RIGOUR_ENABLED) {
    return res.status(404).json({
      error: 'Service not enabled',
      message: 'Rigour Consulting services are not enabled',
      code: 'SERVICE_DISABLED'
    });
  }

  // This is a placeholder endpoint - in a real implementation, this would:
  // - Validate the booking data
  // - Check availability
  // - Create the booking in the database
  // - Send confirmation emails
  // - Integrate with calendar systems

  const { consultation_type, date, time, consultant_id, client_info } = req.body;

  res.status(201).json({
    success: true,
    service: 'rigour',
    message: 'Consultation booking created successfully',
    data: {
      booking_id: `RC-${Date.now()}`,
      consultation_type,
      date,
      time,
      consultant_id,
      status: 'confirmed',
      confirmation_code: `RC${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      meeting_details: {
        platform: 'Zoom',
        duration: '60 minutes',
        preparation_notes: 'Please prepare any relevant documents or questions in advance'
      }
    },
    next_steps: [
      'Check email for confirmation and meeting link',
      'Add appointment to your calendar',
      'Prepare any questions or documents for discussion'
    ],
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  // Build available endpoints based on enabled services
  const available_endpoints = ['/api', '/health'];
  
  if (SERVICES_ENABLED.includes('cinemetrics')) {
    available_endpoints.push(
      '/api/cinemetrics/movies',
      '/api/cinemetrics/awards'
    );
    
    // Add legacy endpoints if cinemetrics is primary service
    if (PRIMARY_SERVICE === 'cinemetrics') {
      available_endpoints.push('/api/movies', '/api/awards');
    }
  }
  
  if (SERVICES_ENABLED.includes('rigour')) {
    available_endpoints.push(
      '/api/rigour/services',
      '/api/rigour/team',
      '/api/rigour/consultations'
    );
  }

  res.status(404).json({
    error: 'Endpoint not found',
    message: `The requested endpoint ${req.originalUrl} was not found on the Multi-Service API Platform.`,
    code: 'ENDPOINT_NOT_FOUND',
    available_endpoints: available_endpoints.sort(),
    services_enabled: SERVICES_ENABLED,
    primary_service: PRIMARY_SERVICE,
    help: 'Visit /api for complete API documentation and available services',
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
  const serviceName = PRIMARY_SERVICE === 'cinemetrics' ? 'CineMetrics Pro' : 'Multi-Service Platform';
  const tagline = PRIMARY_SERVICE === 'cinemetrics' 
    ? 'Where Cinema Meets Advanced Data Science'
    : `Multi-Service API Platform (${SERVICES_ENABLED.join(', ')})`;

  console.log(`🎬 ${serviceName} Server is running!`);
  console.log(`📅 Started: ${new Date().toISOString()}`);
  console.log(`👤 Creator: Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 Services Enabled: ${SERVICES_ENABLED.join(', ')}`);
  console.log(`⭐ Primary Service: ${PRIMARY_SERVICE}`);
  console.log(`✨ Tagline: ${tagline}`);
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
