#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const ZIP_NAME = 'ibm-cognos-tm1-web-clipboard-extension.zip';

async function build() {
  console.log('🔨 Building extension...');

  try {
    // Clean and create dist directory
    await fs.emptyDir(DIST_DIR);
    console.log('✓ Cleaned dist directory');

    // Copy source files to dist
    await fs.copy(SRC_DIR, DIST_DIR);
    console.log('✓ Copied source files to dist');

    // Create ZIP if requested
    if (process.argv.includes('--zip')) {
      await createZip();
    }

    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

async function createZip() {
  return new Promise((resolve, reject) => {
    console.log('📦 Creating ZIP archive...');

    const output = fs.createWriteStream(path.join(DIST_DIR, ZIP_NAME));
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`✓ Created ${ZIP_NAME} (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on('error', (err) => reject(err));

    archive.pipe(output);

    // Add all files except the zip itself
    archive.glob('**/*', {
      cwd: DIST_DIR,
      ignore: ['*.zip', '*.crx', '*.pem']
    });

    archive.finalize();
  });
}

build();

