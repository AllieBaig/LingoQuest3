# Deployment Guide

## Quick Deploy to GitHub

### 1. Export from Replit to GitHub

1. In Replit, click on the "Version Control" tab (git icon)
2. Click "Create a Git Repo"
3. Connect your GitHub account if not already connected
4. Click "Connect to GitHub" and create a new repository
5. Name your repository (e.g., "lingoquest-game")
6. Set repository visibility (Public recommended for open source)
7. Click "Create GitHub repository"

### 2. Alternative: Manual GitHub Setup

If you prefer manual setup:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: LingoQuest senior-friendly MCQ game"

# Add GitHub remote
git remote add origin https://github.com/yourusername/lingoquest-game.git

# Push to GitHub
git push -u origin main
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your LingoQuest repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add environment variables if needed
6. Click "Deploy"

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click "New site from Git"
3. Choose your LingoQuest repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

### Option 3: Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your LingoQuest repository
5. Railway will auto-detect and deploy

### Option 4: Render

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click "New +"
3. Select "Web Service"
4. Connect your LingoQuest repository
5. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Click "Create Web Service"

## Build Configuration

The project includes a build script in `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "start": "node server/index.js",
    "dev": "NODE_ENV=development tsx server/index.ts"
  }
}
```

## Environment Variables

For production deployment, you may need to set:

- `NODE_ENV=production`
- `PORT` (usually auto-set by hosting platforms)

## Database Migration

Currently using in-memory storage. For production:

1. Set up PostgreSQL database
2. Update `drizzle.config.ts` with production database URL
3. Run migrations: `npm run db:migrate`
4. Update storage implementation to use database

## PWA Features

The app includes:
- Service Worker (`client/public/sw.js`)
- Web App Manifest (`client/public/manifest.json`)
- Offline capability

These work automatically once deployed.

## Post-Deployment

1. Test all game modes (General Knowledge and HollyBolly)
2. Verify PWA installation on mobile devices
3. Check accessibility features
4. Test on different screen sizes
5. Verify reward system in HollyBolly mode

## Troubleshooting

### Build Issues
- Ensure all TypeScript types are resolved
- Check that all imports are correct
- Verify all dependencies are in `package.json`

### Runtime Issues
- Check browser console for errors
- Verify API endpoints are accessible
- Test on different browsers and devices

### Performance
- Enable compression on hosting platform
- Configure caching headers
- Monitor loading times

## Custom Domain

Most hosting platforms allow custom domains:
1. Purchase domain from registrar
2. Add domain in hosting platform settings
3. Update DNS records as instructed
4. Enable HTTPS (usually automatic)