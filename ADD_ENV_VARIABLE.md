# Add Environment Variable to Vercel 🔧

## Current Issue

Your frontend is deployed but without `VITE_API_URL`, it's trying to use the Vercel URL for API calls, which won't work. Your backend is on Railway!

---

## Step 1: Get Your Railway Backend URL

1. Go to Railway dashboard
2. Click on your "luxestore" service
3. Check the top of the page - is there a public URL shown?
   - Or click "Settings" tab → "Networking" section
   - Look for "Public Domain" or generate one
   - URL should look like: `https://luxestore-production.up.railway.app`

---

## Step 2: Add Environment Variable in Vercel

### Option A: Add in Project Settings (Recommended)

1. **In Vercel dashboard**, click on your **"luxestore"** project
2. Click **"Settings"** tab (top navigation)
3. Click **"Environment Variables"** in the left sidebar
4. **Add new variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://luxestore-production.up.railway.app`)
   - **Environments**: Check "Production", "Preview", "Development" (or at least "Production")
5. Click **"Save"**

### Option B: Add During Deployment (If Still on New Project Page)

1. In the "Environment Variables" section
2. Click **"+ Add More"**
3. Enter:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Railway backend URL
4. Then click "Deploy"

---

## Step 3: Redeploy Frontend

After adding the environment variable:

1. **Go to "Deployments" tab** in Vercel
2. **Click the three dots** ⋮ on the latest deployment
3. **Click "Redeploy"**
   - OR just make a small change and push to GitHub (auto-deploys)
   - OR wait - Vercel might auto-redeploy with new env vars

---

## Step 4: Test Your Site

1. Visit your Vercel URL (e.g., `https://luxestore.vercel.app`)
2. **Open browser console** (F12) → "Console" tab
3. **Try to:**
   - View products - Check console for errors
   - Add items to cart - Should work now
   - Place an order - Should connect to Railway backend

**If you see errors in console**, share them and I'll help fix!

---

## Quick Test

**Without env variable**: API calls try to go to Vercel URL (fails)  
**With env variable**: API calls go to Railway backend (works!) ✅

---

## Need Help?

**Tell me:**
1. What's your Railway backend URL?
2. Can you see products loading on your Vercel site?
3. Any errors in the browser console (F12)?

I'll help you get it working! 🚀

