import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: '🎨',
      title: 'Authentic Crafts',
      description: 'Every item is handmade by artisans across Africa, ensuring authentic quality and uniqueness.',
    },
    {
      icon: '🌱',
      title: 'Sustainable & Ethical',
      description: 'We support ethical sourcing and fair trade practices that benefit local communities.',
    },
    {
      icon: '💰',
      title: 'Fair Prices',
      description: 'Direct connection between artisans and buyers means better prices for everyone.',
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Connect with customers worldwide and expand your African business internationally.',
    }
  ]

  const testimonials = [
    {
      name: 'Amara Okafor',
      role: 'Master Weaver, Nigeria',
      text: 'African Curios helped me reach customers globally. My handwoven textiles now sell in 15 countries!',
      avatar: '👩‍🦱'
    },
    {
      name: 'Kofi Mensah',
      role: 'Wood Carver, Ghana',
      text: 'The platform is incredibly easy to use and the commission rates are fair. Highly recommend!',
      avatar: '👨‍🦱'
    },
    {
      name: 'Zainab Hassan',
      role: 'Jewelry Artisan, Kenya',
      text: 'Finally, a platform that values African artisans and their work. This changed my business!',
      avatar: '👩'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌍</span>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#683837' }}>
                African Curios
              </h1>
              <p className="text-xs" style={{ color: '#C18F4C' }}>Authentic African Marketplace</p>
            </div>
          </div>
          <div className="space-x-4 flex items-center">
            <Link href="/seller/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
              Sell
            </Link>
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
              Admin
            </Link>
            <Link href="#" className="px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 transform hover:scale-105" style={{ backgroundColor: '#C18F4C' }}>
              Browse
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32" style={{ backgroundColor: '#EAEBEB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-6xl sm:text-7xl font-bold leading-tight" style={{ color: '#683837' }}>
                Discover Authentic
                <br />
                African Craftsmanship
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Handcrafted treasures from across Africa. Each piece tells a story of culture, tradition, and the artistry of our talented makers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                href="/seller/products/new"
                className="inline-block text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md"
                style={{ backgroundColor: '#C18F4C' }}
              >
                ✨ Start Selling Now
              </Link>
              <button className="inline-block text-gray-900 border-2 px-8 py-4 rounded-lg font-semibold transition-all duration-200" style={{ borderColor: '#683837', backgroundColor: 'white' }}>
                🔍 Browse Products
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <div className="space-y-2">
                <p className="text-3xl font-bold" style={{ color: '#C18F4C' }}>500+</p>
                <p className="text-gray-700 font-medium">Artisans</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold" style={{ color: '#C18F4C' }}>5000+</p>
                <p className="text-gray-700 font-medium">Products</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold" style={{ color: '#C18F4C' }}>45</p>
                <p className="text-gray-700 font-medium">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#683837' }}>
              Why Choose African Curios?
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're committed to supporting African artisans and delivering authentic, high-quality products to customers worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-8 rounded-lg border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  hoveredCard === idx ? 'shadow-lg' : 'shadow-sm'
                }`}
                style={{
                  borderColor: '#C18F4C',
                  backgroundColor: hoveredCard === idx ? '#EAEBEB' : 'white'
                }}
              >
                <div className="space-y-4">
                  <div className="text-5xl">{feature.icon}</div>
                  <h4 className="text-xl font-semibold" style={{ color: '#683837' }}>
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" style={{ backgroundColor: '#EAEBEB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#683837' }}>
              Success Stories
            </h3>
            <p className="text-gray-700 text-lg">
              Hear from artisans who are transforming their businesses with African Curios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-8 border-l-4 shadow-sm hover:shadow-md transition-all duration-300"
                style={{ borderColor: '#C18F4C' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <div>
                    <p className="font-semibold" style={{ color: '#683837' }}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: '#C18F4C' }}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 p-12 rounded-lg" style={{ backgroundColor: '#EAEBEB' }}>
          <h3 className="text-4xl font-bold mb-4" style={{ color: '#683837' }}>
            Ready to Share Your Creations?
          </h3>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of African artisans selling their handcrafted products worldwide. Start your shop today and reach customers globally.
          </p>
          <Link
            href="/seller/dashboard"
            className="inline-block text-white px-10 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md"
            style={{ backgroundColor: '#C18F4C' }}
          >
            🚀 Start Your Shop Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ backgroundColor: '#683837', borderTopColor: '#C18F4C' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 py-12">
            <div>
              <h4 className="font-semibold mb-4 text-white">About</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-yellow-100 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">For Sellers</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Seller Guide</a></li>
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Community</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Stories</a></li>
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-yellow-100 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 pb-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 African Curios Marketplace. All rights reserved. 🌍</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
