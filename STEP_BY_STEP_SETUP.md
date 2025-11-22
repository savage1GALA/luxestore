# Step-by-Step: Connect Frontend to Backend 🚀

## What We're Doing

Connecting your Vercel frontend to your Railway backend so your website works completely!

---

## STEP 1: Get Your Railway Backend URL

### 1.1 Open Railway Dashboard
- Go to: https://railway.app
- Sign in with your GitHub account
- You should see your "luxestore" project

### 1.2 Click on Your Service
- Click on the **"luxestore"** service (the purple box/card)

### 1.3 Check for Public URL
Look at the top of the service page:
- **Do you see a URL** like `https://luxestore-production.up.railway.app`?
  - ✅ **YES**: Copy this URL! Write it down: _________________
  - ❌ **NO**: Continue to Step 1.4

### 1.4 Make Service Public (If No URL Shown)
- Click the **"Settings"** tab (at the top, next to "Details")
- Scroll down to **"Networking"** section
- Look for **"Public Networking"** or **"Generate Domain"**
- Click **"Generate Domain"** or **"Expose"** button
- Wait a few seconds
- Copy the URL that appears (should look like `https://luxestore-production.up.railway.app`)
- Write it down: _________________

### 1.5 Verify Backend is Working
- Copy your Railway URL
- Open it in a new browser tab
- Add `/api/test` to the end: `https://your-url.up.railway.app/api/test`
- You should see: `{"message":"Server is running"...}`
- ✅ **If you see this, your backend works!**

**✅ DONE WITH STEP 1!** You now have your Railway backend URL.

---

## STEP 2: Add Environment Variable to Vercel

### 2.1 Open Vercel Dashboard
- Go to: https://vercel.com
- Sign in with your GitHub account
- You should see your "luxestore" project

### 2.2 Open Project Settings
- Click on your **"luxestore"** project
- Click the **"Settings"** tab (top navigation bar)

### 2.3 Go to Environment Variables
- In the left sidebar, click **"Environment Variables"**
- You'll see a list of environment variables (might be empty)

### 2.4 Add New Environment Variable
- Click **"Add New"** or **"Add"** button (usually at the top)
- **Key**: Type `VITE_API_URL` (exactly like this, no spaces)
- **Value**: Paste your Railway backend URL from Step 1 (e.g., `https://luxestore-production.up.railway.app`)
- **Environments**: Check these boxes:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development
- Click **"Save"** button

### 2.5 Verify Variable Added
- You should now see `VITE_API_URL` in the list with your Railway URL as the value
- ✅ **DONE WITH STEP 2!**

---

## STEP 3: Redeploy Your Frontend

### 3.1 Go to Deployments
- Still in Vercel, click **"Deployments"** tab (top navigation)
- You'll see a list of deployments

### 3.2 Redeploy Latest Deployment
- Find the **most recent deployment** (should be at the top)
- Click the **three dots** ⋮ button (on the right side)
- Click **"Redeploy"** from the menu
- Confirm by clicking **"Redeploy"** again in the popup

### 3.3 Wait for Deployment
- You'll see "Building..." then "Ready" status
- Wait 1-2 minutes for it to complete
- You should see a green checkmark ✅ when done

**✅ DONE WITH STEP 3!**

---

## STEP 4: Test Your Website

### 4.1 Open Your Vercel URL
- In Vercel, go back to **"Deployments"** tab
- Click on the top deployment
- Click **"Visit"** button (or copy the URL shown)
- Your URL should be like: `https://luxestore.vercel.app`
- Open it in a new browser tab

### 4.2 Check If Products Load
- You should see your Luxe Store homepage
- Click on **"Explore Collection"** or go to Products page
- **Do products show up?**
  - ✅ **YES**: Great! Continue to Step 4.3
  - ❌ **NO**: Check Step 5 (Troubleshooting)

### 4.3 Test Adding to Cart
- Click on a product
- Click **"Add to Cart"** button
- **Does it add to cart?**
  - ✅ **YES**: Excellent! Continue to Step 4.4
  - ❌ **NO**: Check Step 5 (Troubleshooting)

### 4.4 Test Checkout (Optional)
- Go to Cart page
- Try to place an order
- Fill in the form
- **Does it submit successfully?**
  - ✅ **YES**: Perfect! Everything works!
  - ❌ **NO**: Check Step 5 (Troubleshooting)

**✅ DONE WITH STEP 4!**

---

## STEP 5: Troubleshooting (If Something Doesn't Work)

### 5.1 Open Browser Console
- Press **F12** on your keyboard (or right-click → "Inspect")
- Click **"Console"** tab
- Look for any **red error messages**

### 5.2 Common Issues

**Issue: "Failed to fetch" or "Network error"**
- Check if your Railway URL is correct
- Make sure Railway backend is still "Active"
- Verify the environment variable was saved in Vercel

**Issue: Products don't load**
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Make sure you redeployed after adding the variable

**Issue: CORS error**
- Go to Railway → Your service → "Variables" tab
- Add environment variable:
  - Key: `FRONTEND_URL`
  - Value: Your Vercel URL (e.g., `https://luxestore.vercel.app`)
- Railway will auto-redeploy

### 5.3 Check Railway Backend
- Go to Railway → Your service → "Deploy Logs" tab
- Check if there are any errors
- Make sure status shows "Active" ✅

### 5.4 Double-Check Environment Variable
- Go back to Vercel → Settings → Environment Variables
- Make sure `VITE_API_URL` is exactly spelled like that
- Make sure the Railway URL doesn't have a trailing slash `/`
- Should be: `https://luxestore-production.up.railway.app` (NOT with `/` at the end)

---

## STEP 6: Share Your Website! 🎉

### 6.1 Get Your Public URL
- Your Vercel frontend URL: `https://luxestore.vercel.app` (or your custom URL)
- **This is the URL you share with friends!**

### 6.2 Test from Mobile
- Open the URL on your phone/tablet
- It should work from anywhere in the world!
- ✅ **Anyone can now access your website!**

### 6.3 Share with Friends
- Send them your Vercel URL
- They can access it from any device, anywhere
- No passwords, no warnings, completely public! 🚀

---

## Quick Checklist

- [ ] Got Railway backend URL
- [ ] Added `VITE_API_URL` to Vercel
- [ ] Redeployed frontend
- [ ] Tested products loading
- [ ] Tested cart functionality
- [ ] Shared URL with friends!

---

## Need Help?

If you're stuck at any step, tell me:
1. Which step are you on?
2. What do you see?
3. Any error messages?

I'll help you fix it! 🚀

