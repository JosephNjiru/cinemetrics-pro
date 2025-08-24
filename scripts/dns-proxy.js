#!/usr/bin/env node

/**
 * CineMetrics Pro - DNS Proxy Setup (Local Development Only)
 * Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)
 * 
 * This script redirects problematic domains to localhost during development
 * WARNING: This is for local development only and should never be used in production
 */

const dns = require('dns');
const originalLookup = dns.lookup;

// Blocked domains that should be redirected
const blockedDomains = [
  'downloads.snyk.io',
  'static.snyk.io',
  'snyk.io',
  'o30291.ingest.sentry.io',
  'sentry.io',
  'scarf.sh'
];

// Redirect problematic domains to localhost
dns.lookup = function(hostname, options, callback) {
  // Handle different argument patterns
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  
  // Check if this is a blocked domain
  if (blockedDomains.some(domain => hostname.includes(domain))) {
    console.log(`🚫 CineMetrics Pro: Blocking DNS lookup for ${hostname}`);
    
    // Return localhost IP
    const mockResult = {
      address: '127.0.0.1',
      family: 4
    };
    
    if (callback) {
      process.nextTick(() => callback(null, mockResult.address, mockResult.family));
    }
    return;
  }
  
  // Use original lookup for allowed domains
  return originalLookup.call(this, hostname, options, callback);
};

const setupDnsProxy = () => {
  console.log('🌐 CineMetrics Pro: DNS Proxy setup complete');
  console.log(`🚫 Blocked domains: ${blockedDomains.join(', ')}`);
  console.log('⚠️  WARNING: This is for local development only');
  return true;
};

const restoreDns = () => {
  dns.lookup = originalLookup;
  console.log('🔄 CineMetrics Pro: DNS lookup restored to original');
};

module.exports = {
  setupDnsProxy,
  restoreDns,
  blockedDomains
};

// Setup proxy if called directly (development only)
if (require.main === module) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ ERROR: DNS Proxy should not be used in production!');
    process.exit(1);
  }
  
  setupDnsProxy();
  
  // Restore on exit
  process.on('SIGINT', () => {
    console.log('\n🔄 Restoring DNS settings...');
    restoreDns();
    process.exit(0);
  });
}