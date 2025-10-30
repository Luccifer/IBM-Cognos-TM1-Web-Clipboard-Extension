# Changelog

All notable changes to the IBM Cognos TM1 Web Clipboard Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Add automated testing suite
- Add TypeScript support
- Support for rich clipboard content (HTML, images)
- Cross-browser compatibility (Firefox, Safari)
- Clipboard history feature (optional)

## [2.0.0] - 2024-10-30

### 🎉 Major Release - Complete Modernization

This is a **complete rewrite** of the extension with modern standards and open-source licensing.

#### ✨ Added

- **Manifest V3** support - Future-proof extension architecture
- **Modern Clipboard API** (`navigator.clipboard`) - No more deprecated APIs
- **Service Worker** background script - Efficient, non-persistent processing
- **MIT License** - Free and open-source for everyone
- **Async/Await** patterns throughout codebase
- **Comprehensive error handling** with user-friendly messages
- **Full logging** for debugging and monitoring
- **Modern build system** with NPM scripts
- **Complete documentation** overhaul

#### 🔄 Changed

- **BREAKING**: Requires HTTPS or localhost (Clipboard API security requirement)
- **BREAKING**: Minimum browser version increased to Chrome 96+
- Permissions split into `permissions` and `host_permissions` (V3 requirement)
- Background script converted from persistent page to service worker
- All clipboard operations now in content script (not background)
- Updated all code to modern JavaScript (ES6+)
- Version bumped to 2.0.0 (major version for breaking changes)

#### 🗑️ Removed

- **background.html** - No longer needed in Manifest V3
- **document.execCommand()** - Replaced with modern Clipboard API
- **Persistent background page** - Replaced with service worker
- **update_url** and **key** fields - No longer relevant
- IBM proprietary licensing - Replaced with MIT License

#### 🐛 Fixed

- Security issues with deprecated clipboard methods
- Performance issues with persistent background page
- Compatibility with latest Chrome versions
- Error handling that was previously missing

#### 📚 Documentation

- Complete README overhaul
- New migration guide (docs/MIGRATION.md)
- Updated CHANGELOG with full history
- New CONTRIBUTING guide
- Open-source LICENSE file

#### ⚠️ Migration Notes

If upgrading from 1.0.0.4:
1. **Remove old extension** completely from browser
2. **Install v2.0.0** as new extension
3. **Ensure HTTPS** - HTTP sites will not work with modern Clipboard API
4. **Check browser version** - Requires Chrome 96+ or equivalent
5. See `docs/MIGRATION.md` for detailed migration guide

## [1.0.0.4] - 2016-XX-XX

### Last Legacy Release (Manifest V2)

This is the official IBM release version.

#### Features

- Clipboard read/write access for IBM Cognos TM1 Web
- Background script for clipboard operations
- Content script for TM1 Web integration
- Support for all HTTP/HTTPS websites
- Multi-language license support (18 languages)

#### Technical Details

- **Manifest Version**: 2
- **Permissions**: `clipboardRead`, `clipboardWrite`
- **Browser Support**: Chrome 49+, Edge (Chromium)
- **API**: `document.execCommand()` (legacy)

## [1.0.0.3] - Unknown

### Changed

- Minor updates and bug fixes
- No detailed changelog available

## [1.0.0.2] - Unknown

### Changed

- Minor updates and bug fixes
- No detailed changelog available

## [1.0.0.1] - Unknown

### Changed

- Minor updates and bug fixes
- No detailed changelog available

## [1.0.0.0] - 2007-XX-XX

### Initial Release

- First public release
- Basic clipboard functionality
- IBM Cognos TM1 Web integration

---

## Version History Summary

| Version | Date | Status | Notes |
|---------|------|--------|-------|
| 1.0.0.4 | 2016 | **Current** | Official IBM release |
| 1.0.0.3 | Unknown | Deprecated | - |
| 1.0.0.2 | Unknown | Deprecated | - |
| 1.0.0.1 | Unknown | Deprecated | - |
| 1.0.0.0 | 2007 | Deprecated | Initial release |

---

## Breaking Changes & Deprecation Notices

### ⚠️ Important: Manifest V2 End of Life

**Impact**: HIGH  
**Timeline**: June 2024 (extended timeline)  
**Action Required**: Migrate to Manifest V3

Google Chrome is deprecating Manifest V2 extensions. This extension will stop working in future Chrome versions unless migrated.

**What this means for users:**
- Current version works until at least mid-2024
- After deprecation, extension may be disabled
- Users will need to upgrade to V3 version when available

**What this means for developers:**
- Start planning Manifest V3 migration
- Service workers replace persistent background pages
- New permissions model required
- Some APIs will change

### ⚠️ document.execCommand() Deprecation

**Impact**: MEDIUM  
**Timeline**: Deprecated but still supported  
**Action Required**: Migrate to Clipboard API

The `document.execCommand()` method used for clipboard access is deprecated.

**Migration path:**
```javascript
// Old (current)
document.execCommand('copy');
document.execCommand('paste');

// New (recommended)
navigator.clipboard.writeText(text);
navigator.clipboard.readText();
```

---

## Support & Compatibility

### Browser Support Matrix

| Browser | Minimum Version | Status | Notes |
|---------|----------------|---------|-------|
| Chrome | 49+ | ✅ Supported | Primary target |
| Edge (Chromium) | 79+ | ✅ Supported | Full compatibility |
| Edge (Legacy) | N/A | ❌ Not supported | Use Chromium version |
| Firefox | 48+ | ⚠️ Untested | May require modifications |
| Safari | N/A | ❌ Not supported | Different extension API |
| Opera | 36+ | ⚠️ Untested | Chromium-based, likely works |

### Operating System Support

| OS | Status | Notes |
|----|--------|-------|
| Windows | ✅ Tested | Primary platform |
| macOS | ✅ Compatible | Limited testing |
| Linux | ✅ Compatible | Limited testing |
| Chrome OS | ✅ Compatible | Limited testing |

---

## Migration Guides

### For Users

When upgrading between major versions:

1. **Backup your settings** (if applicable)
2. **Uninstall old version** from `chrome://extensions`
3. **Install new version** following installation guide
4. **Verify functionality** with TM1 Web application

### For Developers

When contributing or maintaining:

1. **Review breaking changes** in this changelog
2. **Update dependencies** with `npm install`
3. **Run tests** with `npm test` (when available)
4. **Build and validate** with `npm run build && npm run validate`

---

## License

Copyright IBM Corp. 2007, 2016

Licensed Materials - Property of IBM

See `src/licenses/` for full license agreements in multiple languages.

---

## Links

- [README](README.md) - Main documentation
- [GitHub Repository](https://github.com/Luccifer/IBM-Cognos-TM1-Web-Clipboard-Extension)
- [Issue Tracker](https://github.com/Luccifer/IBM-Cognos-TM1-Web-Clipboard-Extension/issues)
- [IBM Cognos TM1](https://www.ibm.com/products/planning-analytics)

---

*This changelog is maintained following the principles of [Keep a Changelog](https://keepachangelog.com/).*

