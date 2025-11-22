import { useState, useEffect } from 'react'
import apiClient from '../config/axios'

export default function Admin() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/api/orders')
      setOrders(response.data.reverse()) // Show newest first
    } catch (error) {
      console.error('Error fetching orders:', error)
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce-slow">📦</div>
          <div className="text-2xl font-semibold text-gray-300">Loading orders...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Admin Panel
          </h1>
          <p className="text-xl text-gray-400">
            View and manage customer orders
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-neutral-900 rounded-3xl shadow-xl p-12 text-center border border-white/10">
            <div className="text-8xl mb-6 animate-bounce-slow">📦</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              No Orders Yet
            </h2>
            <p className="text-xl text-gray-400">
              Orders will appear here when customers place them.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const shippingFee = order.shippingFee ?? order.shippingTax ?? 0
              const itemsTotal =
                order.itemsTotal ??
                (typeof order.total === 'number'
                  ? Math.max(order.total - shippingFee, 0)
                  : 0)
              const grandTotal =
                order.total ?? (itemsTotal || 0) + (shippingFee || 0)
              const legacyRateLabel =
                typeof order.shippingTaxRate === 'number'
                  ? `${Math.round(order.shippingTaxRate * 100)}%`
                  : null
              const shippingCity =
                order.shippingCity ?? order.shipping?.city ?? null
              const shippingDescriptor = shippingCity ?? legacyRateLabel
              const shippingLabel = shippingDescriptor
                ? `Shipping (${shippingDescriptor})`
                : 'Shipping'

              return (
                <div
                  key={index}
                  className="bg-neutral-900 rounded-3xl shadow-xl p-6 hover:shadow-white/20 transition-all border border-white/10 transform hover:scale-[1.01]"
                >
                <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-white/10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl md:text-3xl font-bold">
                        Order #{orders.length - index}
                      </h3>
                      <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold">
                        New
                      </span>
                    </div>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>📅</span>
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-white">
                      {formatPrice(grandTotal)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                    <span>💰</span> Payment Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300">
                      <span className="font-semibold">Items Total</span>
                      <span>{formatPrice(itemsTotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span className="font-semibold">{shippingLabel}</span>
                      <span>{formatPrice(shippingFee)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-3">
                      <span className="text-xl font-bold text-white">
                        Grand Total
                      </span>
                      <span className="text-xl font-bold text-white">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                    <span>👤</span> Customer Information
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1 font-semibold">Name</p>
                      <p className="text-white font-semibold">{order.customerName}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1 font-semibold">Phone</p>
                      <p className="text-white font-semibold">{order.phone}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1 font-semibold">Address</p>
                      <p className="text-white font-semibold">{order.address}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                    <span>🛍️</span> Order Items ({order.items.length})
                  </h4>
                  <div className="space-y-3">
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 hover:shadow-white/20 transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-4xl transform hover:scale-110 transition-transform">
                            {item.image || '💎'}
                          </span>
                          <div>
                            <p className="font-bold text-white text-lg">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-300">
                              Quantity: <span className="font-semibold">{item.quantity}</span> × {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-white text-xl">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

