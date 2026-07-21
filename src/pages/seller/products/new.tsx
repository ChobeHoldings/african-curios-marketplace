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
      // Validate form data
      if (!formData.title.trim()) {
        throw new Error('Product title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!formData.category) {
        throw new Error('Category is required');
      }
      if (!formData.price || parseFloat(formData.price) <= 0) {
        throw new Error('Valid price is required');
      }

      const seller_id = localStorage.getItem('seller_id') || 'seller_' + Date.now();
      localStorage.setItem('seller_id', seller_id);
      
      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category,
          price: parseFloat(formData.price),
          currency: formData.currency,
          seller_id,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = 'Failed to create product';
        try {
          const result = JSON.parse(text);
          errorMessage = result.message || errorMessage;
        } catch (e) {
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();

      setSuccess('✅ Product created successfully! Redirecting to dashboard...');
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        currency: 'USD',
      });

      setTimeout(() => {
        router.push('/seller/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error('Error:', err);
      setError('❌ ' + (err.message || 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" style={{ borderBottomColor: '#C18F4C' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <a href="/seller/dashboard" className="font-semibold transition-colors" style={{ color: '#C18F4C' }}>
            ← Back to Dashboard
          </a>
          <h1 className="text-2xl font-bold" style={{ color: '#683837' }}>
            Add New Product
          </h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 rounded-lg border-l-4 text-green-800" style={{ backgroundColor: '#f0fdf4', borderColor: '#22c55e' }}>
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg border-l-4 text-red-800" style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border-t-4" style={{ borderTopColor: '#C18F4C' }}>
          {/* Title */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" style={{ color: '#683837' }}>Product Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Handwoven Kente Cloth"
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
              style={{ borderColor: '#C18F4C' }}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" style={{ color: '#683837' }}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell the story of your product. What makes it special? What materials are used?"
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 placeholder-gray-400 h-32 transition-colors resize-none"
              style={{ borderColor: '#C18F4C' }}
              required
            />
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-semibold mb-2" style={{ color: '#683837' }}>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 transition-colors"
                style={{ borderColor: '#C18F4C' }}
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
              <label className="block font-semibold mb-2" style={{ color: '#683837' }}>Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
                style={{ borderColor: '#C18F4C' }}
                required
              />
            </div>
          </div>

          {/* Currency */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" style={{ color: '#683837' }}>Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-900 transition-colors"
              style={{ borderColor: '#C18F4C' }}
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
            className="w-full text-white py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-md"
            style={{ backgroundColor: loading ? '#999' : '#C18F4C' }}
          >
            {loading ? '⏳ Creating Product...' : '✨ Submit for Review'}
          </button>

          <p className="text-gray-600 text-sm mt-4 text-center">
            Your product will be reviewed by our team before it goes live.
          </p>
        </form>
      </main>
    </div>
  );
}
