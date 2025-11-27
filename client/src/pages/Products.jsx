import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import apiClient from '../config/axios'
import { getImageURL } from '../config/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/api/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback products if API fails
      setProducts([
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
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'currency',
      currency: 'IQD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {})

  // Define category order and icons
  const categoryOrder = ['Clothing', 'Rings', 'Bracelets', 'Necklaces']
  const categoryIcons = {
    'Clothing': '👕',
    'Rings': '💍',
    'Bracelets': '📿',
    'Necklaces': '✨'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce-slow">💎</div>
          <div className="text-2xl font-semibold text-gray-300">Loading products...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-400">
            Discover our exquisite collection of premium items
          </p>
        </div>

        {/* Render products grouped by category */}
        {categoryOrder.map((category) => {
          const categoryProducts = productsByCategory[category] || []
          if (categoryProducts.length === 0) return null

          return (
            <div key={category} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">{categoryIcons[category] || '💎'}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {category}
                </h2>
                <span className="text-gray-400 text-lg">
                  ({categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-neutral-900 text-white rounded-3xl shadow-xl overflow-hidden hover:shadow-white/20 transition-all transform hover:scale-105 border border-white/5 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black h-72 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {(() => {
                        const imageUrl = getImageURL(product.image)
                        const hasImage = imageUrl !== null
                        return (
                          <>
                            {hasImage && (
                              <img 
                                src={imageUrl}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain relative z-10"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.nextSibling.style.display = 'flex'
                                }}
                              />
                            )}
                            <span 
                              className={`text-9xl transform group-hover:rotate-12 transition-transform duration-300 relative z-10 ${hasImage ? 'hidden' : ''}`}
                            >
                              {product.image || '💎'}
                            </span>
                          </>
                        )
                      })()}
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs text-black font-semibold bg-white rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{product.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-2xl font-bold text-white">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg hover:shadow-white/30"
                        >
                          Add to Cart 🛒
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Render any other categories not in the predefined order */}
        {Object.keys(productsByCategory).filter(cat => !categoryOrder.includes(cat)).map((category) => {
          const categoryProducts = productsByCategory[category] || []
          if (categoryProducts.length === 0) return null

          return (
            <div key={category} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">💎</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {category}
                </h2>
                <span className="text-gray-400 text-lg">
                  ({categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-neutral-900 text-white rounded-3xl shadow-xl overflow-hidden hover:shadow-white/20 transition-all transform hover:scale-105 border border-white/5 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black h-72 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {(() => {
                        const imageUrl = getImageURL(product.image)
                        const hasImage = imageUrl !== null
                        return (
                          <>
                            {hasImage && (
                              <img 
                                src={imageUrl}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain relative z-10"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.nextSibling.style.display = 'flex'
                                }}
                              />
                            )}
                            <span 
                              className={`text-9xl transform group-hover:rotate-12 transition-transform duration-300 relative z-10 ${hasImage ? 'hidden' : ''}`}
                            >
                              {product.image || '💎'}
                            </span>
                          </>
                        )
                      })()}
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs text-black font-semibold bg-white rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{product.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-2xl font-bold text-white">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg hover:shadow-white/30"
                        >
                          Add to Cart 🛒
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

