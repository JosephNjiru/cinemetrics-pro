// CineMetrics Pro - React Entry Point
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform
// Created: 2025-08-24 14:40:59 UTC

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { reportWebVitals } from './utils/reportWebVitals';

// Performance monitoring
const measurePerformance = (metric) => {
  console.log('🚀 CineMetrics Pro Performance:', metric);
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Analytics integration would go here
    // Example: gtag('event', 'web_vitals', { metric });
  }
};

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Start measuring performance
reportWebVitals(measurePerformance);

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('🎬 CineMetrics Pro SW registered:', registration.scope);
      })
      .catch((registrationError) => {
        console.log('SW registration failed:', registrationError);
      });
  });
}

// App metadata logging
console.log(`
🎬 CineMetrics Pro: Advanced Film Intelligence & Awards Analytics Platform
📅 Built: ${new Date().toISOString()}
👤 Created by: Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
✨ Tagline: Where Cinema Meets Advanced Data Science
🌐 Environment: ${process.env.NODE_ENV || 'development'}
⚛️ React Version: ${React.version}
`);
