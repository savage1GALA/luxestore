# Fix "Error submitting order" Issue 🔧

## The Problem

Your checkout form shows "Error submitting order. Please try again."
This means the frontend (Vercel) can't connect to your backend (Railway).

---

## Quick Fix Steps

### Step 1: Check Browser Console for Actual Error

1. **On your checkout page** (where the error appears)
2. **Press F12** on your keyboard (opens Developer Tools)
3. **Click "Console" tab**
4. **Look for RED error messages**
5. **What errors do you see?**
   - "Failed to fetch"
   - "Network error"
   - "CORS error"
   - "404 Not Found"
   - Something else?

**Tell me what error you see** - this will help fix it!

---

### Step 2: Verify Environment Variable is Set

1. Go to **Vercel Dashboard**: https://vercel.com
2. Click on your **"luxestore"** project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** (left sidebar)
5. **Do you see `VITE_API_URL` in the list?**
   - ✅ **YES**: What's the value? Is it your Railway URL?
   - ❌ **NO**: You need to add it (see below)

---

### Step 3: Verify Railway Backend is Working

1. Go to **Railway Dashboard**: https://railway.app
2. Click on your **"luxestore"** service
3. **Is it "Active"?** ✅
4. **Get your Railway backend URL** (from Settings → Networking)
5. **Test the backend**:
   - Open: `https://your-railway-url.up.railway.app/api/test`
   - You should see: `{"message":"Server is running"...}`
   - ✅ **If this works, backend is fine**
   - ❌ **If this fails, backend has issues**

---

### Step 4: Check CORS Settings

Your backend needs to allow requests from your Vercel frontend.

1. **Go to Railway** → Your service → **"Variables"** tab
2. **Check if you have**:
   - Key: `FRONTEND_URL`
   - Value: `https://luxestore-theta.vercel.app`
3. **If NOT, add it**:
   - Click "New Variable"
   - Key: `FRONTEND_URL`
   - Value: `https://luxestore-theta.vercel.app` (your Vercel URL)
   - Save
4. **Railway will auto-redeploy** (wait 1-2 minutes)

---

### Step 5: Verify Environment Variable Value

1. **In Vercel** → Settings → Environment Variables
2. **Check `VITE_API_URL` value**:
   - Should be your Railway backend URL
   - Should NOT have trailing slash `/` at the end
   - Should be like: `https://luxestore-production.up.railway.app`
   - NOT like: `https://luxestore-production.up.railway.app/` ❌

3. **If wrong, edit it**:
   - Click the pencil icon ✏️
   - Fix the value
   - Save

4. **Redeploy frontend**:
   - Go to "Deployments" tab
   - Click three dots ⋮ on latest deployment
   - Click "Redeploy"
   - Wait for it to finish

---

## Common Issues & Solutions

### Issue 1: "Failed to fetch" or Network Error

**Cause**: Frontend can't reach backend  
**Fix**:
- Make sure `VITE_API_URL` is set correctly in Vercel
- Make sure Railway backend URL is correct
- Make sure Railway service is "Active"
- Redeploy Vercel frontend after setting env variable

### Issue 2: CORS Error

**Cause**: Backend blocking frontend requests  
**Fix**:
- Add `FRONTEND_URL` environment variable to Railway (see Step 4)
- Make sure value is exactly: `https://luxestore-theta.vercel.app`
- Wait for Railway to redeploy

### Issue 3: 404 Not Found

**Cause**: Backend URL is wrong or endpoint doesn't exist  
**Fix**:
- Verify Railway URL is correct
- Test backend: `https://your-railway-url/api/test` should work
- Make sure Railway service is actually running

### Issue 4: Environment Variable Not Working

**Cause**: Variable not set or not redeployed  
**Fix**:
- Double-check variable is saved in Vercel
- Make sure you redeployed after adding it
- Check that variable name is exactly `VITE_API_URL` (case-sensitive)

---

## Quick Checklist

- [ ] Checked browser console for actual error message
- [ ] Verified `VITE_API_URL` is set in Vercel
- [ ] Verified Railway backend is "Active"
- [ ] Tested Railway backend URL directly (add /api/test)
- [ ] Added `FRONTEND_URL` to Railway variables
- [ ] Redeployed Vercel frontend after changes
- [ ] Verified Railway URL has no trailing slash

---

## Need More Help?

**Tell me:**
1. **What error do you see in browser console?** (Press F12 → Console tab)
2. **Is `VITE_API_URL` set in Vercel?** What's the value?
3. **What's your Railway backend URL?**
4. **Is Railway service "Active"?**

With this info, I can help you fix it! 🚀

