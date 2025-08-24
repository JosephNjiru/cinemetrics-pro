// CineMetrics Pro - API Service with Fallback Support
// Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science), MEd, GD Stat, GC HigherEd, GC-GEOSPI
// Advanced Film Intelligence & Awards Analytics Platform - Smart API Handler

import mockApiService from './mockData';

class ApiService {
  constructor() {
    // Determine API URL based on environment
    this.baseURL = process.env.REACT_APP_API_URL || 
      (process.env.NODE_ENV === 'production' 
        ? ''  // No API in production, will use demo mode
        : 'http://localhost:5000'  // Development API
      );
    
    this.timeout = parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000;
    this.retryCount = parseInt(process.env.REACT_APP_API_RETRY_COUNT) || 2;
    this.isOnline = navigator.onLine;
    
    // Check if demo mode is forced (for production deployments without backend)
    this.demoMode = process.env.REACT_APP_FORCE_DEMO_MODE === 'true' || !this.baseURL;
    
    if (this.demoMode) {
      console.log('🎭 Demo mode enabled by configuration');
    }
    
    // Listen for online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      if (!process.env.REACT_APP_FORCE_DEMO_MODE) {
        console.log('🌐 CineMetrics Pro: Back online - attempting to reconnect to API');
      }
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('📱 CineMetrics Pro: Offline mode - switching to demo data');
    });
  }

  // Enhanced fetch with timeout, retry, and fallback
  async fetchWithFallback(url, options = {}, retries = this.retryCount) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const fetchOptions = {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Handle different types of errors
      if (error.name === 'AbortError') {
        console.warn(`⏱️ API request timeout for ${url}`);
      } else if (!this.isOnline) {
        console.warn('📱 Offline - using demo data');
      } else {
        console.warn(`🚨 API Error for ${url}:`, error.message);
      }

      // Retry logic for network errors (not for 4xx/5xx)
      if (retries > 0 && (error.name === 'AbortError' || error.name === 'TypeError')) {
        console.log(`🔄 Retrying API request... (${this.retryCount - retries + 1}/${this.retryCount})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (this.retryCount - retries + 1)));
        return this.fetchWithFallback(url, options, retries - 1);
      }
      
      // If all retries failed, switch to demo mode
      if (!this.demoMode) {
        console.log('🎭 Switching to demo mode due to API connectivity issues');
        this.demoMode = true;
      }
      
      throw error;
    }
  }

  // Health check with smart fallback
  async checkHealth() {
    try {
      if (this.demoMode || !this.isOnline) {
        return await mockApiService.checkHealth();
      }
      
      const response = await this.fetchWithFallback(`${this.baseURL}/health`);
      console.log('✅ API Health Check: Connected to live backend');
      this.demoMode = false; // Reset demo mode if API is working
      return response;
    } catch (error) {
      console.warn('⚠️ Live API unavailable, using demo mode:', error.message);
      return await mockApiService.checkHealth();
    }
  }

  // Get API info with fallback
  async getApiInfo() {
    try {
      if (this.demoMode || !this.isOnline) {
        return await mockApiService.getApiInfo();
      }
      
      const response = await this.fetchWithFallback(`${this.baseURL}/api`);
      console.log('📊 API Info: Connected to live backend');
      return response;
    } catch (error) {
      console.warn('⚠️ Using demo API info:', error.message);
      return await mockApiService.getApiInfo();
    }
  }

  // Get movies with fallback
  async getMovies(limit = 20) {
    try {
      if (this.demoMode || !this.isOnline) {
        return await mockApiService.getMovies(limit);
      }
      
      const response = await this.fetchWithFallback(`${this.baseURL}/api/movies?limit=${limit}`);
      console.log('🎬 Movies: Loaded from live API');
      return response;
    } catch (error) {
      console.warn('⚠️ Using demo movie data:', error.message);
      return await mockApiService.getMovies(limit);
    }
  }

  // Get awards with fallback
  async getAwards() {
    try {
      if (this.demoMode || !this.isOnline) {
        return await mockApiService.getAwards();
      }
      
      const response = await this.fetchWithFallback(`${this.baseURL}/api/awards`);
      console.log('🏆 Awards: Loaded from live API');
      return response;
    } catch (error) {
      console.warn('⚠️ Using demo awards data:', error.message);
      return await mockApiService.getAwards();
    }
  }

  // Search movies with fallback
  async searchMovies(query) {
    try {
      if (this.demoMode || !this.isOnline) {
        return await mockApiService.searchMovies(query);
      }
      
      const response = await this.fetchWithFallback(`${this.baseURL}/api/movies/search?q=${encodeURIComponent(query)}`);
      console.log(`🔍 Search: Found results for "${query}" from live API`);
      return response;
    } catch (error) {
      console.warn(`⚠️ Using demo search for "${query}":`, error.message);
      return await mockApiService.searchMovies(query);
    }
  }

  // Get current mode info
  getStatus() {
    return {
      isOnline: this.isOnline,
      demoMode: this.demoMode,
      baseURL: this.baseURL,
      mode: this.demoMode ? 'demo' : 'live'
    };
  }

  // Force demo mode (useful for testing)
  enableDemoMode() {
    this.demoMode = true;
    console.log('🎭 Demo mode enabled manually');
  }

  // Force live mode attempt
  enableLiveMode() {
    this.demoMode = false;
    console.log('🌐 Live mode enabled - will attempt API connections');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;