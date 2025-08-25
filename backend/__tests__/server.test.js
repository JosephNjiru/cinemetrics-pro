const request = require('supertest');
const express = require('express');

// Mock environment variables for testing
process.env.SERVICES_ENABLED = 'cinemetrics,rigour';
process.env.PRIMARY_SERVICE = 'cinemetrics';
process.env.RIGOUR_CONSULTING_ENABLED = 'true';
process.env.NODE_ENV = 'test';

// Import the server after setting environment variables
const app = require('../server');

describe('Multi-Service API Tests', () => {
  
  describe('Health Check', () => {
    it('should return healthy status with service information', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body.status).toBe('healthy');
      expect(response.body.services).toBeDefined();
      expect(response.body.services.enabled).toContain('cinemetrics');
      expect(response.body.services.enabled).toContain('rigour');
      expect(response.body.services.primary).toBe('cinemetrics');
    });
  });

  describe('API Documentation', () => {
    it('should return multi-service API information', async () => {
      const response = await request(app)
        .get('/api')
        .expect(200);
      
      expect(response.body.services).toContain('cinemetrics');
      expect(response.body.services).toContain('rigour');
      expect(response.body.primary_service).toBe('cinemetrics');
      expect(response.body.endpoints.cinemetrics).toBeDefined();
      expect(response.body.endpoints.rigour).toBeDefined();
    });
  });

  describe('CineMetrics Endpoints', () => {
    it('should serve legacy movies endpoint', async () => {
      const response = await request(app)
        .get('/api/movies')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should serve namespaced movies endpoint', async () => {
      const response = await request(app)
        .get('/api/cinemetrics/movies')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.service).toBe('cinemetrics');
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should serve awards endpoint', async () => {
      const response = await request(app)
        .get('/api/awards')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('Rigour Consulting Endpoints', () => {
    it('should serve services endpoint', async () => {
      const response = await request(app)
        .get('/api/rigour/services')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.service).toBe('rigour');
      expect(response.body.data.services).toBeDefined();
      expect(Array.isArray(response.body.data.services)).toBe(true);
    });

    it('should serve team endpoint', async () => {
      const response = await request(app)
        .get('/api/rigour/team')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.service).toBe('rigour');
      expect(response.body.data.team).toBeDefined();
      expect(Array.isArray(response.body.data.team)).toBe(true);
    });

    it('should serve consultations endpoint', async () => {
      const response = await request(app)
        .get('/api/rigour/consultations')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.service).toBe('rigour');
      expect(response.body.data.available_slots).toBeDefined();
      expect(Array.isArray(response.body.data.available_slots)).toBe(true);
    });

    it('should accept consultation bookings', async () => {
      const bookingData = {
        consultation_type: 'initial_consultation',
        date: '2025-08-26',
        time: '09:00',
        consultant_id: 'lead-consultant',
        client_info: {
          name: 'Test Client',
          email: 'test@example.com'
        }
      };

      const response = await request(app)
        .post('/api/rigour/consultations')
        .send(bookingData)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.service).toBe('rigour');
      expect(response.body.data.booking_id).toBeDefined();
      expect(response.body.data.confirmation_code).toBeDefined();
      expect(response.body.data.status).toBe('confirmed');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);
      
      expect(response.body.error).toBe('Endpoint not found');
      expect(response.body.services_enabled).toContain('cinemetrics');
      expect(response.body.services_enabled).toContain('rigour');
      expect(response.body.available_endpoints).toBeDefined();
    });
  });
});