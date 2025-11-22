# How to Find Railway Service Settings ⚙️

You're currently on **Project Settings** (the whole project). You need **Service Settings** (for the "luxestore" service specifically).

## Step-by-Step Instructions

### Step 1: Go Back to Architecture View

1. **Click on "Architecture" tab** (in the top navigation bar)
   - You should see your "luxestore" service as a purple box

### Step 2: Click on the Service

1. **Click directly on the "luxestore" service box** (the purple rectangle)
   - This opens the service details

### Step 3: Find Service Settings

After clicking on the service, you should see tabs for that service:
- **Deployments** (shows your deployment history)
- **Variables** (environment variables)
- **Metrics** (performance data)
- **Settings** ← **This is what you need!**

Click on **"Settings"** tab for the service.

### Step 4: Configure Service Settings

In the Service Settings tab, look for:

1. **Source Section**:
   - **Root Directory**: Change this to `server`
   - This tells Railway where your code is located

2. **Build & Deploy Section**:
   - **Start Command**: Should show `node server.js` or `npm start`
   - **Build Command**: Should show `npm install`
   - These might auto-detect from your config files

---

## Alternative: If You Don't See Settings Tab

Railway's UI might be different. Try these:

### Option A: Three Dots Menu

1. Click on the "luxestore" service
2. Look for three dots **⋮** (usually top right)
3. Click it → Look for "Settings" or "Configure"

### Option B: Service Menu

1. Click on the "luxestore" service
2. In the service view, look for a menu/sidebar
3. Find "Settings" or "Configuration"

### Option C: Delete and Recreate

If you can't find settings:

1. **Delete the current service**:
   - Click on "luxestore" service
   - Look for "Delete" option (usually in Settings or menu)
   - Confirm deletion

2. **Create new service**:
   - Click **"+ New"** button (top right)
   - Select **"GitHub Repo"**
   - Choose your `luxestore` repository
   - **Before clicking Deploy**, look for a **"Configure"** or **"Settings"** button
   - Set Root Directory to `server`
   - Then click "Deploy"

---

## Visual Guide

```
Railway Dashboard:
┌─────────────────────────────────────────┐
│  [Architecture] [Observability] [Logs] [Settings]  │ ← You are here (Project level)
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────┐                        │
│  │  luxestore   │ ← Click THIS service  │
│  │  [Failed]    │                        │
│  └──────────────┘                        │
│                                          │
└─────────────────────────────────────────┘

After clicking service:
┌─────────────────────────────────────────┐
│  luxestore                              │
│  [Deployments] [Variables] [Metrics] [Settings] ← Service level tabs
├─────────────────────────────────────────┤
│  Service Settings:                      │
│  • Root Directory: [server]  ← HERE!    │
│  • Start Command: [node server.js]      │
└─────────────────────────────────────────┘
```

---

## Still Can't Find It?

If Railway's UI is confusing, I recommend switching to **Render** instead - it has much clearer settings!

See `DEPLOY_RENDER.md` for step-by-step instructions. Render makes it super easy! 🚀

