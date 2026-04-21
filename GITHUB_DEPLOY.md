# How to Deploy to GitHub Pages

## Step-by-Step Instructions

### Method 1: Using GitHub Web Interface (Easiest - No Git Required)

1. **Create GitHub Account**
   - Go to https://github.com
   - Click "Sign up" and create a free account

2. **Create New Repository**
   - Click the "+" icon in top right corner
   - Select "New repository"
   - Repository name: `college-website`
   - Description: `Static college website`
   - Make it **Public**
   - **Do NOT** initialize with README (we already have files)
   - Click "Create repository"

3. **Upload Your Files**
   - On the new repository page, click "Add file" > "Upload files"
   - Drag and drop ALL your files:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `README.md`
     - `deploy.md`
     - `QUICK_DEPLOY.md`
   - Commit changes: "Add college website files"
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to your repository
   - Click "Settings" tab
   - Scroll down to "Pages" section in left menu
   - Source: Select "Deploy from a branch"
   - Branch: Select "main"
   - Folder: Select "/ (root)"
   - Click "Save"

5. **Wait for Deployment**
   - GitHub will build your site (takes 1-2 minutes)
   - You'll see a green checkmark when ready
   - Your site URL will appear: `https://yourusername.github.io/college-website`

### Method 2: Using Git Command Line (If Git is Installed)

1. **Install Git** (if not installed)
   - Download from https://git-scm.com/download/win
   - Install with default settings

2. **Initialize Git Repository**
   ```bash
   cd C:\Users\LENOVO\CascadeProjects\college-website
   git init
   ```

3. **Add Remote Repository**
   ```bash
   git remote add origin https://github.com/yourusername/college-website.git
   ```

4. **Add and Commit Files**
   ```bash
   git add .
   git commit -m "Initial commit - College website"
   ```

5. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

6. **Enable Pages** (follow step 4 above)

## What Happens After Deployment?

- Your website will be live at: `https://yourusername.github.io/college-website`
- GitHub automatically serves your `index.html` as the main page
- Updates: Push new changes to GitHub and Pages will auto-update

## Custom Domain (Optional)

1. Buy a domain from any registrar (GoDaddy, Namecheap, etc.)
2. In GitHub repository: Settings > Pages > Custom domain
3. Enter your domain name
4. Configure DNS records as instructed by GitHub

## Troubleshooting

**404 Error:**
- Make sure `index.html` is in the root folder
- Check file names (case-sensitive)

**Styling Issues:**
- Verify `styles.css` path in HTML
- Clear browser cache

**Not Updating:**
- Wait 5-10 minutes after pushing changes
- Check GitHub Actions for build status

## Success!

Once deployed, share your GitHub Pages URL with anyone to showcase your college website!
