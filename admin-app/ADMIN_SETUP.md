# Admin Panel Setup

## Connect Admin Panel to Railway Backend

The admin panel needs to connect to your Railway backend to see orders from the deployed website.

### Option 1: Use Environment Variable (Recommended)

Create a file called `.env.local` in the `admin-app` folder with this content:

```
VITE_API_URL=https://luxestore-production.up.railway.app
```

Then restart the admin panel.

### Option 2: Update Code (Already Done)

The code has been updated to check for `VITE_API_URL` environment variable first. If you set it, it will use the Railway backend.

### Quick Fix for Right Now

If you want to connect to Railway immediately without creating a .env file:

1. Stop the admin panel (Ctrl+C in the admin window)
2. Open PowerShell/CMD in the `admin-app` folder
3. Run: `$env:VITE_API_URL="https://luxestore-production.up.railway.app"; npm run dev`
4. Or create `.env.local` file in `admin-app` folder with the URL above

