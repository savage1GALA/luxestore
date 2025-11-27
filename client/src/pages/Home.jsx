import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-neutral-800 py-20">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="mb-6 animate-bounce-slow">
              <span className="text-8xl">💎</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent animate-gradient">
                Luxe Store
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover our exquisite collection of premium bracelets, necklaces,
              and fine jewelry. Each piece is crafted with precision and elegance.
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-black px-10 py-5 rounded-xl text-lg font-semibold hover:bg-neutral-200 transition-all transform hover:scale-110 shadow-2xl animate-pulse-once"
            >
              Explore Collection ✨
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Luxe Store?
            </h2>
            <p className="text-xl text-gray-400">
              Premium quality meets exceptional design
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-neutral-900 shadow-2xl hover:shadow-white/10 transition-all transform hover:scale-105 border border-white/10">
              <div className="text-6xl mb-4 animate-bounce-slow">✨</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Each piece is carefully selected and crafted with the finest
                materials to ensure lasting beauty.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-neutral-900 shadow-2xl hover:shadow-white/10 transition-all transform hover:scale-105 border border-white/10">
              <div className="text-6xl mb-4 animate-bounce-slow" style={{ animationDelay: '0.2s' }}>🎨</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Unique Designs
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Our collection features exclusive designs that stand out and
                make a statement.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-neutral-900 shadow-2xl hover:shadow-white/10 transition-all transform hover:scale-105 border border-white/10">
              <div className="text-6xl mb-4 animate-bounce-slow" style={{ animationDelay: '0.4s' }}>🚚</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-400 leading-relaxed">
                We ensure quick and secure delivery to bring your favorite
                pieces to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Collections
            </h2>
            <p className="text-xl text-gray-400">
              Explore our stunning jewelry categories
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-110 duration-300">
              <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black h-72 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="text-8xl transform group-hover:rotate-12 transition-transform duration-300">💍</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-6 transform translate-y-0 group-hover:-translate-y-2 transition-transform">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Rings
                </h3>
                <p className="text-gray-300 mb-4">
                  Elegant rings for every occasion
                </p>
                <Link
                  to="/products?category=Rings"
                  className="inline-flex items-center text-white font-semibold hover:text-gray-300 group-hover:gap-2 transition-all"
                >
                  Shop Now <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-110 duration-300">
              <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black h-72 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="text-8xl transform group-hover:rotate-12 transition-transform duration-300">✨</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-6 transform translate-y-0 group-hover:-translate-y-2 transition-transform">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Necklaces
                </h3>
                <p className="text-gray-300 mb-4">
                  Stunning necklaces to complete your look
                </p>
                <Link
                  to="/products?category=Necklaces"
                  className="inline-flex items-center text-white font-semibold hover:text-gray-300 group-hover:gap-2 transition-all"
                >
                  Shop Now <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-110 duration-300">
              <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black h-72 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="text-8xl transform group-hover:rotate-12 transition-transform duration-300">👕</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-6 transform translate-y-0 group-hover:-translate-y-2 transition-transform">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Clothing
                </h3>
                <p className="text-gray-300 mb-4">
                  Premium clothing and apparel
                </p>
                <Link
                  to="/products?category=Clothing"
                  className="inline-flex items-center text-white font-semibold hover:text-gray-300 group-hover:gap-2 transition-all"
                >
                  Shop Now <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-neutral-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our collection and discover jewelry that speaks to you
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-black px-10 py-5 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-110 shadow-2xl hover:shadow-white/30"
          >
            Start Shopping Now 🛍️
          </Link>
        </div>
      </section>
    </div>
  )
}

