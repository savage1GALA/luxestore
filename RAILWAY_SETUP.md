# Railway Deployment Setup Guide 🚂

Your Railway deployment failed because it couldn't detect your project structure. I've fixed the configuration files!

## What I Fixed

1. ✅ Created `railway.json` - Tells Railway how to build and deploy
2. ✅ Created `Procfile` - Alternative deployment method
3. ✅ Created `nixpacks.toml` - Build configuration
4. ✅ Updated `server.js` - Now uses Railway's PORT environment variable

## Next Steps

### 1. Push the Fixes to GitHub

You need to push the configuration files. Use your Personal Access Token:

```bash
git push
```

When prompted:
- Username: `savage1GALA`
- Password: [Your Personal Access Token]

Or use the token in the URL:
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/savage1GALA/luxestore.git
git push
```

### 2. Configure Railway Service

In your Railway dashboard:

1. **Go to your service settings** (click on "luxestore" service)
2. **Go to "Settings" tab**
3. **Set Root Directory**: `server`
   - This tells Railway where your Node.js app is
4. **Set Start Command** (if not auto-detected): `node server.js`
5. **Set Build Command** (if needed): `npm install`

### 3. Add Environment Variables (Optional)

If you want to restrict CORS to your frontend:
- Variable: `FRONTEND_URL`
- Value: Your frontend URL (when you deploy it)

### 4. Redeploy

After pushing and configuring:
- Railway should automatically redeploy
- Or click "Redeploy" in the Railway dashboard
- Check the "Deployments" tab for status

## Railway Configuration Files Created

### `railway.json`
```json
{
  "deploy": {
    "startCommand": "cd server && node server.js"
  }
}
```

### `Procfile`
```
web: cd server && node server.js
```

### `nixpacks.toml`
```toml
[phases.install]
cmds = ["cd server && npm install"]

[start]
cmd = "cd server && node server.js"
```

## Important: Railway Service Settings

In Railway dashboard, make sure:

1. **Root Directory**: Set to `server` (not root)
2. **Start Command**: `node server.js` (or `cd server && node server.js`)
3. **Build Command**: `npm install` (or `cd server && npm install`)

## After Backend is Deployed

Once your backend is working on Railway:

1. **Get your backend URL**: Railway will give you a URL like `https://luxestore-production.up.railway.app`
2. **Deploy frontend separately**:
   - Create a new service in Railway
   - Set root directory to `client`
   - Build command: `npm install && npm run build`
   - Start command: `npm run preview` (or use a static file server)
3. **Or deploy frontend to Vercel/Netlify** (easier for React apps)

## Troubleshooting

**Still getting errors?**
- Check Railway logs (click "View logs" in deployment)
- Make sure Root Directory is set to `server`
- Verify `package.json` exists in `server` folder
- Check that `server.js` is the entry point

**Port issues?**
- Railway automatically sets `PORT` environment variable
- The server now uses `process.env.PORT || 5000`
- This should work automatically

## Quick Fix Checklist

- [ ] Push configuration files to GitHub
- [ ] Set Root Directory to `server` in Railway
- [ ] Verify Start Command is `node server.js`
- [ ] Redeploy in Railway
- [ ] Check deployment logs

Your backend should deploy successfully now! 🚀

