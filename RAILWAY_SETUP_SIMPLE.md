# Railway Deployment - Step by Step 🚂

## The Problem
Railway couldn't detect your project because the server is in the `server` folder, not the root.

## The Solution - 2 Options:

---

## Option 1: Configure Service in Railway Dashboard (Easiest)

### Step 1: In Railway Dashboard

1. **Click on your service** "luxestore" (the purple box on the left)

2. **You should see tabs**: Architecture | Observability | Logs | **Settings**
   - Click on **"Settings"** tab

3. **Look for these sections**:

   **a) Source**
   - Root Directory: Change from `/` to `server`
   - This tells Railway where your code is

   **b) Build & Deploy**
   - Start Command: Should auto-detect `node server.js`
   - Build Command: Should auto-detect `npm install`

### Step 2: If you can't find Root Directory setting

Railway might have changed the UI. Try this:

1. **In the service view, look for**:
   - A gear icon ⚙️
   - "Configure" button
   - "Settings" button at the top right
   - Or click the three dots menu ⋯ next to your service

2. **Alternative**: Railway might auto-detect if files are configured correctly (which they are now!)

---

## Option 2: Use Railway CLI (Alternative)

If the dashboard doesn't work, use Railway CLI:

### Install Railway CLI:
```bash
npm install -g @railway/cli
```

### Login:
```bash
railway login
```

### Link your project:
```bash
railway link
```

### Set root directory:
```bash
railway variables set RAILWAY_SERVICE_ROOT_DIR=server
```

---

## Option 3: Create Separate Service (Recommended if Option 1 doesn't work)

Since you have both frontend and backend, deploy them separately:

### Step 1: Delete Current Service (optional)
- In Railway, delete the current "luxestore" service
- Or keep it and create a new one

### Step 2: Create New Service for Backend

1. In Railway dashboard, click **"+ New"** (top right)
2. Select **"GitHub Repo"**
3. Choose your `luxestore` repository
4. **Important**: Before deploying, click **"⚙️ Settings"** or **"Configure"**
5. Set **Root Directory** to: `server`
6. Click **"Deploy"**

### Step 3: Check Deployment

After deployment:
- Check the "Deployments" tab
- Click on the latest deployment
- Click "View logs" to see if it's working

---

## What to Look For in Railway Dashboard

Railway's UI might look like this:

```
┌─────────────────────────────────────┐
│  luxestore              [Settings]  │  ← Click Settings here
├─────────────────────────────────────┤
│  [Deployments] [Variables] [Metrics]│
│                                     │
│  Service Configuration:             │
│  • Root Directory: [server]         │  ← Change this
│  • Start Command: [node server.js]  │  ← Auto-detect
│                                     │
└─────────────────────────────────────┘
```

Or it might be:
```
┌──────────────────────────┐
│  luxestore               │
│  [⋮ Menu]                │  ← Three dots menu
│                         │
│  Configuration:         │
│  Root: [server]         │  ← Here
└──────────────────────────┘
```

---

## Alternative: Use Environment Variables

If you can't find the settings:

1. Go to **"Variables"** tab in Railway
2. Add these environment variables:
   - `RAILWAY_SERVICE_ROOT_DIR=server`
   - `PORT=5000` (Railway sets this automatically, but you can override)

---

## Quick Checklist

✅ Configuration files created (`railway.json`, `Procfile`, `nixpacks.toml`)
✅ Server updated to use `process.env.PORT`
✅ `package.json` has `start` script
⏳ Need to configure Root Directory in Railway (if option available)

---

## If Nothing Works - Use Render Instead

If Railway is too complicated, try **Render**:

1. Go to https://render.com
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your repository
5. **Root Directory**: `server`
6. **Build Command**: `npm install`
7. **Start Command**: `node server.js`
8. Click **"Create Web Service"**

Render has clearer settings! ✅

---

## Need More Help?

Can you tell me:
1. What tabs/sections you see when you click on "luxestore" service?
2. Do you see a "Settings" or "Configure" button?
3. Or send a screenshot of what you see?

This will help me give you exact instructions! 🚀

