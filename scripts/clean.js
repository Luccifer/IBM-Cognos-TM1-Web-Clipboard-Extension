#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');

async function clean() {
  console.log('🧹 Cleaning build artifacts...');

  try {
    await fs.emptyDir(DIST_DIR);
    console.log('✅ Cleaned dist directory');
  } catch (error) {
    console.error('❌ Clean failed:', error);
    process.exit(1);
  }
}

clean();

