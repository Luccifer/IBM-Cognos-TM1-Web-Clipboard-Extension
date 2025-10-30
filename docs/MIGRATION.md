# Migration Guide: V1.x to V2.0

This guide helps you migrate from the legacy version (1.0.0.4) to the modern version (2.0.0) of the IBM Cognos TM1 Web Clipboard Extension.

## 🎯 What's Changed?

### Major Changes

| Feature | V1.x (Old) | V2.0 (New) |
|---------|------------|------------|
| **Manifest** | V2 (deprecated) | V3 (modern) |
| **Clipboard API** | `document.execCommand()` | `navigator.clipboard` |
| **Background** | Persistent page | Service worker |
| **License** | IBM Proprietary | MIT Open Source |
| **Min Browser** | Chrome 49+ | Chrome 96+ |
| **Protocol** | HTTP/HTTPS | HTTPS/localhost only |

### Breaking Changes

⚠️ **IMPORTANT**: These changes may affect your deployment

1. **HTTPS Required**
   - The modern Clipboard API only works in secure contexts
   - HTTP sites will NOT work (browser security restriction)
   - localhost is allowed for development

2. **Browser Version**
   - Minimum Chrome version: 96 (released Dec 2021)
   - Minimum Edge version: 96
   - Older browsers not supported

3. **Complete Reinstall Required**
   - Must uninstall V1.x completely
   - Install V2.0 as new extension
   - No automatic upgrade path

## 📋 Migration Steps

### Step 1: Check Prerequisites

Before migrating, ensure:

- [ ] TM1 Web is served over **HTTPS** (or localhost for dev)
- [ ] Browser is **Chrome 96+** or **Edge 96+** or equivalent
- [ ] You have admin rights to install extensions
- [ ] Backup any extension settings (if applicable)

#### Checking HTTPS

```bash
# Your TM1 Web URL should look like:
https://your-tm1-server.com/tm1web/
# NOT:
http://your-tm1-server.com/tm1web/
```

If your TM1 Web is on HTTP, you need to:
1. Configure HTTPS on your TM1 server
2. OR use a reverse proxy with SSL/TLS
3. OR (temporary) use localhost tunneling for testing

#### Checking Browser Version

```
Chrome:    chrome://version
Edge:      edge://version
```

Look for version number 96 or higher.

### Step 2: Uninstall Old Version

1. Open browser extension page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`

2. Find "IBM Cognos TM1 Web Clipboard Extension" (v1.0.0.4)

3. Click **Remove** button

4. Confirm removal

5. **Restart browser** (recommended)

### Step 3: Install New Version

#### Option A: From Source (Developers)

```bash
# Clone repository
git clone https://github.com/Luccifer/IBM-Cognos-TM1-Web-Clipboard-Extension.git
cd IBM-Cognos-TM1-Web-Clipboard-Extension

# Install dependencies
npm install

# Build extension
npm run build

# The extension is now in dist/ folder
```

Then in browser:
1. Go to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist/` folder

#### Option B: From ZIP (End Users)

1. Download latest release ZIP
2. Extract to a folder
3. Go to `chrome://extensions`
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the extracted folder

### Step 4: Verify Installation

1. Extension icon should appear in browser toolbar
2. Check extension details:
   - Name: "IBM Cognos TM1 Web Clipboard Extension"
   - Version: **2.0.0**
   - Manifest: **V3**

3. Open browser console (F12)
4. Navigate to TM1 Web
5. Look for log message:
   ```
   [TM1 Clipboard] Content script loaded - Modern Clipboard API active
   ```

### Step 5: Test Clipboard Operations

1. **Test Copy** in TM1 Web:
   - Select cells in a TM1 Web grid
   - Copy (Ctrl+C / Cmd+C)
   - Paste into Excel or Notepad
   - Data should appear correctly

2. **Test Paste** into TM1 Web:
   - Copy data from Excel or Notepad
   - Paste into TM1 Web grid (Ctrl+V / Cmd+V)
   - Data should paste correctly

3. **Check Console** (F12):
   ```
   [TM1 Clipboard] Copy event received
   [TM1 Clipboard] Write to clipboard successful
   [TM1 Clipboard] Paste event received
   [TM1 Clipboard] Read from clipboard successful
   ```

## 🔧 Troubleshooting

### Issue: "Clipboard API not available"

**Symptoms:**
- Console error: `Clipboard API not available in this context`
- Copy/paste doesn't work

**Causes:**
- Page is served over HTTP (not HTTPS)
- Page is in an insecure iframe
- Browser doesn't support Clipboard API

