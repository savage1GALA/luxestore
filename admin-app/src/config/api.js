// API configuration for dynamic base URL
// This allows the app to work on both localhost, network (mobile), and public access (ngrok)

// Get the current hostname (works on both localhost, network IP, and public URLs)
const getAPIBaseURL = () => {
  // In development, use relative URLs when possible (proxied by Vite)
  // This works for both localhost and public tunnels (ngrok, Cloudflare, etc.)
  if (import.meta.env.DEV) {
    const hostname = window.location.hostname
    const port = window.location.port || '3001'
    
    // If accessing via localhost, use localhost:5000 for direct access
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000'
    }
    
    // If accessing via public tunnel (ngrok, cloudflare, etc.), use relative URLs
    // Vite proxy will handle /api and /images requests
    if (hostname.includes('ngrok') || hostname.includes('cloudflare') || hostname.includes('trycloudflare')) {
      return '' // Use relative URLs - Vite proxy handles it
    }
    
    // Otherwise, use the current hostname (network IP) with port 5000
    return `http://${hostname}:5000`
  }
  // In production, use the current origin or a configured API URL
  return import.meta.env.VITE_API_URL || window.location.origin
}

export const API_BASE_URL = getAPIBaseURL()

// Debug log (only in browser console, will be removed in production)
if (typeof window !== 'undefined') {
  console.log('API Base URL:', API_BASE_URL || 'Using relative URLs')
}

// Helper function to get image URL
export const getImageURL = (imagePath) => {
  if (!imagePath) return null
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // If it starts with /images/, use relative URL if accessing via tunnel
  // Otherwise, prepend the API base URL
  if (imagePath.startsWith('/images/')) {
    if (API_BASE_URL === '') {
      // Using relative URL (for tunnels) - Vite proxy handles it
      return imagePath
    }
    return `${API_BASE_URL}${imagePath}`
  }
  
  // If it's a file path (contains .), construct the full URL
  if (imagePath.includes('.')) {
    if (API_BASE_URL === '') {
      // Using relative URL (for tunnels)
      return `/images/${imagePath}`
    }
    return `${API_BASE_URL}/images/${imagePath}`
  }
  
  // Otherwise, it's probably an emoji or placeholder, return null
  return null
}
