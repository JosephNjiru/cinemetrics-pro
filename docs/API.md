# 🎬 CineMetrics Pro API Documentation

**Advanced Film Intelligence & Awards Analytics Platform**  
**Created by:** Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI  
**Version:** 1.0.0  
**Last Updated:** 2025-08-24 14:53:30 UTC  

---

## 📚 Overview

CineMetrics Pro API provides comprehensive access to film data, awards analytics, and advanced cinema intelligence features. Our RESTful API serves over 50,000 movies and 95+ years of Academy Awards data with ML-enhanced search capabilities.

**Base URL:** Development: `http://localhost:5000/api/v1` | Demo: `https://github.com/JosephNjiru/cinemetrics-pro`  
**Documentation:** [Repository Documentation](https://github.com/JosephNjiru/cinemetrics-pro/blob/main/docs/)  

---

## 🔑 Authentication

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

---

## 🎭 Movies Endpoints

### Get All Movies
```http
GET /api/movies
```

**Parameters:**
- `page` (integer): Page number (default: 1)
- `limit` (integer): Results per page (default: 20, max: 100)
- `search` (string): Search query
- `genre` (string): Filter by genre
- `year` (integer): Filter by release year

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "imdb_title_id": "tt0111161",
      "title": "The Shawshank Redemption",
      "year": 1994,
      "genre": "Drama",
      "director": "Frank Darabont",
      "avg_vote": 9.3,
      "votes": 2500000,
      "awards": ["Best Cinematography"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50000,
    "pages": 2500
  }
}
```
---

## 🏆 Awards Endpoints

### Get Awards Data
```http
GET /api/awards
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "year": 2024,
      "category": "BEST_PICTURE",
      "winner": "Oppenheimer",
      "nominees": ["American Fiction", "Anatomy of a Fall"]
    }
  ],
  "analytics": {
    "total_ceremonies": 96,
    "prediction_accuracy": "91.7%"
  }
}
```

---

## 📊 Analytics Endpoints

### Get Visualizations
```http
GET /api/visualizations
```

---

## ⚡ Health Check

### System Status
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 86400,
  "creator": "Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)"
}
```

---

## 🚀 Rate Limits

- **Free Tier:** 1,000 requests/hour
- **Pro Tier:** 10,000 requests/hour
- **Enterprise:** Unlimited

---

## 💡 Examples

### Search Movies
```javascript
const response = await fetch('/api/movies?search=inception&year=2010');
const data = await response.json();
```

### Get Oscar Winners
```javascript
const response = await fetch('/api/awards?year=2024&category=BEST_PICTURE');
const data = await response.json();
```

---

**For detailed documentation, visit:** [CineMetrics Pro Documentation](https://github.com/JosephNjiru/cinemetrics-pro/tree/main/docs)
