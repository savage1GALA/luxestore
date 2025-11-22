# Set Root Directory in Railway - Exact Steps 🎯

You're on the right page! I can see the "Source" section with the "Add Root Directory" link.

## Step-by-Step Instructions

### Step 1: Click "Add Root Directory"
In the **"Source"** section, you should see:
```
Source
├── Source Repo: savage1GALA/luxestore
├── Branch connected to production: main
└── [Add Root Directory (used for build and deploy steps. Docs ↗)] ← CLICK THIS!
```

**Click on the "Add Root Directory" link.**

### Step 2: Enter Root Directory
After clicking, an input field should appear. Type:
```
server
```

### Step 3: Save
Click the save/update button (usually appears automatically or look for "Save" or "Update" button).

### Step 4: Redeploy
After saving:
1. Go to **"Deployments"** tab (next to Settings)
2. Click **"Redeploy"** button (or Railway might auto-redeploy)
3. Watch the deployment logs - it should work now! ✅

---

## What This Does

Setting Root Directory to `server` tells Railway:
- ✅ Your code is in the `server` folder
- ✅ Install dependencies from `server/package.json`
- ✅ Run `node server.js` from the `server` folder
- ✅ Railway will automatically detect your Node.js app

---

## Alternative: If "Add Root Directory" Doesn't Work

1. Click the **pencil icon** ✏️ next to "Source Repo"
2. Look for "Root Directory" field in the edit dialog
3. Enter: `server`
4. Save

---

## After Root Directory is Set

Railway should automatically:
- ✅ Detect your `package.json` in the `server` folder
- ✅ Run `npm install` automatically
- ✅ Use `node server.js` as start command (from your package.json)

Your deployment should succeed! 🚀

---

## If You Still Have Issues

1. Check the **"Deployments"** tab to see logs
2. Make sure the Root Directory shows as `server`
3. If it still fails, check logs for specific errors

But setting Root Directory to `server` should fix the deployment! ✅

