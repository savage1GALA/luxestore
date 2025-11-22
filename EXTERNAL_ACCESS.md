# Sharing Your Site with Friends 🌐

Your friends can access your Luxe Store from anywhere in the world! Here are the options:

## ⚠️ Password/Warning Page Issues?

If you're seeing password prompts or warning pages with tunneling services, **deploy your site** for a truly public experience with no barriers! See `DEPLOY_GUIDE.md` for the best permanent solution.

## Option 1: Deploy to Free Hosting (Best - No Passwords!) ⭐⭐⭐

**Want a truly public site with NO password pages or warnings? Deploy it!**

This is the best permanent solution:
- ✅ Completely public - no passwords or warnings
- ✅ Permanent URL that stays the same
- ✅ Works 24/7 (even when your PC is off)
- ✅ Professional hosting - faster and more reliable

**Quick Start**: See `DEPLOY_GUIDE.md` for step-by-step instructions!

Recommended services:
- **Railway** (easiest) - https://railway.app
- **Render** (full stack) - https://render.com
- **Vercel** (frontend) - https://vercel.com

---

## Option 1b: Using LocalTunnel (Temporary - May Show Warning Page)

LocalTunnel works but shows a warning page on first visit that users must click through.

### Steps:

1. **Run the script**:
   - Double-click `start-localtunnel.bat`
   - It will automatically install LocalTunnel if needed (via npm)

2. **Get your public URL**:
   - Look at the "LocalTunnel" window that opens
   - You'll see a URL like: `https://xxxx.loca.lt`

3. **Share the URL** with your friends!
   - ⚠️ First visit WILL show a warning page - users must click "Continue"
   - This is a security feature and cannot be disabled on free tier

**Note**: 
- No signup or account required
- Free forever
- URL changes each time
- ⚠️ Shows warning page (requires user interaction)

---

## Option 2: Using Cloudflare Quick Tunnel (No Password, But May Have Cert Issues)

Cloudflare Tunnel works without passwords, but may have setup issues.

ngrok creates a public URL that tunnels to your local server. It's free and super easy!

### Steps:

1. **Install ngrok** (if not already installed):
   - Download from: https://ngrok.com/download
   - Or install via chocolatey: `choco install ngrok`
   - Or install via npm: `npm install -g ngrok`

2. **Get a free ngrok account** (for custom URLs):
   - Sign up at: https://dashboard.ngrok.com/signup
   - Get your authtoken from the dashboard
   - Run: `ngrok config add-authtoken YOUR_TOKEN`

3. **Start your servers** first:
   - Run `start.bat` to start all your servers

4. **Create public tunnel**:
   - Run `start-public.bat` (this will create a public URL)
   - Or manually run: `ngrok http 3000`
   - You'll get a URL like: `https://abc123.ngrok.io`

5. **Share the URL** with your friends!
   - They can access: `https://your-ngrok-url.ngrok.io`
   - The URL works from anywhere in the world!

### Note:
- The free ngrok URL changes each time you restart ngrok (unless you have a paid plan)
- Keep the ngrok window open while sharing with friends

---

## Option 3: Using Serveo (SSH-based, No Install)

Serveo uses SSH (built into Windows 10/11) - no installation needed!

1. **Run the script**:
   - Double-click `start-serveo.bat`
   - Requires SSH (should be built into Windows)

2. **Get your URL**:
   - URL appears in the window (e.g., `https://xxxx.serveo.net`)

3. **Share with friends!**

**Note**: Uses SSH tunneling - completely free, no signup.

---

## Option 4: Using Bore (No Password Pages - Requires Installation)

Bore creates truly public URLs with no authentication pages, but requires installation.

Cloudflare Tunnel is free and works without authentication when using "quick tunnel" mode.

### Quick Tunnel (No Login Required) ⚡

1. **Install cloudflared**:
   - Download from: https://github.com/cloudflare/cloudflared/releases
   - Download `cloudflared-windows-amd64.exe` for Windows
   - Rename to `cloudflared.exe`
   - Add to your PATH or place in a folder accessible from command line

2. **Start your servers first**:
   - Run `start.bat` to start all your servers

3. **Create quick tunnel** (no authentication needed):
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
   - Or just run `start-cloudflare.bat` (automated)

4. **Share the provided URL** (e.g., `https://xxxx.trycloudflare.com`) with friends!

**Note**: Quick tunnels don't require login. If you see a certificate error, make sure you're using the `--url` flag (quick tunnel mode) and not trying to create a named tunnel.

---

## Option 5: Port Forwarding (Advanced)

If you have access to your router and want a permanent solution:

1. **Get your public IP**: Visit https://whatismyipaddress.com/
2. **Set up port forwarding** on your router:
   - Forward port 3000 to your local IP (e.g., 192.168.1.100)
   - Check your router manual for port forwarding instructions
3. **Update firewall** to allow incoming connections on port 3000
4. **Share**: `http://YOUR_PUBLIC_IP:3000`

⚠️ **Security Warning**: This exposes your server to the internet. Make sure your router has a firewall enabled.

---

## Option 6: Deploy to a Cloud Service (Recommended - See DEPLOY_GUIDE.md)

For a permanent, truly public solution with no passwords or warnings:
- See `DEPLOY_GUIDE.md` for detailed deployment instructions
- Recommended: Railway, Render, or Vercel (all free)

For a permanent, professional solution:

- **Vercel** (Free): Great for React apps
- **Netlify** (Free): Easy deployment
- **Railway** (Free tier): Full stack hosting
- **Render** (Free tier): Simple deployment

---

## Quick Start Options

### ⭐ Best: Deploy Your Site (See DEPLOY_GUIDE.md)
For a truly public site with NO passwords or warnings - deploy to free hosting!

### Quick Tunnel Scripts (May Have Password/Warning Pages):

**Scripts Available:**
- `start-localtunnel.bat` - LocalTunnel (shows warning page on first visit)
- `start-serveo.bat` - Uses SSH (built into Windows)
- `start-cloudflare.bat` - Cloudflare Tunnel (may have setup issues)
- `start-bore.bat` - Bore (no password, but requires installation)
- `start-public.bat` - Uses ngrok (requires signup)

**All tunnel scripts will:**
1. Start all your servers
2. Create a public tunnel automatically
3. Display the public URL you can share

⚠️ **Note**: Most tunneling services show warning pages or require authentication. For a truly public site, **deploy to hosting** (see `DEPLOY_GUIDE.md`)! 🚀

