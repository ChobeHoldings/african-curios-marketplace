import React, { useState } from 'react';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">Seller Dashboard</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Total Products</p>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Published</p>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 mb-8">
          Add New Product
        </button>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Products</h2>
            <p className="text-gray-600">No products yet. Add one to get started!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
