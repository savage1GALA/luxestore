# Luxe Store - Premium Jewelry Online Store

A beautiful, modern online store for selling bracelets, necklaces, and fine jewelry.

## Features

- 🏠 **Landing Page**: Beautiful info page with store introduction
- 🛍️ **Products Page**: Browse and view all jewelry items
- 🛒 **Shopping Cart**: Add items to cart and manage quantities
- 💳 **Checkout**: Order confirmation with customer details (name, phone, address)
- 👨‍💼 **Admin Panel**: View all customer orders
- 💰 **IQD Currency**: All prices displayed in Iraqi Dinar

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Storage**: JSON files (orders.json, products.json)

## Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Start the development servers:
```bash
npm run dev
```

This will start:
- Frontend server on http://localhost:3000
- Backend server on http://localhost:5000

## Usage

1. **Home Page**: Visit the landing page to learn about the store
2. **Products**: Browse the products page to see all available jewelry
3. **Cart**: Add items to cart and proceed to checkout
4. **Checkout**: Fill in your name, phone number, and address to confirm order
5. **Admin**: Visit `/admin` to view all customer orders

## Project Structure

```
luxe-store/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/   # Page components
│   │   ├── components/ # Reusable components
│   │   └── context/  # React context (Cart)
│   └── package.json
├── server/          # Express backend
│   ├── server.js    # API server
│   ├── orders.json  # Order storage
│   └── products.json # Product data
└── package.json     # Root package.json
```

## Admin Access

Visit `/admin` route to see all customer orders with:
- Customer information (name, phone, address)
- Order items and quantities
- Total price in IQD
- Order date and time

## Access from Mobile & Sharing with Friends 📱🌐

### Local Network (Same Wi-Fi)
1. Run `start.bat`
2. Use the network IP shown (e.g., `http://192.168.1.100:3000`)
3. Connect your mobile device to the same Wi-Fi network
4. Access the site using the network IP on any device

### Share with Friends (Public Access)
Your friends can access your site from anywhere in the world!

**⭐ Best Solution - Deploy Your Site (No Passwords/Warnings!):**
For a truly public site with NO password pages or warnings, deploy to free hosting:
1. See `DEPLOY_GUIDE.md` for step-by-step instructions
2. Recommended: Railway (easiest) or Render (full stack)
3. Free, permanent URL, works 24/7! 🚀

**Quick Tunnel Options (May Show Warnings/Passwords):**
- `start-localtunnel.bat` - LocalTunnel (shows warning page)
- `start-serveo.bat` - Uses SSH (built into Windows)
- `start-cloudflare.bat` - Cloudflare Tunnel
- `start-public.bat` - Uses ngrok (requires signup)
- See `EXTERNAL_ACCESS.md` for all options

**⚠️ Note:** Most tunneling services show warning/password pages. For a truly public site, **deploy to hosting** (see `DEPLOY_GUIDE.md`)!

