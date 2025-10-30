# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Prerequisites

- Node.js 16+ and npm 8+
- Chrome 96+ or Edge 96+ browser
- IBM Cognos TM1 Web served over **HTTPS** (or localhost)

### Installation Steps

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Build the Extension

```bash
npm run build
```

The extension is now built in the `dist/` directory.

#### 3. Load in Browser

1. Open Chrome/Edge and go to: `chrome://extensions`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `dist/` folder
5. Done! The extension is now installed

#### 4. Verify It Works

1. Navigate to your TM1 Web application (must be HTTPS)
2. Open browser console (F12)
3. Look for: `[TM1 Clipboard] Content script loaded - Modern Clipboard API active`
4. Test copy/paste in TM1 Web

## 📝 Quick Commands

```bash
# Build extension
npm run build

# Build and create ZIP for distribution
npm run build:zip

# Clean build artifacts
npm run clean

# Watch for changes and auto-rebuild
npm run watch

# Validate extension structure
npm run validate
```

## ✅ Verification Checklist

After installation, verify:

- [ ] Extension appears in browser toolbar
- [ ] Version shows **2.0.0**
- [ ] Manifest version shows **3**
- [ ] Console shows "Content script loaded" message
- [ ] Copy from TM1 Web works
- [ ] Paste into TM1 Web works
- [ ] No console errors

## ⚠️ Common Issues

### "Clipboard API not available"

**Cause**: Site is not HTTPS  
**Fix**: Access TM1 via `https://` (not `http://`)

### Extension won't load

**Cause**: Build errors  
**Fix**: Run `npm run clean && npm run build`

### Permissions denied

**Cause**: Browser blocking clipboard access  
**Fix**: Click extension icon → Manage → Grant permissions

## 🎯 Next Steps

- Read [README.md](README.md) for full documentation
- Check [MIGRATION.md](docs/MIGRATION.md) if upgrading from V1.x
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Review [CHANGELOG.md](CHANGELOG.md) for version history

## 💡 Pro Tips

1. **Development**: Use `npm run watch` for auto-rebuild
2. **Debugging**: Open extension's service worker in DevTools
3. **Testing**: Use `http://localhost` works without HTTPS
4. **Distribution**: Use `npm run build:zip` for easy sharing

## 📞 Need Help?

- **Documentation**: Check the `docs/` folder
- **Issues**: Open a GitHub issue
- **Questions**: See README.md support section

---

**Version**: 2.0.0 | **License**: MIT | **Manifest**: V3

