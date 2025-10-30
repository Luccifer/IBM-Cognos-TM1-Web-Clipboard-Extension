# How to Install in Chrome/Edge

## ✅ Build Complete!

Your extension has been built and is ready to install:

- **Built Extension**: `dist/` folder
- **Distribution ZIP**: `TM1-Web-Clipboard-Extension-v2.0.0.zip` (192.25 KB)
- **Version**: 2.0.0
- **Manifest**: V3 (Modern)

---

## 🚀 Installation Methods

### Method 1: Load Unpacked (For Development/Testing)

**Best for:** Testing, development, or personal use

1. **Open Chrome Extensions Page**
   - Chrome: Navigate to `chrome://extensions`
   - Edge: Navigate to `edge://extensions`
   - Or click: Menu (⋮) → Extensions → Manage Extensions

2. **Enable Developer Mode**
   - Toggle the switch in the **top right corner**
   - Should show "Developer mode: ON"

3. **Load the Extension**
   - Click **"Load unpacked"** button
   - Navigate to: `C:\Users\glebk\Cursor\IBM Cognos TM1 Web Clipboard Extension\dist`
   - Select the `dist` folder
   - Click **"Select Folder"**

4. **Verify Installation**
   - Extension should appear in your extensions list
   - Name: "IBM Cognos TM1 Web Clipboard Extension"
   - Version: 2.0.0
   - Status: Enabled ✅

---

### Method 2: Install from ZIP (For Distribution)

**Best for:** Sharing with others or keeping a backup

1. **Extract the ZIP**
   - Locate: `TM1-Web-Clipboard-Extension-v2.0.0.zip`
   - Right-click → Extract All
   - Choose extraction location

2. **Follow Method 1 Steps**
   - Load the extracted folder as unpacked extension

---

### Method 3: Chrome Web Store (Future)

**Best for:** Production deployment, automatic updates

*Coming soon* - Requires Chrome Web Store Developer account and review process.

To publish:
1. Create developer account ($5 one-time fee)
2. Upload `TM1-Web-Clipboard-Extension-v2.0.0.zip`
3. Fill store listing
4. Submit for review
5. Wait for approval (typically 1-3 days)

---

## 🧪 Testing the Extension

After installation:

### 1. Check Extension Status

Open `chrome://extensions` and verify:
- ✅ Extension is enabled
- ✅ No error messages
- ✅ Version shows 2.0.0
- ✅ Manifest V3 badge visible

### 2. Check Console Logs

1. Navigate to any HTTPS website (or `http://localhost`)
2. Open Developer Tools (F12)
3. Go to **Console** tab
4. Look for:
   ```
   [TM1 Clipboard] Content script loaded - Modern Clipboard API active
   ```

### 3. Test with TM1 Web

**Important**: TM1 Web must be accessed via **HTTPS** (or localhost)

1. Navigate to your TM1 Web instance:
   - ✅ `https://your-tm1-server.com/tm1web/`
   - ❌ `http://your-tm1-server.com/tm1web/` (won't work)

2. **Test Copy**:
   - Select data in a TM1 grid
   - Copy (Ctrl+C / Cmd+C)
   - Paste into Excel/Notepad
   - Data should paste correctly

3. **Test Paste**:
   - Copy data from Excel/Notepad
   - Paste into TM1 grid (Ctrl+V / Cmd+V)
   - Data should appear in grid

4. **Check Console**:
   ```
   [TM1 Clipboard] Copy event received
   [TM1 Clipboard] Write to clipboard successful
   [TM1 Clipboard] Paste event received
   [TM1 Clipboard] Read from clipboard successful
   ```

---

## ⚠️ Troubleshooting

### "Clipboard API not available"

**Cause**: Page is not HTTPS
**Solution**: Access TM1 Web via `https://` not `http://`

### Extension won't load

**Cause**: Manifest errors or missing files
**Solution**: 
1. Check for error messages in red
2. Rebuild: Delete `dist/` folder and rebuild
3. Verify all files are present

### Permission denied

**Cause**: Browser blocking clipboard access
**Solution**:
1. Click extension icon
2. Click "Manage extension"
3. Ensure permissions are granted

### Works on localhost but not production

**Cause**: Production is HTTP not HTTPS
**Solution**: Configure HTTPS on your TM1 server

---

## 📊 Extension Details

### Files Included

```
dist/
├── manifest.json         # Extension manifest (V3)
├── background.js         # Service worker (2.3 KB)
├── contentscript.js      # Clipboard handler (4.9 KB)
├── icon_16x16.png       # 16x16 icon (357 bytes)
├── icon_48x48.png       # 48x48 icon (845 bytes)
├── icon_128x128.png     # 128x128 icon (1.8 KB)
└── licenses/            # IBM license files (18 languages)
```

### Permissions Required

The extension needs these permissions:

- **clipboardRead**: Read from system clipboard
- **clipboardWrite**: Write to system clipboard
- **Host permissions**: Access all HTTP/HTTPS sites

Chrome will show permission prompts on first use.

### Browser Requirements

- ✅ Chrome 96+ (December 2021 or newer)
- ✅ Edge 96+ (December 2021 or newer)
- ✅ Opera 82+ (Chromium-based)
- ✅ Brave (Latest version)

---

## 🔄 Updating the Extension

### During Development

1. Make changes to files in `src/`
2. Rebuild: Copy `src/*` to `dist/`
3. Go to `chrome://extensions`
4. Click **refresh icon** (🔄) on extension card
5. Test changes

### For Users

When a new version is released:
1. Download new ZIP
2. Extract to new folder
3. Remove old extension
4. Load new version

---

## 🗑️ Uninstalling

1. Go to `chrome://extensions`
2. Find "IBM Cognos TM1 Web Clipboard Extension"
3. Click **"Remove"** button
4. Confirm removal

---

## 📞 Need Help?

- **Documentation**: See [README.md](README.md)
- **Migration Guide**: See [docs/MIGRATION.md](docs/MIGRATION.md)
- **Quick Start**: See [QUICK_START.md](QUICK_START.md)
- **Build Issues**: See [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md)
- **GitHub Issues**: https://github.com/Luccifer/IBM-Cognos-TM1-Web-Clipboard-Extension/issues

---

## ✅ Installation Checklist

Before using:

- [ ] Extension loaded in Chrome/Edge
- [ ] Developer mode enabled
- [ ] Extension appears in extensions list
- [ ] Version shows 2.0.0
- [ ] No error messages
- [ ] Console shows "Content script loaded" message
- [ ] TM1 Web is accessed via HTTPS
- [ ] Copy from TM1 works
- [ ] Paste into TM1 works

---

**Ready to use!** 🎉

Your IBM Cognos TM1 Web Clipboard Extension is now installed and ready to enhance your TM1 Web experience.


