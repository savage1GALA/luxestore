import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useMemo, useState } from 'react'
import apiClient from '../config/axios'
import { getImageURL } from '../config/api'

// Update this list to add more cities or adjust their shipping fees.
const SHIPPING_OPTIONS = [
  { id: 'slemani', label: 'Slemani', fee: 3000 },
  { id: 'hawler', label: 'Hawler', fee: 4250 },
  { id: 'karkuk', label: 'Karkuk', fee: 4250 },
  { id: 'dhok', label: 'Dhok', fee: 4250 },
  { id: 'outside slemani', label: 'Outside Slemani', fee: 4500 },
  { id: 'other', label: 'Other', fee: 4500 },
  { id: 'baghdad', label: 'Baghdad', fee: 5000 },
  { id: 'outside baghdad', label: 'Outside Baghdad', fee: 7000 },
]

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [lastOrderSummary, setLastOrderSummary] = useState(null)
  const [selectedShippingId, setSelectedShippingId] = useState(
    SHIPPING_OPTIONS[0]?.id ?? ''
  )

  const subtotal = getTotalPrice()
  const selectedShipping = useMemo(
    () => SHIPPING_OPTIONS.find((option) => option.id === selectedShippingId),
    [selectedShippingId]
  )
  const shippingFee = selectedShipping?.fee ?? 0
  const shippingCity = selectedShipping?.label ?? 'Unknown City'
  const grandTotal = subtotal + shippingFee

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'currency',
      currency: 'IQD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const itemsTotal = getTotalPrice()
      const shippingTotal = shippingFee
      const totalWithShipping = itemsTotal + shippingTotal

      const order = {
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        items: cart,
        itemsTotal,
        shippingTax: shippingTotal,
        shippingFee: shippingTotal,
        shippingCity,
        total: totalWithShipping,
        date: new Date().toISOString(),
      }

      await apiClient.post('/api/orders', order)
      setLastOrderSummary({
        itemsTotal,
        shippingTax: shippingTotal,
        shippingCity,
        total: totalWithShipping,
      })
      setOrderSuccess(true)
      clearCart()
      setFormData({ name: '', phone: '', address: '' })
      setTimeout(() => {
        setOrderSuccess(false)
        setShowCheckout(false)
        setLastOrderSummary(null)
      }, 3000)
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Error submitting order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen py-12 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-6 animate-bounce-slow">🛒</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Start adding some beautiful jewelry to your cart!
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-black px-10 py-5 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-110 shadow-2xl"
          >
            Browse Products ✨
          </Link>
        </div>
      </div>
    )
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen py-12 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-neutral-900 border border-white/10 rounded-3xl p-12 shadow-2xl">
            <div className="text-8xl mb-6 animate-bounce-slow">✅</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for your order. We will contact you soon!
            </p>
            {lastOrderSummary && (
              <div className="bg-black rounded-2xl border border-white/10 shadow-lg p-6 text-left mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 text-lg text-gray-300">
                  <div className="flex justify-between">
                    <span>Items Total</span>
                    <span className="font-semibold text-white">
                      {formatPrice(lastOrderSummary.itemsTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Shipping (
                      {lastOrderSummary.shippingCity || 'Not specified'})
                    </span>
                    <span className="font-semibold text-white">
                      {formatPrice(lastOrderSummary.shippingTax)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span className="text-xl font-bold text-white">
                      Grand Total
                    </span>
                    <span className="text-xl font-bold text-white">
                      {formatPrice(lastOrderSummary.total)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <Link
              to="/products"
              className="inline-block bg-white text-black px-10 py-5 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-110 shadow-2xl"
            >
              Continue Shopping 🛍️
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Shopping Cart
        </h1>

        {!showCheckout ? (
          <>
            <div className="bg-neutral-900 rounded-3xl shadow-xl p-6 mb-6 border border-white/10">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-6 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors rounded-lg px-4"
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
                              className="w-20 h-20 object-contain rounded-lg bg-neutral-800 p-1"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'block'
                              }}
                            />
                          )}
                          <div className={`text-6xl transform hover:scale-110 transition-transform ${hasImage ? 'hidden' : ''}`}>
                            {item.image || '💎'}
                          </div>
                        </>
                      )
                    })()}
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-400">{item.description}</p>
                      <p className="text-lg font-semibold text-white mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-white/10 rounded-full p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-10 h-10 rounded-full bg-black hover:bg-white/20 flex items-center justify-center font-bold text-white transition-all shadow-sm"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold w-10 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-10 h-10 rounded-full bg-black hover:bg-white/20 flex items-center justify-center font-bold text-white transition-all shadow-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 font-semibold px-4 py-2 rounded-lg hover:bg-red-500/10 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-neutral-900 rounded-3xl shadow-xl p-8 mb-6 border border-white/10">
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Select your city for shipping
                  </label>
                  <select
                    value={selectedShippingId}
                    onChange={(e) => setSelectedShippingId(e.target.value)}
                    className="w-full border-2 border-white/10 rounded-xl px-4 py-3 bg-black text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
                  >
                    {SHIPPING_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label} – {formatPrice(option.fee)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-300">
                    Items Total
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-300">
                    Shipping ({shippingCity})
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-3">
                  <span className="text-2xl font-bold text-white">
                    Grand Total
                  </span>
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-white text-black py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl"
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        ) : (
          <div className="bg-neutral-900 rounded-3xl shadow-xl p-8 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Checkout
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-white/10 rounded-xl bg-black text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-white/10 rounded-xl bg-black text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2">
                  Address
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-white/10 rounded-xl bg-black text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
                  rows="4"
                  placeholder="Enter your delivery address"
                />
              </div>
              <div className="bg-black p-6 rounded-xl border border-white/10">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-300">
                      Items Total
                    </span>
                    <span className="text-xl font-bold text-white">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-300">
                      Shipping ({shippingCity})
                    </span>
                    <span className="text-xl font-bold text-white">
                      {formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/10 pt-3">
                    <span className="text-2xl font-bold text-white">
                      Grand Total
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Update the city list above to support more delivery locations.
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 bg-white/10 text-white py-4 rounded-xl font-semibold hover:bg-white/20 transition-all transform hover:scale-105"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 transform hover:scale-105 shadow-xl"
                >
                  {submitting ? 'Submitting...' : 'Confirm Order ✅'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

