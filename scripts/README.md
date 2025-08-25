# CineMetrics Pro - Scripts Directory

This directory contains utility scripts for managing external service connections and firewall compliance.

## Scripts Overview

### `setup-env.js`
**Purpose**: Disables external services before build processes to prevent firewall blocking issues.

**Features**:
- Disables Snyk, Sentry, and Scarf.sh services
- Sets environment variables to prevent telemetry
- Automatically runs before install and build processes

**Usage**:
```bash
node scripts/setup-env.js
# or
npm run setup:env
```

### `mock-services.js`
**Purpose**: Creates a mock server for external services during development and testing.

**Features**:
- Provides mock responses for blocked services
- CORS-enabled for development
- Graceful shutdown handling

**Usage**:
```bash
node scripts/mock-services.js
# or
npm run mock:services
```

**Default port**: 8080 (configurable via `MOCK_PORT` environment variable)

### `dns-proxy.js`
**Purpose**: Redirects problematic domains to localhost during local development.

**Features**:
- Blocks DNS lookups for problematic domains
- Development-only safety check
- Automatic cleanup on exit

**Usage**:
```bash
NODE_ENV=development node scripts/dns-proxy.js
```

**⚠️ WARNING**: This script should NEVER be used in production and will exit with an error if NODE_ENV=production.

### `block-phantom-scripts.js`
**Purpose**: Prevents execution of phantom analytics scripts that attempt to connect to blocked domains.

**Features**:
- Scans for phantom scripts (`report.js`, `analytics.js`, `telemetry.js`, `scarf.js`)
- Replaces them with firewall-compliant no-op versions
- Real-time file system watching for phantom script creation
- Enhanced CI environment protection

**Usage**:
```bash
node scripts/block-phantom-scripts.js
# or
npm run block:phantoms
```

**Automatic Blocking**: This script runs automatically during `preinstall` and `prebuild` phases.

## Blocked Domains

The following domains are blocked/redirected by these scripts:
- `downloads.snyk.io`
- `static.snyk.io`
- `snyk.io`
- `o30291.ingest.sentry.io`
- `sentry.io`
- `scarf.sh`

## Automatic Integration

These scripts are automatically integrated into the build process:

1. **preinstall**: Runs `setup-env.js` and `block-phantom-scripts.js` before dependency installation
2. **prebuild**: Runs `setup-env.js` and `block-phantom-scripts.js` before build processes
3. **GitHub Actions**: Enhanced with environment setup, service blocking, and phantom script prevention

## Environment Variables Set

The scripts set the following environment variables:

- `SNYK_TOKEN=false`
- `DISABLE_SCARF=true`
- `SCARF_ANALYTICS=false`
- `SCARF_DISABLE=true`
- `SENTRY_DISABLE=true`
- `DISABLE_OPENCOLLECTIVE=true`
- `npm_config_fund=false`
- `npm_config_audit=false`
- Various telemetry disable flags

## Security & Compliance

These scripts ensure:
- No external service calls during CI/CD
- Firewall compliance in restricted environments
- Zero telemetry data transmission
- Self-contained build processes
- Phantom script prevention and blocking
- Real-time protection against analytics script creation

---

**Author**: Dr. Joseph N. Njiru, PhD, M PredAnylt (Data Science)  
**Version**: 1.0.0  
**Created**: 2025-08-24