# Deploy Admin Panel to Vercel

## Quick Steps

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository**: `savage1GALA/luxestore`

4. **Configure the project**:
   - **Project Name**: `luxestore-admin` (or any name you like)
   - **Root Directory**: Click "Edit" and set it to `admin-app`
   - **Framework Preset**: Vite (should auto-detect)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

5. **Add Environment Variable**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://luxestore-production.up.railway.app`

6. **Click "Deploy"**

7. **Wait for deployment to complete** (~1-2 minutes)

8. **Your admin panel will be available at**: `https://luxestore-admin.vercel.app` (or your custom URL)

## After Deployment

✅ You'll have a public URL for your admin panel that you can access from anywhere!

✅ The admin panel will automatically connect to your Railway backend.

## Note

- Keep the admin panel URL private if you don't want everyone to access it
- Only people with the URL will be able to see and manage orders

