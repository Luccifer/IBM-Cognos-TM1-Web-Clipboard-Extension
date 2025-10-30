// TM1 Web Clipboard Extension - Background Service Worker
// Modern Manifest V3 implementation
// 
// Licensed under MIT License
// Copyright (c) 2024 (Originally IBM Corp. 2007-2016)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software.

/**
 * Background service worker for TM1 Web Clipboard Extension
 * 
 * In Manifest V3, service workers don't have DOM access, so clipboard
 * operations are now handled directly in the content script using the
 * modern navigator.clipboard API.
 * 
 * This service worker can be used for:
 * - Extension lifecycle management
 * - Offscreen document creation (if needed)
 * - Cross-tab communication
 */

// Service worker installation
self.addEventListener('install', (event) => {
  console.log('[TM1 Clipboard] Service worker installing...');
  self.skipWaiting();
});

// Service worker activation
self.addEventListener('activate', (event) => {
  console.log('[TM1 Clipboard] Service worker activated');
  event.waitUntil(clients.claim());
});

// Message handler for content script communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[TM1 Clipboard] Message received:', request.action);
  
  switch (request.action) {
    case 'clipboardSuccess':
      console.log('[TM1 Clipboard] Clipboard operation successful');
      sendResponse({ success: true });
      break;
      
    case 'clipboardError':
      console.error('[TM1 Clipboard] Clipboard operation failed:', request.error);
      sendResponse({ success: false, error: request.error });
      break;
      
    default:
      console.warn('[TM1 Clipboard] Unknown action:', request.action);
      sendResponse({ success: false, error: 'Unknown action' });
  }
  
  return true; // Keep message channel open for async response
});

console.log('[TM1 Clipboard] Background service worker loaded');
