import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">🌍 African Curios Marketplace</h1>
        <p className="text-xl mb-8">Discover authentic African crafts and artifacts</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
            Sign In
          </button>
          <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 border-2 border-white">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
