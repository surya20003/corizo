# Deployment Guide for College Website

## Quick Deployment Options

### 1. GitHub Pages (Recommended - Free)

**Step 1: Create GitHub Repository**
```bash
git init
git add .
git commit -m "Initial commit - College Website"
git branch -M main
git remote add origin https://github.com/yourusername/college-website.git
git push -u origin main
```

**Step 2: Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click Settings > Pages
3. Source: Deploy from a branch
4. Branch: main
5. Folder: / (root)
6. Click Save

**Your website will be live at:** `https://yourusername.github.io/college-website`

### 2. Netlify (Drag & Drop - Free)

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Deploy settings will be auto-detected
6. Click "Deploy site"

**Your website will be live at:** `https://your-site-name.netlify.app`

### 3. Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Framework preset: Other
6. Click "Deploy"

**Your website will be live at:** `https://your-project-name.vercel.app`

## Custom Domain Setup

### For GitHub Pages:
1. Go to repository Settings > Pages
2. Under "Custom domain", enter your domain
3. Configure DNS records as instructed

### For Netlify:
1. Go to Site settings > Domain management
2. Add custom domain
3. Configure DNS records

### For Vercel:
1. Go to Project settings > Domains
2. Add custom domain
3. Configure DNS records

## Performance Optimization

The website is already optimized, but you can:

1. **Enable Gzip compression** (automatically done by most hosting platforms)
2. **Use CDN** (automatically provided by Netlify, Vercel, GitHub Pages)
3. **Minify CSS/JS** (optional for small sites like this)
4. **Add analytics** (Google Analytics, etc.)

## Maintenance

1. **Regular updates**: Update content as needed
2. **Backup**: Keep a copy of your code
3. **Monitor**: Check website performance periodically
4. **Security**: Keep dependencies updated if you add any

## Troubleshooting

**Common Issues:**
- **404 errors**: Check file paths and capitalization
- **Styling issues**: Clear browser cache
- **Form not working**: Need backend integration
- **Slow loading**: Optimize images

**Solutions:**
- Use browser developer tools to debug
- Check console for JavaScript errors
- Validate HTML/CSS using online tools
- Test on different browsers and devices
