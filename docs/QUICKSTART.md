# 🎬 CineMetrics Pro - Quick Start Guide

**Advanced Film Intelligence & Awards Analytics Platform**  
*By Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI*

## 🚀 Quick Start with Docker Compose

### Prerequisites
- Docker & Docker Compose installed
- Git
- 4GB RAM minimum
- Port 80 and database ports available

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/JosephNjiru/cinemetrics-pro.git
cd cinemetrics-pro

# Copy environment template
cp .env.example .env
```

### 2. Configure Environment
Edit `.env` file with your values:
```bash
# Required: Update these values
MYSQL_ROOT_PASSWORD=your_secure_root_password
DB_PASSWORD=your_secure_db_password
JWT_SECRET=your_jwt_secret_minimum_32_characters

# Optional: Add API keys for full functionality
TMDB_API_KEY=your_tmdb_api_key
OMDB_API_KEY=your_omdb_api_key
```

### 3. Start Services
```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up --build -d
```

### 4. Access Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **Health Check**: http://localhost/health

### 5. Verify Installation
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Test API health
curl http://localhost/health
```

## 🔧 Development Mode

### Frontend Development
```bash
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

### Backend Development
```bash
cd backend
npm install
npm run dev  # Runs with nodemon on port 5000
```

## 🛠 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using port 80
sudo netstat -tulpn | grep :80
# Update ports in .env if needed
```

**Database connection issues:**
```bash
# Reset database
docker-compose down -v
docker-compose up --build
```

**Build failures:**
```bash
# Clean rebuild
docker-compose down
docker system prune -f
docker-compose up --build
```

### Health Checks
```bash
# Backend health
curl http://localhost/api/health

# Frontend health  
curl http://localhost/health

# Database health
docker-compose exec db mysqladmin ping -h localhost -u root -p
```

## 📚 Next Steps

1. **Configure API Keys**: Add TMDB and OMDB keys for full movie data
2. **Database Migration**: Run any required database migrations
3. **SSL Setup**: Configure SSL certificates for production
4. **Monitoring**: Set up logging and monitoring
5. **Backup**: Configure database backup strategy

## 🆘 Support

- **Issues**: https://github.com/JosephNjiru/cinemetrics-pro/issues
- **Documentation**: Check the main README.md
- **Contact**: joseph@cinemetrics-pro.com

---

*"Where Cinema Meets Advanced Data Science" - CineMetrics Pro v1.0.0*