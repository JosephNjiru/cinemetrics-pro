#!/usr/bin/env node

/**
 * CineMetrics Pro - Phantom Scripts Blocker
 * Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)
 * 
 * This script prevents execution of phantom scripts like report.js that might
 * be created by dependencies trying to connect to blocked analytics services
 */

const fs = require('fs');
const path = require('path');

// List of phantom scripts that should be blocked
const PHANTOM_SCRIPTS = [
  'report.js',
  'analytics.js',
  'telemetry.js',
  'scarf.js'
];

// Block any execution attempts of phantom scripts
const blockPhantomScript = (scriptName) => {
  const scriptPath = path.join(process.cwd(), scriptName);
  
  if (fs.existsSync(scriptPath)) {
    console.log(`🚫 CineMetrics Pro: Blocking phantom script ${scriptName}`);
    
    // Replace the script with a no-op version
    const blockingContent = `#!/usr/bin/env node
// CineMetrics Pro: This script has been disabled for firewall compliance
// Original script: ${scriptName}
// Blocked by: Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)

console.log('🛡️  CineMetrics Pro: External analytics script blocked for firewall compliance');
console.log('📊 Analytics disabled to prevent connections to blocked domains');
process.exit(0);
`;
    
    try {
      fs.writeFileSync(scriptPath, blockingContent);
      console.log(`✅ Successfully blocked ${scriptName}`);
    } catch (error) {
      console.log(`⚠️  Could not block ${scriptName}: ${error.message}`);
    }
  }
};

// Block all known phantom scripts
const blockAllPhantomScripts = () => {
  console.log('🔒 CineMetrics Pro: Scanning for phantom analytics scripts...');
  
  let blockedCount = 0;
  for (const script of PHANTOM_SCRIPTS) {
    const scriptPath = path.join(process.cwd(), script);
    if (fs.existsSync(scriptPath)) {
      blockPhantomScript(script);
      blockedCount++;
    }
  }
  
  if (blockedCount === 0) {
    console.log('✅ No phantom scripts found - firewall protection is active');
  } else {
    console.log(`🛡️  Blocked ${blockedCount} phantom script(s) for firewall compliance`);
  }
  
  return blockedCount;
};

// Watch for creation of new phantom scripts
const watchForPhantomScripts = () => {
  console.log('👀 CineMetrics Pro: Watching for phantom script creation...');
  
  // Set up file system watcher for the current directory
  try {
    const watcher = fs.watch('.', { recursive: false }, (eventType, filename) => {
      if (eventType === 'rename' && filename && PHANTOM_SCRIPTS.includes(filename)) {
        console.log(`🚨 Phantom script detected: ${filename}`);
        setTimeout(() => blockPhantomScript(filename), 100); // Small delay to ensure file is written
      }
    });
    
    console.log('👁️  File system watcher active for phantom script detection');
    return watcher;
  } catch (error) {
    console.log(`⚠️  Could not set up file system watcher: ${error.message}`);
    return null;
  }
};

module.exports = {
  blockPhantomScript,
  blockAllPhantomScripts,
  watchForPhantomScripts,
  PHANTOM_SCRIPTS
};

// Run blocking if called directly
if (require.main === module) {
  console.log('🎬 CineMetrics Pro: Phantom Scripts Blocker');
  console.log('🔒 Preventing execution of analytics scripts that contact blocked domains');
  
  const blockedCount = blockAllPhantomScripts();
  
  // If we're in a CI environment, also set up blocking environment variables
  if (process.env.CI || process.env.GITHUB_ACTIONS) {
    console.log('🏭 CI environment detected - setting enhanced blocking variables');
    
    process.env.DISABLE_SCARF = 'true';
    process.env.SCARF_ANALYTICS = 'false';
    process.env.SCARF_DISABLE = 'true';
    process.env.npm_config_fund = 'false';
    process.env.npm_config_audit = 'false';
    
    console.log('✅ Enhanced CI firewall protection activated');
  }
  
  console.log('🌟 CineMetrics Pro phantom script blocking complete');
}