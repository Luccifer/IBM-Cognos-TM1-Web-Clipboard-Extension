# Building the Extension

## Prerequisites

You need **Node.js 16+** and **npm 8+** installed.

### Install Node.js

1. Download from: https://nodejs.org/
2. Choose "LTS" version (Long Term Support)
3. Run the installer
4. Restart your terminal/PowerShell

Verify installation:
```bash
node --version
npm --version
```

## Build Steps

### 1. Install Dependencies

```bash
cd "IBM Cognos TM1 Web Clipboard Extension"
npm install
```

This installs:
- `archiver` - For creating ZIP files
- `chokidar` - For file watching
- `fs-extra` - For file operations

### 2. Build the Extension

```bash
npm run build
```

This will:
- Clean the `dist/` directory
- Copy all source files from `src/` to `dist/`
- Extension is ready in `dist/` folder

### 3. Create Distribution ZIP

```bash
npm run build:zip
```

This creates `dist/tm1-web-clipboard-extension.zip` ready for distribution.

### 4. Validate Extension

```bash
npm run validate
```

This checks:
- manifest.json is valid
- Required files exist
- Icons are present
- No missing files

## Manual Build (Without Node.js)

If you don't want to install Node.js, you can build manually:

### Windows (PowerShell)

```powershell
# Create dist directory
New-Item -ItemType Directory -Force -Path "dist"

# Copy all files from src to dist
Copy-Item -Path "src\*" -Destination "dist\" -Recurse -Force

# Create ZIP file
Compress-Archive -Path "dist\*" -DestinationPath "dist\tm1-web-clipboard-extension.zip" -Force
```

### Alternative: Use the extension directly from src/

You can load the unpacked extension directly from the `src/` folder:

1. Open Chrome: `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `src/` folder (not dist)
5. Done!

## Development Workflow

### Watch Mode (Auto-rebuild)

```bash
npm run watch
```

This automatically rebuilds when you change files in `src/`.

### Clean Build

```bash
npm run clean
npm run build
```

## Loading in Chrome/Edge

1. Open browser: `chrome://extensions` or `edge://extensions`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `dist/` folder (or `src/` for development)
5. Extension is now installed!

## Troubleshooting

### "npm not found"

Install Node.js from https://nodejs.org/

### Build fails

```bash
# Clean everything and reinstall
rm -rf node_modules
rm -rf dist
npm install
npm run build
```

### Permission errors

Run PowerShell as Administrator

### ZIP creation fails

Manually create ZIP:
- Navigate to `dist/` folder
- Select all files
- Right-click → Send to → Compressed (zipped) folder

## Distribution

### For Chrome Web Store

1. Build: `npm run build:zip`
2. Upload `dist/*.zip` to Chrome Web Store Developer Dashboard
3. Fill in store listing details
4. Submit for review

### For Manual Distribution

Share the ZIP file from `dist/` folder. Users should:
1. Extract the ZIP
2. Load unpacked in Chrome/Edge
3. Follow the README instructions

## Next Steps

After building:
- Test in Chrome/Edge
- Verify clipboard operations work
- Check console for errors
- Test with HTTPS TM1 Web instance

---

**Need Help?** See [README.md](README.md) or [QUICK_START.md](QUICK_START.md)


