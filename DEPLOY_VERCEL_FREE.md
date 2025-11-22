# Deploy to Vercel - 100% Free, NO Credit Card! 🆓

Vercel is perfect for React apps and requires **NO credit card**!

---

## Deploy Frontend to Vercel

### Step 1: Sign Up (No Card Needed!)

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Continue with GitHub"**
3. Authorize with GitHub
4. **No credit card required!** ✅

### Step 2: Deploy Frontend

1. **Click "Add New..." → "Project"**
2. **Import your repository**:
   - Find `savage1GALA/luxestore`
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: Click "Edit" → Change to `client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add:
     - **Key**: `VITE_API_URL`
     - **Value**: (Your backend URL - we'll set this after deploying backend)
     - Click "Add"

5. **Click "Deploy"**
6. **Wait 1-2 minutes** → Get URL like: `https://luxestore.vercel.app`

✅ **Frontend deployed!**

---

## Deploy Backend Separately

For backend, use one of these (all free, no card):

### Option A: Cyclic.sh (Easiest for Backend)

1. Go to https://cyclic.sh
2. Sign up with GitHub
3. Click "Create App"
4. Connect `savage1GALA/luxestore` repository
5. Set:
   - **Root Directory**: `server`
   - **Start Command**: `node server.js`
6. Deploy → Get URL like: `https://luxestore.cyclic.app`

7. **Update Vercel environment variable**:
   - Go back to Vercel project
   - Settings → Environment Variables
   - Update `VITE_API_URL` to your Cyclic backend URL
   - Redeploy frontend

### Option B: Fly.io (Free, No Card)

1. Install Fly CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Sign up: `fly auth signup`
3. Deploy: `fly launch` (from server folder)
4. Get URL and update Vercel env variable

---

## After Both Are Deployed

1. **Backend URL**: `https://your-backend.cyclic.app` (or fly.io)
2. **Frontend URL**: `https://luxestore.vercel.app`
3. **Share frontend URL** - works for anyone, anywhere! ✅

---

## Why Vercel + Cyclic?

- ✅ **100% Free** - No credit cards needed
- ✅ **Easy setup** - Clear interface
- ✅ **Fast** - Professional hosting
- ✅ **No limits** - Free tier is generous

**Perfect solution if you don't have a credit card!** 🚀

