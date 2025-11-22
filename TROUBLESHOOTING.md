# Troubleshooting Guide 🔧

## Cloudflare Tunnel Certificate Error

**Error**: `Cannot determine default origin certificate path. No file cert.pem`

**Solution**: 
- You're seeing this because cloudflared is looking for authentication certificates
- **Quick Fix**: Use quick tunnel mode instead (no login required)
- Run: `cloudflared tunnel --url http://localhost:3000`
- This command uses quick tunnel mode and doesn't need any authentication

**If the error persists**:
1. Make sure you're using the `--url` flag (this enables quick tunnel mode)
2. Don't run `cloudflared tunnel login` - quick tunnels don't need it
3. Try ngrok instead - it's often simpler: `start-public.bat`

---

## ngrok Not Found

**Error**: `'ngrok' is not recognized as an internal or external command`

**Solutions**:

1. **Download ngrok**:
   - Visit: https://ngrok.com/download
   - Download the Windows version
   - Extract `ngrok.exe` to a folder (e.g., `C:\ngrok\`)
   - Add that folder to your Windows PATH

2. **Or install via npm** (if you have Node.js):
   ```bash
   npm install -g ngrok
   ```

3. **Or use the full path**:
   - Edit `start-public.bat`
   - Replace `ngrok` with the full path: `C:\path\to\ngrok.exe`

---

## Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
1. Close all existing server windows
2. Run `start.bat` again - it will automatically kill existing processes
3. Or manually find and close the process:
   ```powershell
   netstat -ano | findstr :5000
   taskkill /PID [PID_NUMBER] /F
   ```

---

## Friends Can't Access via Network IP

**Problem**: Mobile devices can't access the site using the network IP

**Check**:
1. ✅ Are both devices on the same Wi-Fi network?
2. ✅ Is Windows Firewall blocking connections?
   - Go to: Windows Security → Firewall → Allow an app through firewall
   - Allow Node.js through private networks
3. ✅ Is the server listening on `0.0.0.0`? (We've already configured this)
4. ✅ Try temporarily disabling firewall to test

**Quick Test**:
- On your computer, open `http://YOUR_LOCAL_IP:3000`
- If it works on your computer but not on mobile, it's likely a firewall issue

---

## Public URL Shows "502 Bad Gateway"

**Problem**: Friends can access the public URL but see an error

**Solutions**:
1. ✅ Make sure all your servers are running (check all windows)
2. ✅ Make sure ngrok/Cloudflare tunnel is still running
3. ✅ Wait a few seconds after starting - servers need time to initialize
4. ✅ Check that you're tunneling to port 3000 (the client port)

---

## Images Not Loading on Public URL

**Problem**: Site loads but product images don't show

**Solution**:
- We've already configured image proxying in Vite
- Make sure you're using `start-public.bat` or `start-cloudflare.bat`
- Images should automatically work through the tunnel

---

## Still Having Issues?

1. **Check the server windows** - look for error messages
2. **Try ngrok instead of Cloudflare** - often more reliable
3. **Check the console** - browser DevTools (F12) can show errors
4. **Restart everything** - close all windows and start fresh

---

## Quick Solutions Summary

| Problem | Quick Fix |
|---------|-----------|
| Cloudflare certificate error | Use `start-public.bat` (ngrok) instead |
| Port in use | Close all server windows, run `start.bat` again |
| Can't access from mobile | Check firewall, ensure same Wi-Fi |
| Public URL not working | Ensure all servers and tunnel are running |
| Images not loading | Restart with `start-public.bat` |

