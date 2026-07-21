import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">🌍 African Curios</h1>
          <div className="space-x-4">
            <Link href="/seller/dashboard" className="text-gray-600 hover:text-orange-600">
              Sell
            </Link>
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-orange-600">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Discover Authentic African Curios
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Handcrafted treasures from across Africa. Each piece tells a story of culture, tradition, and artistry.
        </p>
        <div className="space-x-4">
          <Link
            href="/seller/products/new"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Start Selling
          </Link>
          <button className="inline-block bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
            Browse Products
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose African Curios?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="text-xl font-semibold mb-2">Authentic Crafts</h4>
              <p className="text-gray-600">
                Every item is handmade by artisans across Africa, ensuring authentic quality and uniqueness.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h4 className="text-xl font-semibold mb-2">Sustainable</h4>
              <p className="text-gray-600">
                We support ethical sourcing and fair trade practices that benefit local communities.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h4 className="text-xl font-semibold mb-2">Fair Prices</h4>
              <p className="text-gray-600">
                Direct connection between artisans and buyers means better prices for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Share Your Creations?</h3>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of African artisans selling their handcrafted products worldwide.
          </p>
          <Link
            href="/seller/dashboard"
            className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Your Shop Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 African Curios Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
