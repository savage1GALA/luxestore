import { useState, useEffect } from 'react'
import axios from 'axios'
import LogoMark from '../assets/logo.svg'
import { getImageURL, API_BASE_URL } from '../config/api'

export default function Admin() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('waiting') // 'waiting' or 'done'

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL || ''}/api/orders`)
      // Ensure all orders have a status (default to 'waiting' for old orders)
      const ordersWithStatus = response.data.map(order => ({
        ...order,
        status: order.status || 'waiting'
      }))
      setOrders(ordersWithStatus.reverse()) // Show newest first
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const markOrderAsDone = async (orderId) => {
    try {
      console.log('Marking order as done, orderId:', orderId)
      const response = await axios.patch(`${API_BASE_URL || ''}/api/orders/${orderId}`, { status: 'done' })
      console.log('Order updated successfully:', response.data)
      fetchOrders() // Refresh orders
    } catch (error) {
      console.error('Error updating order:', error)
      console.error('Error response:', error.response)
      console.error('Error details:', error.response?.data || error.message)
      alert(`Failed to update order status: ${error.response?.data?.error || error.message}. Please check the console for details.`)
    }
  }

  const markOrderAsWaiting = async (orderId) => {
    try {
      console.log('Marking order as waiting, orderId:', orderId)
      const response = await axios.patch(`${API_BASE_URL || ''}/api/orders/${orderId}`, { status: 'waiting' })
      console.log('Order updated successfully:', response.data)
      fetchOrders() // Refresh orders
    } catch (error) {
      console.error('Error updating order:', error)
      console.error('Error response:', error.response)
      console.error('Error details:', error.response?.data || error.message)
      alert(`Failed to update order status: ${error.response?.data?.error || error.message}. Please check the console for details.`)
    }
  }

  const deleteOrder = async (orderId) => {
    const confirmed = window.confirm(`Delete order #${orderId}? This action cannot be undone.`)
    if (!confirmed) return
    try {
      await axios.delete(`${API_BASE_URL || ''}/api/orders/${orderId}`)
      fetchOrders()
    } catch (error) {
      console.error('Error deleting order:', error)
      alert(`Failed to delete order: ${error.response?.data?.error || error.message}`)
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

  const waitingOrders = orders.filter(order => (order.status || 'waiting') === 'waiting')
  const doneOrders = orders.filter(order => order.status === 'done')

  const OrderCard = ({ order }) => {
    const isWaiting = (order.status || 'waiting') === 'waiting'
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
        className={`bg-neutral-900 rounded-3xl shadow-xl p-6 hover:shadow-white/20 transition-all border transform hover:scale-[1.01] ${
          isWaiting ? 'border-white/10' : 'border-white/20'
        }`}
      >
        <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Order #{order.id}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isWaiting 
                  ? 'bg-white/10 text-white' 
                  : 'bg-white text-black'
              }`}>
                {isWaiting ? '⏳ Waiting' : '✅ Done'}
              </span>
            </div>
            <p className="text-gray-400 flex items-center gap-2">
              <span>📅</span>
              {formatDate(order.date)}
            </p>
            {order.completedDate && (
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                <span>✅</span>
                Completed: {formatDate(order.completedDate)}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Total Amount</p>
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
              <span className="font-semibold">
                {shippingLabel}
              </span>
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

        <div className="border-t border-white/10 pt-4 mb-4">
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
                  {(() => {
                    const imageUrl = getImageURL(item.image)
                    const hasImage = imageUrl !== null
                    return (
                      <>
                        {hasImage && (
                          <img 
                            src={imageUrl}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg transform hover:scale-110 transition-transform"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'block'
                            }}
                          />
                        )}
                        <span className={`text-4xl transform hover:scale-110 transition-transform ${hasImage ? 'hidden' : ''}`}>
                          {item.image || '💎'}
                        </span>
                      </>
                    )
                  })()}
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

        <div className="border-t border-white/10 pt-4 space-y-3">
          {isWaiting ? (
            <button
              onClick={() => markOrderAsDone(order.id)}
              className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg"
            >
              ✅ Mark as Done
            </button>
          ) : (
            <button
              onClick={() => markOrderAsWaiting(order.id)}
              className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg"
            >
              ⏳ Mark as Waiting
            </button>
          )}
          <button
            onClick={() => deleteOrder(order.id)}
            className="w-full border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/5 transition-all transform hover:scale-105 shadow-lg"
          >
            🗑️ Delete Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={LogoMark} alt="Luxe Store logo" className="h-10 w-10 rounded-xl shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Admin Panel
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            View and manage customer orders
          </p>
          
          {/* Tab Buttons */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('waiting')}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg ${
                activeTab === 'waiting'
                  ? 'bg-white text-black shadow-white/40'
                  : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
              }`}
            >
              ⏳ Waiting Orders ({waitingOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('done')}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg ${
                activeTab === 'done'
                  ? 'bg-white text-black shadow-white/40'
                  : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
              }`}
            >
              ✅ Done Orders ({doneOrders.length})
            </button>
          </div>
          
          {/* Summary Stats */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold">
              📦 {orders.length} Total
            </div>
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
          <div>
            {/* Waiting Orders Tab */}
            {activeTab === 'waiting' && (
              <div>
                {waitingOrders.length === 0 ? (
                  <div className="bg-neutral-900 rounded-3xl shadow-xl p-12 text-center border border-white/10">
                    <div className="text-8xl mb-6 animate-bounce-slow">⏳</div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      No Waiting Orders
                    </h2>
                    <p className="text-xl text-gray-400">
                      All orders have been completed!
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-3xl md:text-4xl font-bold">
                        ⏳ Waiting Orders
                      </h2>
                      <span className="px-4 py-1 bg-white/10 text-white rounded-full text-sm font-semibold">
                        {waitingOrders.length}
                      </span>
                    </div>
                    <div className="space-y-6">
                      {waitingOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Done Orders Tab */}
            {activeTab === 'done' && (
              <div>
                {doneOrders.length === 0 ? (
                  <div className="bg-neutral-900 rounded-3xl shadow-xl p-12 text-center border border-white/10">
                    <div className="text-8xl mb-6 animate-bounce-slow">✅</div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      No Completed Orders
                    </h2>
                    <p className="text-xl text-gray-400">
                      Completed orders will appear here.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-3xl md:text-4xl font-bold">
                        ✅ Completed Orders
                      </h2>
                      <span className="px-4 py-1 bg-white/10 text-white rounded-full text-sm font-semibold">
                        {doneOrders.length}
                      </span>
                    </div>
                    <div className="space-y-6">
                      {doneOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

