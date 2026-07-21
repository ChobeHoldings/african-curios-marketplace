import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: '🎨',
      title: 'Authentic Crafts',
      description: 'Every item is handmade by artisans across Africa, ensuring authentic quality and uniqueness.',
      color: 'from-purple-500/20 to-purple-600/20'
    },
    {
      icon: '🌱',
      title: 'Sustainable & Ethical',
      description: 'We support ethical sourcing and fair trade practices that benefit local communities.',
      color: 'from-green-500/20 to-green-600/20'
    },
    {
      icon: '💰',
      title: 'Fair Prices',
      description: 'Direct connection between artisans and buyers means better prices for everyone.',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Connect with customers worldwide and expand your African business internationally.',
      color: 'from-orange-500/20 to-orange-600/20'
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌍</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              African Curios
            </h1>
          </div>
          <div className="space-x-4 flex items-center">
            <Link href="/seller/dashboard" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
              Sell
            </Link>
            <Link href="/admin/dashboard" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
              Admin
            </Link>
            <Link href="#" className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-200 transform hover:scale-105">
              Browse
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-6xl sm:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Discover Authentic
                </span>
                <br />
                <span className="text-white">African Craftsmanship</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Handcrafted treasures from across Africa. Each piece tells a story of culture, tradition, and the artistry of our talented makers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                href="/seller/products/new"
                className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-orange-500/50"
              >
                ✨ Start Selling Now
              </Link>
              <button className="inline-block bg-white/10 hover:bg-white/20 text-white border-2 border-orange-400/50 hover:border-orange-400 px-8 py-4 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm">
                🔍 Browse Products
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-orange-400">500+</p>
                <p className="text-gray-400">Artisans</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-orange-400">5000+</p>
                <p className="text-gray-400">Products</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-orange-400">45</p>
                <p className="text-gray-400">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Why Choose African Curios?</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We're committed to supporting African artisans and delivering authentic, high-quality products to customers worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative group p-8 rounded-2xl backdrop-blur-sm border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden
                  ${hoveredCard === idx ? 'bg-gradient-to-br ' + feature.color : 'bg-white/5'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-4">
                  <div className="text-5xl">{feature.icon}</div>
                  <h4 className="text-xl font-semibold">{feature.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Success Stories</h3>
            <p className="text-gray-400 text-lg">
              Hear from artisans who are transforming their businesses with African Curios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-400">⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-purple-600/20 to-orange-600/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-4xl font-bold mb-4">Ready to Share Your Creations?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of African artisans selling their handcrafted products worldwide. Start your shop today and reach customers globally.
          </p>
          <Link
            href="/seller/dashboard"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-orange-500/50"
          >
            🚀 Start Your Shop Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange-500/20 bg-slate-900/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Seller Guide</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Stories</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-orange-500/20 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 African Curios Marketplace. All rights reserved. 🌍</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
