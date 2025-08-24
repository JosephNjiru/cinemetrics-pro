# CineMetrics Pro - Backend Dockerfile
# Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
# Advanced Film Intelligence & Awards Analytics Platform
# Simple Node.js production image

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --silent && npm cache clean --force

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S cinemetrics -u 1001 -G nodejs && \
    chown -R cinemetrics:nodejs /app

USER cinemetrics

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]