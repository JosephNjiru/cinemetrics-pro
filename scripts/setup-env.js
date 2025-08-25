#!/usr/bin/env node

/**
 * CineMetrics Pro - Environment Setup Script
 * Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)
 * 
 * This script disables external services before build process starts
 * to prevent firewall blocking issues during CI/CD and local development
 */

// Disable external services before build process starts
process.env.SNYK_TOKEN = 'false';
process.env.DISABLE_SCARF = 'true';
process.env.SCARF_ANALYTICS = 'false';
process.env.SCARF_DISABLE = 'true';
process.env.SENTRY_DISABLE = 'true';
process.env.SENTRY_DSN = '';
process.env.DISABLE_OPENCOLLECTIVE = 'true';
process.env.ADBLOCK = 'true';
process.env.DISABLE_OPENCOLLECTIVE = 'true';
process.env.OPENCOLLECTIVE_HIDE = 'true';
process.env.DISABLE_SENTRY = 'true';

// Disable npm fund messages and audit
process.env.npm_config_fund = 'false';
process.env.npm_config_audit = 'false';

// Disable telemetry for various tools
process.env.GATSBY_TELEMETRY_DISABLED = '1';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.STORYBOOK_DISABLE_TELEMETRY = '1';

console.log('🔒 CineMetrics Pro: Environment configured to disable external services');
console.log('✅ External service connections disabled for firewall compliance');
console.log('🛡️  Snyk, Sentry, Scarf.sh, and other telemetry services blocked');

module.exports = {
  setupEnvironment: () => {
    console.log('🚀 CineMetrics Pro environment setup complete');
    return true;
  }
};

// Run setup if called directly
if (require.main === module) {
  module.exports.setupEnvironment();
}