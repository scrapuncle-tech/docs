# ScrapeUncle Documentation

This is the documentation site for ScrapeUncle, a digital platform that enables users to dispose of their recyclables (Kabaad) in a responsible & rewarding manner.

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm package manager

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## 📚 Documentation Structure

- **♻️ How It Works** - Main introduction to ScrapeUncle
- **📚 Recycling Guides** - Comprehensive recycling guides
- **🚀 Getting Started** - Installation and setup guides
- **📖 API Reference** - Coupon API documentation
- **🔧 Troubleshooting** - Help and support

## 🌐 Deployment

### GitHub Pages (Recommended)

This site is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Setup Instructions:

1. **Repository Setup**
   - Ensure your repository is named `docs` under the `scrapuncle-tech` organization
   - Or update the `docusaurus.config.js` with your repository details

2. **GitHub Pages Configuration**
   - Go to your repository Settings → Pages
   - Set Source to "GitHub Actions"
   - The workflow will automatically deploy on pushes to main branch

3. **Manual Deployment**
   ```bash
   # Build the site
   npm run build
   
   # Deploy to GitHub Pages
   npm run deploy
   ```

#### Deployment URL
Once deployed, your site will be available at:
```
https://scrapuncle-tech.github.io/docs/
```

### Manual Deployment

If you prefer manual deployment:

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Set Source to "Deploy from a branch"
   - Select `gh-pages` branch and `/ (root)` folder

## 📝 Content Management

### Adding New Documentation
1. Create new `.md` files in the `docs/` directory
2. Update `sidebars.js` to include new pages
3. Commit and push changes
4. GitHub Actions will automatically rebuild and deploy

### File Structure
```
docs/
├── docs/
│   ├── intro.md                    # Main introduction
│   ├── coupon-api.md               # API documentation
│   ├── guides/                     # Recycling guides
│   ├── getting-started/            # Setup guides
│   └── troubleshooting.md          # Help and support
├── src/
│   ├── pages/                      # Custom pages
│   └── css/                        # Custom styles
├── static/                         # Static assets
└── docusaurus.config.js            # Site configuration
```

## 🎨 Customization

### Theme Colors
The site uses a green recycling theme:
- Primary: `#10b981`
- Dark: `#059669`
- Light: `#34d399`

### Styling
- Custom CSS: `src/css/custom.css`
- Homepage: `src/pages/index.js`
- Configuration: `docusaurus.config.js`

## 🔧 Configuration

### Key Settings in `docusaurus.config.js`
- **Base URL**: `/docs/` (for GitHub Pages)
- **Organization**: `scrapuncle-tech`
- **Project**: `docs`
- **Deployment Branch**: `gh-pages`

### Sidebar Configuration
Edit `sidebars.js` to organize your documentation structure.

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check for broken links in markdown files
   - Ensure all referenced files exist
   - Verify markdown syntax

2. **Deployment Issues**
   - Check GitHub Actions logs
   - Verify repository permissions
   - Ensure GitHub Pages is enabled

3. **Styling Issues**
   - Clear cache: `npm run clear`
   - Rebuild: `npm run build`
   - Check CSS syntax

### Getting Help
- Check the [Docusaurus documentation](https://docusaurus.io/docs)
- Review GitHub Actions logs for deployment issues
- Check browser console for frontend errors

## 📄 License

This documentation is part of the ScrapeUncle platform. See the main repository for license information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm start`
5. Submit a pull request

---

**Built with [Docusaurus](https://docusaurus.io/)**
# Test deployment
