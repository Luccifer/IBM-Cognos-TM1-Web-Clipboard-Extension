// TM1 Web Clipboard Extension - Content Script
// Modern Manifest V3 implementation with Clipboard API
// 
// Licensed under MIT License
// Copyright (c) 2024 (Originally IBM Corp. 2007-2016)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software.

/**
 * Content script that bridges TM1 Web and the system clipboard
 * using the modern navigator.clipboard API
 */

// Clipboard API wrapper with fallback and error handling
const ClipboardHandler = {
  /**
   * Read text from clipboard
   * @returns {Promise<string>} Clipboard text content
   */
  async readText() {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        console.log('[TM1 Clipboard] Read from clipboard successful');
        return text;
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (error) {
      console.error('[TM1 Clipboard] Read failed:', error);
      
      // Notify background service worker of error
      chrome.runtime.sendMessage({
        action: 'clipboardError',
        error: error.message
      });
      
      throw error;
    }
  },

  /**
   * Write text to clipboard
   * @param {string} text - Text to write to clipboard
   * @returns {Promise<boolean>} Success status
   */
  async writeText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        console.log('[TM1 Clipboard] Write to clipboard successful');
        
        // Notify background service worker of success
        chrome.runtime.sendMessage({
          action: 'clipboardSuccess'
        });
        
        return true;
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (error) {
      console.error('[TM1 Clipboard] Write failed:', error);
      
      // Notify background service worker of error
      chrome.runtime.sendMessage({
        action: 'clipboardError',
        error: error.message
      });
      
      return false;
    }
  }
};

/**
 * Handle TM1 Web paste request
 * Triggered when TM1 Web needs to read from clipboard
 */
document.documentElement.addEventListener('tm1webPaste', async (evt) => {
  evt.preventDefault();
  console.log('[TM1 Clipboard] Paste event received');
  
  try {
    // Read from clipboard using modern API
    const clipboardText = await ClipboardHandler.readText();
    
    // Send response back to TM1 Web
    document.documentElement.dispatchEvent(new CustomEvent('tm1webPasteResponse' + evt.timeStamp, {
      bubbles: false,
      cancelable: true,
      detail: {
        value: clipboardText,
        success: true
      }
    }));
  } catch (error) {
    // Send error response to TM1 Web
    document.documentElement.dispatchEvent(new CustomEvent('tm1webPasteResponse' + evt.timeStamp, {
      bubbles: false,
      cancelable: true,
      detail: {
        value: null,
        success: false,
        error: error.message
      }
    }));
  }
}, false);

/**
 * Handle TM1 Web copy request
 * Triggered when TM1 Web needs to write to clipboard
 */
document.documentElement.addEventListener('tm1webCopy', async (evt) => {
  evt.preventDefault();
  console.log('[TM1 Clipboard] Copy event received');
  
  if (!evt.detail || !evt.detail.value) {
    console.warn('[TM1 Clipboard] Copy event missing value');
    return;
  }
  
  try {
    // Write to clipboard using modern API
    const success = await ClipboardHandler.writeText(evt.detail.value);
    
    // Optionally send success response back to TM1 Web
    if (evt.detail.callback) {
      document.documentElement.dispatchEvent(new CustomEvent('tm1webCopyResponse', {
        bubbles: false,
        cancelable: true,
        detail: {
          success: success
        }
      }));
    }
  } catch (error) {
    console.error('[TM1 Clipboard] Copy operation failed:', error);
    
    // Send error response if callback requested
    if (evt.detail.callback) {
      document.documentElement.dispatchEvent(new CustomEvent('tm1webCopyResponse', {
        bubbles: false,
        cancelable: true,
        detail: {
          success: false,
          error: error.message
        }
      }));
    }
  }
}, false);

// Log successful initialization
console.log('[TM1 Clipboard] Content script loaded - Modern Clipboard API active');

// Check clipboard API availability
if (!navigator.clipboard) {
  console.error('[TM1 Clipboard] Clipboard API not available in this context');
  console.error('[TM1 Clipboard] Make sure the page is served over HTTPS or localhost');
}
