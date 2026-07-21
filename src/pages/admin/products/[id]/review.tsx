import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ReviewProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch product details
      setLoading(false);
    }
  }, [id]);

  const handleApprove = async () => {
    // API call to approve product
    console.log('Approving product:', id);
  };

  const handleReject = async () => {
    // API call to reject product
    console.log('Rejecting product:', id);
  };

  const handleRefineWithAI = async () => {
    // API call to refine description with AI
    console.log('Refining with AI');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">Review Product</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Product Details</h2>
              <p><strong>Title:</strong> Sample Product</p>
              <p><strong>Description:</strong> Sample description</p>
              <p><strong>Price:</strong> $99.99</p>
            </div>
            <div>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Product Image</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-bold mb-2">Admin Notes</label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 h-24"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRefineWithAI}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700"
            >
              ✨ Refine with AI
            </button>
            <button
              onClick={handleApprove}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
