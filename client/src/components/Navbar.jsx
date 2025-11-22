import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import LogoMark from '../assets/logo.svg'

export default function Navbar() {
  const { getTotalItems } = useCart()

  return (
    <nav className="bg-black/80 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={LogoMark}
              alt="Luxe Store logo"
              className="h-8 w-8 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-2xl md:text-3xl font-bold tracking-wide text-white">
              Luxe Store
            </span>
          </Link>
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-all font-semibold px-3 py-2 rounded-lg hover:bg-white/10 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/products"
              className="text-gray-300 hover:text-white transition-all font-semibold px-3 py-2 rounded-lg hover:bg-white/10 relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-300 hover:text-white transition-all font-semibold px-3 py-2 rounded-lg hover:bg-white/10 group"
            >
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse-once">
                  {getTotalItems()}
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

