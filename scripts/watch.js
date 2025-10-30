#!/usr/bin/env node

const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');

console.log('👀 Watching for changes in src/...');
console.log('Press Ctrl+C to stop.\n');

let building = false;

const watcher = chokidar.watch(SRC_DIR, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});

watcher.on('change', (filePath) => {
  if (building) return;

  console.log(`📝 File changed: ${path.relative(SRC_DIR, filePath)}`);
  building = true;

  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Build error:', stderr);
    } else {
      console.log(stdout);
    }
    building = false;
  });
});

watcher.on('error', (error) => {
  console.error('❌ Watcher error:', error);
});

