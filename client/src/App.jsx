import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-neutral-950 text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App

