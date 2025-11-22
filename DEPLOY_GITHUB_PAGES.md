# Deploy to GitHub Pages - 100% FREE, No Card! 🆓

GitHub Pages is completely free and requires NO credit card!

---

## Deploy Frontend to GitHub Pages

### Step 1: Build Frontend

1. Open terminal in your project folder
2. Build the frontend:
   ```bash
   cd client
   npm install
   npm run build
   ```
3. This creates a `dist` folder with your built site

### Step 2: Push Build to GitHub

1. **Create a separate branch for GitHub Pages** (optional, but recommended):
   ```bash
   git checkout -b gh-pages
   ```

2. **Copy dist folder to root** (GitHub Pages needs it at root):
   ```bash
   # Copy dist contents to root
   cp -r client/dist/* .
   # Or on Windows PowerShell:
   Copy-Item -Path "client\dist\*" -Destination "." -Recurse
   ```

3. **Or simpler**: Deploy just the `client/dist` folder

### Step 3: Setup GitHub Pages

1. Go to https://github.com/savage1GALA/luxestore
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** section
4. **Source**:
   - Select branch: `gh-pages` or `main`
   - Select folder: `/client/dist` or `/ (root)`
   - Click "Save"

5. **Wait 1-2 minutes**
6. **Get your URL**: `https://savage1GALA.github.io/luxestore`

✅ **Frontend is live!**

---

## Deploy Backend

For backend, use:
- **Cyclic.sh**: https://cyclic.sh (free, no card)
- **Fly.io**: https://fly.io (free, no card)
- **Render**: Try free tier (might work without card)

See `DEPLOY_VERCEL_FREE.md` for backend options.

---

## Update Frontend to Use Backend

1. After backend is deployed, get backend URL
2. Update `client/src/config/api.js`:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.cyclic.app'
   ```
3. Rebuild and push again:
   ```bash
   cd client
   npm run build
   # Push dist folder to GitHub
   ```

---

## That's It! ✅

- **Frontend**: `https://savage1GALA.github.io/luxestore`
- **Backend**: Your backend URL
- **Completely free, no credit card!** 🎉

