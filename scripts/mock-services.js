#!/usr/bin/env node

/**
 * CineMetrics Pro - Mock Services Script
 * Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)
 * 
 * This script creates a simple mock server for external services
 * to prevent firewall blocking during development and testing
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a simple mock server for external services
const server = http.createServer((req, res) => {
  console.log(`Mock request to: ${req.url}`);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Mock responses for blocked services
  if (req.url.includes('snyk') || req.url.includes('sentry') || req.url.includes('scarf')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'disabled', 
      message: 'Service disabled for firewall compliance',
      service: 'CineMetrics Pro Mock Service'
    }));
    return;
  }
  
  // Default mock response
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    status: 'ok', 
    message: 'CineMetrics Pro Mock Service',
    timestamp: new Date().toISOString(),
    author: 'Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)'
  }));
});

const PORT = process.env.MOCK_PORT || 8080;

const startMockServer = () => {
  server.listen(PORT, () => {
    console.log(`🎭 CineMetrics Pro Mock Service running on port ${PORT}`);
    console.log('🚫 Blocking external service calls for firewall compliance');
    console.log('✅ Mock responses provided for Snyk, Sentry, and Scarf.sh');
  });
};

const stopMockServer = () => {
  server.close(() => {
    console.log('🛑 CineMetrics Pro Mock Service stopped');
  });
};

module.exports = {
  startMockServer,
  stopMockServer,
  server
};

// Run server if called directly
if (require.main === module) {
  startMockServer();
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down CineMetrics Pro Mock Service...');
    stopMockServer();
    process.exit(0);
  });
}