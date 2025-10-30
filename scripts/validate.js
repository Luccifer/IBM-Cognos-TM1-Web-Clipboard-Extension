#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const MANIFEST_PATH = path.join(SRC_DIR, 'manifest.json');

async function validate() {
  console.log('🔍 Validating extension...');

  let errors = 0;

  try {
    // Check if source directory exists
    if (!await fs.pathExists(SRC_DIR)) {
      console.error('❌ Source directory not found');
      errors++;
    }

    // Check if manifest.json exists
    if (!await fs.pathExists(MANIFEST_PATH)) {
      console.error('❌ manifest.json not found');
      errors++;
    } else {
      // Validate manifest.json
      const manifest = await fs.readJson(MANIFEST_PATH);
      
      if (!manifest.name) {
        console.error('❌ manifest.json: missing "name" field');
        errors++;
      }

      if (!manifest.version) {
        console.error('❌ manifest.json: missing "version" field');
        errors++;
      }

      if (!manifest.manifest_version) {
        console.error('❌ manifest.json: missing "manifest_version" field');
        errors++;
      }

      if (!manifest.permissions || !Array.isArray(manifest.permissions)) {
        console.error('❌ manifest.json: missing or invalid "permissions" field');
        errors++;
      }

      console.log('✓ manifest.json is valid');
    }

    // Check required files (Manifest V3 - no background.html needed)
    const requiredFiles = [
      'background.js',
      'contentscript.js'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(SRC_DIR, file);
      if (!await fs.pathExists(filePath)) {
        console.error(`❌ Required file missing: ${file}`);
        errors++;
      } else {
        console.log(`✓ ${file} exists`);
      }
    }

    // Check for icons
    const iconSizes = ['16x16', '48x48', '128x128'];
    for (const size of iconSizes) {
      const iconPath = path.join(SRC_DIR, `icon_${size}.png`);
      if (!await fs.pathExists(iconPath)) {
        console.warn(`⚠️  Icon missing: icon_${size}.png`);
      } else {
        console.log(`✓ icon_${size}.png exists`);
      }
    }

    if (errors === 0) {
      console.log('\n✅ Validation passed!');
    } else {
      console.log(`\n❌ Validation failed with ${errors} error(s)`);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Validation error:', error);
    process.exit(1);
  }
}

validate();

