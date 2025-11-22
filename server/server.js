import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000

// Get local IP address for network access
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) addresses and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}

const localIP = getLocalIPAddress()

// CORS configuration - allow all origins for deployment
// In production, you can restrict to your frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow all origins, or set specific URL in production
  credentials: true
}))
app.use(express.json())

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Serve static images from the images folder
const imagesDir = path.join(__dirname, 'images')
app.use('/images', express.static(imagesDir))

const ordersFile = path.join(__dirname, 'orders.json')
const productsFile = path.join(__dirname, 'products.json')

// Initialize files if they don't exist
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, JSON.stringify([], null, 2))
}

if (!fs.existsSync(productsFile)) {
  const defaultProducts = [
    {
      id: 1,
      name: 'Gold Elegance Bracelet',
      price: 150000,
      image: '💍',
      category: 'Bracelet',
      description: 'Beautiful gold bracelet with elegant design',
    },
    {
      id: 2,
      name: 'Silver Classic Necklace',
      price: 200000,
      image: '📿',
      category: 'Necklace',
      description: 'Stunning silver necklace for special occasions',
    },
    {
      id: 3,
      name: 'Diamond Sparkle Ring',
      price: 500000,
      image: '💎',
      category: 'Ring',
      description: 'Exquisite diamond ring with premium quality',
    },
    {
      id: 4,
      name: 'Pearl Elegance Bracelet',
      price: 180000,
      image: '🔮',
      category: 'Bracelet',
      description: 'Classic pearl bracelet with timeless beauty',
    },
    {
      id: 5,
      name: 'Rose Gold Chain Necklace',
      price: 250000,
      image: '✨',
      category: 'Necklace',
      description: 'Modern rose gold chain necklace',
    },
    {
      id: 6,
      name: 'Crystal Charm Bracelet',
      price: 120000,
      image: '🌟',
      category: 'Bracelet',
      description: 'Delicate crystal charm bracelet',
    },
  ]
  fs.writeFileSync(productsFile, JSON.stringify(defaultProducts, null, 2))
}

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'))
    res.json(products)
  } catch (error) {
    console.error('Error reading products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Get all orders
app.get('/api/orders', (req, res) => {
  try {
    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'))
    res.json(orders)
  } catch (error) {
    console.error('Error reading orders:', error)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// Create a new order
app.post('/api/orders', (req, res) => {
  try {
    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'))
    const newOrder = {
      ...req.body,
      id: orders.length + 1,
      status: 'waiting', // Default status for new orders
    }
    orders.push(newOrder)
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
    res.status(201).json(newOrder)
  } catch (error) {
    console.error('Error saving order:', error)
    res.status(500).json({ error: 'Failed to save order' })
  }
})

// Update order status - must be before other routes
app.patch('/api/orders/:id', (req, res) => {
  try {
    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'))
    const orderId = parseInt(req.params.id)
    const { status } = req.body
    
    console.log(`Updating order ${orderId} to status: ${status}`)
    console.log('Current orders:', orders.map(o => ({ id: o.id, status: o.status })))
    
    const orderIndex = orders.findIndex(order => order.id === orderId)
    if (orderIndex === -1) {
      console.error(`Order ${orderId} not found`)
      return res.status(404).json({ error: `Order ${orderId} not found` })
    }
    
    orders[orderIndex].status = status
    if (status === 'done') {
      orders[orderIndex].completedDate = new Date().toISOString()
    }
    
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
    console.log(`Order ${orderId} updated successfully`)
    res.json(orders[orderIndex])
  } catch (error) {
    console.error('Error updating order:', error)
    res.status(500).json({ error: 'Failed to update order', details: error.message })
  }
})

// Delete an order
app.delete('/api/orders/:id', (req, res) => {
  try {
    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'))
    const orderId = parseInt(req.params.id)

    const orderIndex = orders.findIndex((order) => order.id === orderId)
    if (orderIndex === -1) {
      return res.status(404).json({ error: `Order ${orderId} not found` })
    }

    const [deletedOrder] = orders.splice(orderIndex, 1)
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))

    res.json({ success: true, order: deletedOrder })
  } catch (error) {
    console.error('Error deleting order:', error)
    res
      .status(500)
      .json({ error: 'Failed to delete order', details: error.message })
  }
})

// Delete order
app.delete('/api/orders/:id', (req, res) => {
  try {
    const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'))
    const orderId = parseInt(req.params.id)

    const updatedOrders = orders.filter((order) => order.id !== orderId)
    if (updatedOrders.length === orders.length) {
      return res.status(404).json({ error: `Order ${orderId} not found` })
    }

    fs.writeFileSync(ordersFile, JSON.stringify(updatedOrders, null, 2))
    res.status(204).end()
  } catch (error) {
    console.error('Error deleting order:', error)
    res
      .status(500)
      .json({ error: 'Failed to delete order', details: error.message })
  }
})

// Test endpoint to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running', methods: ['GET', 'POST', 'PATCH'] })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n========================================')
  console.log('   Luxe Store Server is Running!')
  console.log('========================================\n')
  console.log(`Local access:  http://localhost:${PORT}`)
  console.log(`Network access: http://${localIP}:${PORT}`)
  console.log('\nAvailable routes:')
  console.log('  GET  /api/products')
  console.log('  GET  /api/orders')
  console.log('  POST /api/orders')
  console.log('  PATCH /api/orders/:id')
  console.log('\n========================================\n')
})

