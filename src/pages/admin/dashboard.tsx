import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    // Fetch admin stats
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b" style={{ borderBottomColor: '#C18F4C' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#683837' }}>
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Review and manage products</p>
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
            <p className="text-gray-600 text-sm font-semibold">Pending Review</p>
            <p className="text-4xl font-bold mt-2" style={{ color: '#C18F4C' }}>
              {stats.pending}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#683837' }}>
            <p className="text-gray-600 text-sm font-semibold">Approved</p>
            <p className="text-4xl font-bold mt-2" style={{ color: '#683837' }}>
              {stats.approved}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: '#999' }}>
            <p className="text-gray-600 text-sm font-semibold">Rejected</p>
            <p className="text-4xl font-bold mt-2" style={{ color: '#999' }}>
              {stats.rejected}
            </p>
          </div>
        </div>

        {/* Pending Products Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#683837' }}>
            Pending Products for Review
          </h2>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No pending products to review</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#683837' }}>
            Recent Activity
          </h2>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recent activity</p>
          </div>
        </div>
      </main>
    </div>
  );
}
