# Quick Admin Panel Access

## Option 1: Local Access (Right Now)

1. **Double-click `START.bat`** (if not already running)

2. **Open your browser and go to**: 
   ```
   http://localhost:3001
   ```

3. **Done!** You'll see the admin panel with all orders.

---

## Option 2: Deploy to Vercel (Public Access)

If you want to access the admin panel from anywhere (phone, different computer, etc.):

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Click "Add New" → "Project"**
3. **Import your GitHub repo**: `savage1GALA/luxestore`
4. **Set Root Directory to**: `admin-app`
5. **Add Environment Variable**:
   - Name: `VITE_API_URL`
   - Value: `https://luxestore-production.up.railway.app`
6. **Deploy!**

After deployment, you'll get a public URL like: `https://luxestore-admin.vercel.app`

---

## Quick Start (Local)

Just run this in a terminal:

```bash
cd admin-app
npm run dev
```

Then open: http://localhost:3001

