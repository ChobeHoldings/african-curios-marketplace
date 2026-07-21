import React, { useState, useEffect } from 'react';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
  });

  useEffect(() => {
    // Fetch seller products and stats
    setStats({
      total: 0,
      pending: 0,
      approved: 0,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b" style={{ borderBottomColor: '#C18F4C' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#683837' }}>
                Seller Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your products and sales</p>
            </div>
            <a
              href="/"
              className="text-white px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: '#C18F4C' }}
            >
              ← Back Home
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#C18F4C' }}>
            <p className="text-gray-600 text-sm font-semibold">Total Products</p>
            <p className="text-4xl font-bold mt-2" style={{ color: '#683837' }}>
              {stats.total}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#C18F4C' }}>
            <p className="text-gray-600 text-sm font-semibold">Pending Review</p>
            <p className="text-4xl font-bold mt-2" style={{ color: '#C18F4C' }}>
              {stats.pending}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#683837' }}>
            <p className="text-gray-600 text-sm font-semibold">Published</p>
            <p className="text-4xl font-bold mt-2" style={{ color: '#683837' }}>
              {stats.approved}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <a
            href="/seller/products/new"
            className="inline-block text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-md"
            style={{ backgroundColor: '#C18F4C' }}
          >
            + Add New Product
          </a>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#683837' }}>
            Your Products
          </h2>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No products yet. Start by adding your first product!</p>
              <a
                href="/seller/products/new"
                className="inline-block text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: '#C18F4C' }}
              >
                Create Your First Product
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottomColor: '#C18F4C' }} className="border-b-2">
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#683837' }}>
                      Product Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#683837' }}>
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#683837' }}>
                      Price
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#683837' }}>
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: '#683837' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Products would be mapped here */}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
