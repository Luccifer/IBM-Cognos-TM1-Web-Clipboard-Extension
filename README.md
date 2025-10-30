# IBM Cognos TM1 Web Clipboard Extension

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Manifest](https://img.shields.io/badge/manifest-v3-brightgreen)

A modern, open-source browser extension that enables IBM Cognos TM1 Web to access the clipboard using the latest Manifest V3 and Clipboard API standards.

## 🎉 Version 2.0 - Fully Modernized!

This version has been completely rewritten with:
- ✅ **Manifest V3** - Future-proof extension architecture
- ✅ **Modern Clipboard API** - No more deprecated `document.execCommand()`
- ✅ **Service Worker** - Efficient background processing
- ✅ **MIT License** - Free to use, modify, and distribute
- ✅ **Improved Error Handling** - Better user experience
- ✅ **Full Documentation** - Comprehensive guides included

## 📋 Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
  - [For End Users](#for-end-users)
  - [For Developers](#for-developers)
- [Usage](#usage)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Building](#building)
  - [Scripts](#scripts)
- [Technical Details](#technical-details)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Clipboard Read Access**: Allows TM1 Web to read data from the system clipboard
- **Clipboard Write Access**: Enables TM1 Web to copy data to the system clipboard
- **Universal Support**: Works across all HTTP and HTTPS websites
- **Lightweight**: Minimal footprint with no external dependencies
- **Open Source**: MIT Licensed, free for all to use

## 📦 Requirements

- **Browser**: Chrome 96+, Edge 96+, or any modern Chromium-based browser
- **Manifest Version**: V3 (modern)
- **API**: Modern Clipboard API (navigator.clipboard)
- **Permissions**: `clipboardRead`, `clipboardWrite`
- **Protocol**: HTTPS required (or localhost for development)

## 🚀 Installation

### For End Users

#### Method 1: Load Unpacked Extension (Development Mode)

1. Download the latest release or clone this repository
2. Build the extension (see [Building](#building))
3. Open your browser and navigate to:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
4. Enable **Developer mode** (toggle in the top right)
5. Click **Load unpacked**
6. Select the `dist` folder from the built extension
7. The extension should now appear in your extensions list

#### Method 2: Install from Chrome Web Store

*Coming soon - extension pending Chrome Web Store approval*

### For Developers

```bash
# Clone the repository
git clone https://github.com/Luccifer/IBM-Cognos-TM1-Web-Clipboard-Extension.git

# Navigate to the project directory
cd IBM-Cognos-TM1-Web-Clipboard-Extension

# Install dependencies
npm install

# Build the extension
npm run build

# Validate the extension
npm run validate
```

## 💡 Usage

Once installed, the extension works automatically with IBM Cognos TM1 Web:

1. Navigate to your TM1 Web application
2. The extension will automatically inject necessary scripts
3. Copy/paste operations will work seamlessly
4. No additional configuration required

### How It Works

The extension listens for custom events dispatched by TM1 Web:

- **Copy Operation**: TM1 Web fires `tm1webCopy` event → Extension writes to clipboard
- **Paste Operation**: TM1 Web fires `tm1webPaste` event → Extension reads from clipboard and returns data

## 🛠️ Development

### Project Structure

```
ibm-cognos-tm1-web-clipboard-extension/
├── src/                      # Source files
│   ├── background.js         # Service worker (V3)
│   ├── contentscript.js      # Content script with Clipboard API
│   ├── manifest.json         # Extension manifest (V3)
│   ├── icon_16x16.png        # Extension icon (16x16)
│   ├── icon_48x48.png        # Extension icon (48x48)
│   ├── icon_128x128.png      # Extension icon (128x128)
│   └── licenses/             # Historical IBM license files (18 languages)
├── dist/                     # Build output directory
├── docs/                     # Documentation and guides
│   └── Инструкция.jpg        # Installation guide (Russian)
├── scripts/                  # Build scripts
│   ├── build.js              # Main build script
│   ├── clean.js              # Clean dist directory
│   ├── watch.js              # File watcher for development
│   └── validate.js           # Extension validation
├── package.json              # NPM configuration
├── .gitignore                # Git ignore rules
├── README.md                 # This file
└── CHANGELOG.md              # Version history
```

### Building

#### Standard Build

```bash
npm run build
```

This copies all source files from `src/` to `dist/`.

#### Build with ZIP

```bash
npm run build:zip
```

Creates a distributable ZIP file in the `dist/` directory, ready for upload to the Chrome Web Store.

#### Clean Build

```bash
npm run clean
npm run build
```

Removes all build artifacts before building.

### Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the extension to `dist/` |
| `npm run build:zip` | Build and create a ZIP archive |
| `npm run clean` | Remove all build artifacts |
| `npm run watch` | Watch for file changes and rebuild automatically |
| `npm run validate` | Validate extension structure and manifest |

### Development Workflow

1. Make changes to files in `src/`
2. Run `npm run build` or `npm run watch`
3. Reload the extension in your browser:
   - Go to `chrome://extensions`
   - Click the refresh icon on the extension card
4. Test your changes in TM1 Web

## 🔧 Technical Details

### Architecture

The extension uses a modern Manifest V3 architecture:

1. **Service Worker** (`background.js`):
   - Non-persistent background script
   - Handles extension lifecycle events
   - Monitors clipboard operation status
   - Logs errors and successes

2. **Content Script** (`contentscript.js`):
   - Injected into all HTTP/HTTPS pages
   - Listens for custom DOM events from TM1 Web
   - **Directly handles clipboard operations** using modern API
   - Provides error handling and fallbacks

### Modern Clipboard API

The extension uses the modern **navigator.clipboard** API:

```javascript
// Reading from clipboard
const text = await navigator.clipboard.readText();

// Writing to clipboard
await navigator.clipboard.writeText(text);
```

**Benefits**:
- ✅ **Async/Await**: Modern promise-based API
- ✅ **Better Security**: User permission-based
- ✅ **Future-Proof**: W3C standard, not deprecated
- ✅ **Error Handling**: Proper exception handling

### Permissions

```json
{
  "permissions": ["clipboardRead", "clipboardWrite"],
  "host_permissions": ["http://*/*", "https://*/*"]
}
```

**Manifest V3 Changes**:
- Permissions are now separated into `permissions` and `host_permissions`
- More granular control over extension capabilities
- User sees exactly what the extension can access

## ⚠️ Important Notes

### HTTPS Requirement

The modern Clipboard API requires a **secure context**:
- ✅ **HTTPS**: Production sites must use HTTPS
- ✅ **localhost**: Development on localhost works
- ❌ **HTTP**: Plain HTTP sites won't work (security restriction)

If TM1 Web is served over HTTP, you'll need to configure HTTPS.

### Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 96+ | ✅ Fully Supported |
| Edge | 96+ | ✅ Fully Supported |
| Opera | 82+ | ✅ Compatible |
| Brave | Latest | ✅ Compatible |
| Firefox | 109+ | ⚠️ Requires modifications |
| Safari | 15.4+ | ⚠️ Requires Safari-specific manifest |

### Migrating from V1.x

If you're upgrading from version 1.0.0.4:
- Remove the old extension completely
- Install version 2.0.0
- No data migration needed
- Check `docs/MIGRATION.md` for details

## 🤝 Contributing

### Enhancement Roadmap

We welcome contributions! Areas for improvement:

1. **Testing**
   - Add automated tests
   - Browser compatibility testing
   - Integration tests with TM1 Web

2. **Code Quality**
   - Add ESLint configuration
   - TypeScript support
   - Code coverage reporting

3. **Features**
   - Support for rich clipboard content (HTML, images)
   - Clipboard history (optional)
   - Better user notifications

4. **Documentation**
   - Translate guides to multiple languages
   - Video tutorials
   - TM1 Web integration examples

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This extension is licensed under the **MIT License** - free to use, modify, and distribute!

```
MIT License
Copyright (c) 2024 (Originally IBM Corp. 2007-2016)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software.
```

**Note**: The original IBM license files are preserved in `src/licenses/` for historical reference. The current version (2.0.0+) is released under MIT License.

## 📞 Support

For issues, questions, or support:

- **GitHub Issues**: [Open an issue](https://github.com/Luccifer/IBM-Cognos-TM1-Web-Clipboard-Extension/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/Luccifer/IBM-Cognos-TM1-Web-Clipboard-Extension/discussions)
- **Documentation**: Check the `docs/` folder for additional guides

## 🔗 Related Links

- [GitHub Repository](https://github.com/Luccifer/IBM-Cognos-TM1-Web-Clipboard-Extension)
- [IBM Cognos TM1](https://www.ibm.com/products/planning-analytics)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)

---

**Originally created by IBM Corporation (2007-2016)**  
**Modernized and open-sourced by [Gleb Karpushkin](https://github.com/Luccifer) (2024)**

⭐ If you find this project useful, please consider giving it a star on GitHub!