**Solutions:**
1. **Configure HTTPS on TM1 Server**
   ```
   # Example for Apache reverse proxy
   <VirtualHost *:443>
       ServerName tm1.example.com
       SSLEngine on
       SSLCertificateFile /path/to/cert.pem
       SSLCertificateKeyFile /path/to/key.pem
       ProxyPass / http://localhost:9510/
       ProxyPassReverse / http://localhost:9510/
   </VirtualHost>
   ```

2. **Use nginx as SSL Terminator**
   ```nginx
   server {
       listen 443 ssl;
       server_name tm1.example.com;
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       location / {
           proxy_pass http://localhost:9510;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

3. **Development Workaround** (localhost only):
   - Access TM1 via `http://localhost:9510` instead of IP
   - Clipboard API works on localhost even without HTTPS

### Issue: Extension Not Loading

**Symptoms:**
- Extension doesn't appear in browser
- No icon in toolbar

**Solutions:**
1. Check manifest errors:
   - Go to `chrome://extensions`
   - Look for error messages
   - Click "Errors" button for details

2. Rebuild extension:
   ```bash
   npm run clean
   npm run build
   npm run validate
   ```

3. Check browser console for errors

### Issue: Permission Denied

**Symptoms:**
- Browser shows permission popup
- Clipboard operations fail

**Solutions:**
1. Check site permissions:
   - Click extension icon
   - Go to "Manage extension"
   - Ensure "Site access" is set to "On all sites"

2. Grant clipboard permissions:
   - Browser should prompt automatically
   - Click "Allow" when prompted

### Issue: Works on localhost but not production

**Cause:** Production site doesn't use HTTPS

**Solution:** Must configure HTTPS on production server (see above)

## 📊 Feature Comparison

| Feature | V1.x | V2.0 | Notes |
|---------|------|------|-------|
| Copy to clipboard | ✅ | ✅ | Improved in V2 |
| Paste from clipboard | ✅ | ✅ | Improved in V2 |
| Error handling | ⚠️ Basic | ✅ Comprehensive | Better UX in V2 |
| HTTPS requirement | ❌ No | ✅ Yes | Security requirement |
| Modern API | ❌ No | ✅ Yes | Future-proof |
| Service worker | ❌ No | ✅ Yes | Better performance |
| Open source | ❌ No | ✅ Yes | MIT License |
| Active development | ❌ No | ✅ Yes | Community maintained |

## 🎓 Training Users

### For End Users

**What they need to know:**
1. Extension looks the same, works the same
2. Might need to click "Allow" for clipboard access (first time)
3. If copy/paste doesn't work, check URL starts with `https://`

### For IT Administrators

**Deployment checklist:**
1. **Configure HTTPS** on TM1 servers (critical)
2. **Update browser minimum version** policy (Chrome 96+)
3. **Distribute new extension** via enterprise policy or manual install
4. **Test thoroughly** before rolling out
5. **Provide user support** documentation

### Sample Announcement Email

```
Subject: TM1 Web Clipboard Extension Update Required

Dear Team,

We're upgrading the TM1 Web Clipboard Extension to version 2.0.

WHAT'S CHANGING:
• Modern, secure clipboard technology
• Better performance and reliability
• Open-source and community supported

ACTION REQUIRED:
1. Uninstall old extension (v1.0.0.4)
2. Install new extension (v2.0.0)
3. Test copy/paste functionality

IMPORTANT:
• TM1 Web must be accessed via HTTPS (not HTTP)
• Chrome 96+ or Edge 96+ required

Need help? Contact IT Support or see: [migration guide link]
```

## 📞 Getting Help

If you encounter issues during migration:

1. **Check documentation**:
   - README.md - General info
   - MIGRATION.md - This guide
   - CONTRIBUTING.md - Development help

2. **Search existing issues**:
   - GitHub Issues: [link]
   - Known problems and solutions

3. **Open new issue**:
   - Provide browser version
   - Include console errors
   - Describe steps to reproduce

4. **Community support**:
   - GitHub Discussions
   - Stack Overflow (tag: tm1-web)

## ✅ Post-Migration Checklist

After migration, verify:

- [ ] Extension version shows 2.0.0
- [ ] Manifest V3 in extension details
- [ ] HTTPS enabled on all TM1 servers
- [ ] Copy from TM1 Web works
- [ ] Paste into TM1 Web works
- [ ] No console errors
- [ ] All users notified and trained
- [ ] Documentation updated
- [ ] Rollback plan in place (if needed)

## 🔄 Rollback Procedure

If you need to rollback to V1.x:

1. Uninstall V2.0
2. Reinstall V1.0.0.4 from backup
3. Document the reason for rollback
4. Report issues to maintainers

**Note**: Rollback should be temporary. V1.x uses deprecated APIs and will stop working in future browser versions.

---

**Questions?** Open an issue on GitHub or contact the maintainers.

