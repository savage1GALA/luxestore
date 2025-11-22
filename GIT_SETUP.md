# Setting Up Your Git Repository 📦

Your code is currently only on your computer. To deploy it or share it, you need to create a Git repository and push it to GitHub.

## Where is Your Repository?

**Right now**: You don't have a repository yet - it's just files on your computer at:
```
C:\Users\SAVAGE\Desktop\luxestore
```

**After setup**: You'll have:
1. **Local repository** - Same location: `C:\Users\SAVAGE\Desktop\luxestore`
2. **GitHub repository** - Online at: `https://github.com/YOUR_USERNAME/luxestore`

---

## Quick Setup (Automatic)

**Easiest way**: Run the setup script:

1. **Double-click**: `setup-repository.bat`
   - This will create a local Git repository
   - Add all your files
   - Create the first commit

2. **Then push to GitHub** (see below)

---

## Manual Setup

If you prefer to do it manually:

### Step 1: Initialize Repository

Open terminal in your project folder:
```bash
cd C:\Users\SAVAGE\Desktop\luxestore
git init
git add .
git commit -m "Initial commit - Luxe Store"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `luxestore` (or any name)
3. Choose **Public** or **Private**
4. **Don't** check "Initialize with README"
5. Click "Create repository"

### Step 3: Connect and Push

After creating the GitHub repository, GitHub will show you commands. Run these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/luxestore.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username!

**First time?** You'll need to:
- Sign in to GitHub
- Use a Personal Access Token instead of password (GitHub requirement)

---

## Configure Git (First Time Only)

If you see errors about user.name or user.email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## After Repository is on GitHub

Once your code is on GitHub, you can:

✅ **Deploy to free hosting** (Railway, Render, Vercel)
- Just connect your GitHub repository
- They automatically deploy your code

✅ **Share with others**
- Give them the GitHub repository URL

✅ **Keep code backed up**
- Your code is safe in the cloud

---

## Your Repository Location

**Local (on your computer)**:
```
C:\Users\SAVAGE\Desktop\luxestore
```
- This is where your actual files are
- Work on your code here
- Commit changes here

**GitHub (online)**:
```
https://github.com/YOUR_USERNAME/luxestore
```
- This is a copy stored online
- Services like Railway/Render can access it
- Others can view/clone it (if public)

---

## Need Help?

1. **Run `setup-repository.bat`** - It does most of the work for you!
2. **Follow the steps above** - They'll guide you through GitHub setup
3. **Check `DEPLOY_GUIDE.md`** - For deployment instructions after repository is ready

---

## Quick Commands Reference

```bash
# Check repository status
git status

# See where your repository is connected
git remote -v

# Push changes to GitHub
git add .
git commit -m "Your message"
git push

# Pull changes from GitHub
git pull
```

Ready to set up? Run `setup-repository.bat`! 🚀

