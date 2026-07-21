import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    currency: 'USD',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // For now, use a test seller_id. In production, this would come from authentication
      const seller_id = localStorage.getItem('seller_id') || 'seller_' + Date.now();
      
      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          seller_id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create product');
      }

      setSuccess('✅ Product created successfully! Redirecting to dashboard...');
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        currency: 'USD',
      });

      // Redirect to seller dashboard after 2 seconds
      setTimeout(() => {
        router.push('/seller/dashboard');
      }, 2000);
    } catch (err: any) {
      setError('❌ ' + (err.message || 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <a href="/seller/dashboard" className="text-gray-300 hover:text-orange-400 transition-colors">
            ← Back
          </a>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Add New Product
          </h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800 to-slate-800/50 p-8 rounded-2xl shadow-lg border border-orange-500/20">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-gray-300 font-semibold mb-2">Product Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Handwoven Kente Cloth"
              className="w-full px-4 py-3 bg-slate-700/50 border border-orange-500/30 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-300 font-semibold mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell the story of your product. What makes it special? What materials are used?"
              className="w-full px-4 py-3 bg-slate-700/50 border border-orange-500/30 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400 h-32 transition-colors resize-none"
              required
            />
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-orange-500/30 rounded-lg focus:outline-none focus:border-orange-500 text-white transition-colors"
                required
              >
                <option value="">Select category...</option>
                <option value="textiles">Textiles & Clothing</option>
                <option value="jewelry">Jewelry</option>
                <option value="art">Art & Sculptures</option>
                <option value="home">Home Decor</option>
                <option value="crafts">Crafts & Accessories</option>
                <option value="furniture">Furniture</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-slate-700/50 border border-orange-500/30 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400 transition-colors"
                required
              />
            </div>
          </div>

          {/* Currency */}
          <div className="mb-6">
            <label className="block text-gray-300 font-semibold mb-2">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-orange-500/30 rounded-lg focus:outline-none focus:border-orange-500 text-white transition-colors"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="ZAR">ZAR (R)</option>
              <option value="NGN">NGN (₦)</option>
              <option value="KES">KES (KSh)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-orange-500/50"
          >
            {loading ? '⏳ Creating Product...' : '✨ Submit for Review'}
          </button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Your product will be reviewed by our team before it goes live.
          </p>
        </form>
      </main>
    </div>
  );
}
