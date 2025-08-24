#!/usr/bin/env node

/**
 * CineMetrics Pro - URL Verification Script
 * Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)
 * 
 * This script verifies that no blocked URLs are referenced in the codebase
 */

const fs = require('fs');
const path = require('path');

const BLOCKED_DOMAINS = [
  'josephnjiru.github.io',
  'snyk.io',
  'downloads.snyk.io', 
  'static.snyk.io',
  'sentry.io',
  'o30291.ingest.sentry.io',
  'scarf.sh'
];

const ALLOWED_DOMAINS = [
  'api.themoviedb.org', // Required for movie data
  'img.shields.io', // GitHub badges are acceptable
  'github.com', // Repository URLs
  'githubusercontent.com' // GitHub raw content
];

function searchFiles(dir, extensions = ['.js', '.json', '.html', '.md', '.yml', '.yaml', '.env']) {
  const results = [];
  
  function traverse(currentDir) {
    if (currentDir.includes('node_modules') || currentDir.includes('build') || currentDir.includes('.git')) {
      return;
    }
    
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (extensions.some(ext => item.endsWith(ext))) {
        // Skip the verification script itself and documentation about the fix
        if (item === 'verify-no-blocked-urls.js' || fullPath.includes('FIREWALL_FIX.md')) {
          continue;
        }
        results.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return results;
}

function checkFileForBlockedDomains(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  for (const domain of BLOCKED_DOMAINS) {
    if (content.includes(domain)) {
      issues.push({
        file: filePath,
        domain: domain,
        line: content.split('\n').findIndex(line => line.includes(domain)) + 1
      });
    }
  }
  
  return issues;
}

function main() {
  console.log('🔍 Verifying CineMetrics Pro for blocked URL references...\n');
  
  const projectRoot = __dirname;
  const files = searchFiles(projectRoot);
  const allIssues = [];
  
  for (const file of files) {
    const issues = checkFileForBlockedDomains(file);
    allIssues.push(...issues);
  }
  
  if (allIssues.length === 0) {
    console.log('✅ SUCCESS: No blocked domains found in the codebase!');
    console.log('\n📋 Summary:');
    console.log(`- Checked ${files.length} files`);
    console.log(`- Blocked domains: ${BLOCKED_DOMAINS.join(', ')}`);
    console.log('- All external references have been properly replaced');
    console.log('\n🌟 CineMetrics Pro is ready for deployment without firewall issues!');
    return true;
  } else {
    console.log('❌ ISSUES FOUND: The following blocked domains are still referenced:\n');
    
    for (const issue of allIssues) {
      console.log(`⚠️  ${path.relative(projectRoot, issue.file)}:${issue.line}`);
      console.log(`   Domain: ${issue.domain}\n`);
    }
    
    console.log(`Total issues: ${allIssues.length}`);
    return false;
  }
}

if (require.main === module) {
  const success = main();
  process.exit(success ? 0 : 1);
}

module.exports = { main, checkFileForBlockedDomains, BLOCKED_DOMAINS };