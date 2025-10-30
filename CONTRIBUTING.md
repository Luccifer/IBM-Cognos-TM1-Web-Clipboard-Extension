# Contributing to IBM Cognos TM1 Web Clipboard Extension

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🎯 How Can You Contribute?

- 🐛 **Report bugs** - Found an issue? Let us know
- 💡 **Suggest features** - Have an idea? Share it
- 📝 **Improve documentation** - Help make our docs better
- 🔧 **Submit code** - Fix bugs or add features
- 🌍 **Translate** - Help localize the extension

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm 8+
- Git
- Chrome or Chromium-based browser
- IBM Cognos TM1 Web (for testing)

### Setup Development Environment

1. **Fork and clone the repository**

```bash
git clone https://github.com/Luccifer/IBM-Cognos-TM1-Web-Clipboard-Extension.git
cd IBM-Cognos-TM1-Web-Clipboard-Extension
```

2. **Install dependencies**

```bash
npm install
```

3. **Build the extension**

```bash
npm run build
```

4. **Load extension in browser**

- Open `chrome://extensions`
- Enable "Developer mode"
- Click "Load unpacked"
- Select the `dist` folder

5. **Start development**

```bash
npm run watch
```

This will automatically rebuild the extension when you make changes.

## 📝 Contribution Workflow

### 1. Create an Issue

Before starting work, create an issue to discuss:
- What you want to change
- Why the change is needed
- How you plan to implement it

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming convention:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 3. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes

```bash
# Build the extension
npm run build

# Validate the extension
npm run validate

# Manual testing
# 1. Reload extension in browser
# 2. Test with TM1 Web
# 3. Verify clipboard operations work
```

### 5. Commit Your Changes

We follow conventional commit messages:

```bash
git commit -m "feat: add support for new clipboard API"
git commit -m "fix: resolve issue with background script"
git commit -m "docs: update installation instructions"
git commit -m "refactor: modernize clipboard handling"
```

Commit message format:
```
<type>: <subject>

[optional body]

[optional footer]
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance tasks

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Link to related issue
- Screenshots (if UI changes)
- Testing notes

## 🎨 Code Style Guidelines

### JavaScript

```javascript
// Use modern JavaScript features
const getClipboardText = async () => {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (error) {
    console.error('Clipboard read failed:', error);
    return null;
  }
};

// Prefer const/let over var
const API_URL = 'https://api.example.com';
let counter = 0;

// Use descriptive variable names
const clipboardContent = await getClipboardText();

// Add JSDoc comments for functions
/**
 * Writes text to the clipboard
 * @param {string} text - The text to write
 * @returns {Promise<boolean>} - Success status
 */
async function setClipboardText(text) {
  // Implementation
}
```

### File Organization

```javascript
// 1. License header (if applicable)
// 2. Imports/requires
// 3. Constants
// 4. Helper functions
// 5. Main logic
// 6. Exports (if module)
```

### Naming Conventions

- **Functions**: `camelCase` - `getClipboardText()`
- **Constants**: `UPPER_SNAKE_CASE` - `MAX_RETRY_COUNT`
- **Variables**: `camelCase` - `clipboardContent`
- **Classes**: `PascalCase` - `ClipboardManager`
- **Files**: `kebab-case` - `clipboard-handler.js`

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Extension loads without errors
- [ ] Copy operation works in TM1 Web
- [ ] Paste operation works in TM1 Web
- [ ] No console errors
- [ ] Works on all supported browsers
- [ ] Doesn't break existing functionality

### Testing Copy/Paste

1. Open TM1 Web application
2. Select data in a grid
3. Press Ctrl+C (or Cmd+C on Mac)
4. Verify data is in system clipboard
5. Paste into external application (Excel, Notepad, etc.)
6. Copy data from external application
7. Paste into TM1 Web grid
8. Verify data appears correctly

## 🏗️ Architecture Guidelines

### Adding New Features

When adding features, consider:

1. **Backward Compatibility**: Don't break existing functionality
2. **Performance**: Minimize impact on page load and runtime
3. **Security**: Validate all inputs, handle sensitive data carefully
4. **Error Handling**: Gracefully handle all error cases
5. **Browser Support**: Test on Chrome, Edge, and other targets

### Modernization Priorities

We're actively modernizing the codebase. Priority areas:

#### 1. Manifest V3 Migration

```json
// Current (V2)
{
  "manifest_version": 2,
  "background": {
    "page": "background.html",
    "persistent": true
  }
}

// Target (V3)
{
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  }
}
```

#### 2. Modern Clipboard API

```javascript
// Current (deprecated)
document.execCommand('copy');
document.execCommand('paste');

// Target (modern)
await navigator.clipboard.writeText(text);
const text = await navigator.clipboard.readText();
```

#### 3. Async/Await

```javascript
// Current (callback-based)
chrome.runtime.sendMessage({action: "copy"}, function(response) {
  console.log(response);
});

// Target (async/await)
const response = await chrome.runtime.sendMessage({action: "copy"});
console.log(response);
```

## 📚 Documentation Standards

### Code Documentation

- Add JSDoc comments for all public functions
- Explain "why" not just "what"
- Document complex algorithms
- Include usage examples

### README Updates

When adding features, update:
- Features list
- Usage instructions
- API documentation
- Examples

## ⚖️ Legal Considerations

### IBM License

This project is licensed under IBM's proprietary license. By contributing, you agree that your contributions will be licensed under the same terms.

### Copyright Headers

Add copyright headers to new files:

```javascript
// Licensed Materials - Property of IBM
// 
// IBM Cognos Products: tm1web
// 
// (C) Copyright IBM Corp. 2007, 2016
// 
// US Government Users Restricted Rights - Use, duplication or disclosure
// restricted by GSA ADP Schedule Contract with IBM Corp.
```

### Third-Party Code

- Don't include code from other projects without proper attribution
- Ensure all dependencies have compatible licenses
- Document any external code sources

## 🔍 Code Review Process

### What Reviewers Look For

1. **Functionality**: Does it work as intended?
2. **Code Quality**: Is it clean and maintainable?
3. **Tests**: Are there adequate tests?
4. **Documentation**: Is it well-documented?
5. **Style**: Does it follow project conventions?
6. **Performance**: Does it impact performance?
7. **Security**: Are there any security concerns?

### Getting Your PR Merged

- Address all review comments
- Keep PRs focused and small
- Rebase on latest main branch
- Ensure CI passes (when available)
- Get approval from maintainers

## 💬 Communication

### Where to Ask Questions

- **GitHub Issues**: For bugs and feature requests
- **Pull Request Comments**: For code-specific questions
- **GitHub Discussions**: For general questions (if enabled)

### Communication Guidelines

- Be respectful and constructive
- Provide context and examples
- Search existing issues before creating new ones
- Use clear, descriptive titles

## 🎉 Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Mentioned in release notes
- Added to contributors list (when available)

## 📄 License

By contributing, you agree that your contributions will be licensed under the IBM License Agreement for Non-Warranted Programs.

---

**Thank you for contributing!** 🙏

Your efforts help improve IBM Cognos TM1 Web for everyone.

