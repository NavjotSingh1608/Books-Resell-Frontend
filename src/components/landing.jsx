import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with Login & Signup */}
      <header className="w-full px-4 py-4 flex justify-end bg-white shadow-md z-10">
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center px-6 py-16 text-center bg-white mt-8 sm:mt-16 md:mt-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-16 mb-6 leading-tight">
          Welcome to <span className="text-blue-600">BookStore</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mb-8 text-gray-700">
          Discover affordable second-hand books or sell yours to readers everywhere.
          BookStore is your go-to platform for sustainable, low-cost reading.
        </p>

        {/* Buttons Under Hero */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm border border-blue-600 text-white-600 py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">Why Choose BookStore?</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">📚 Massive Selection</h3>
            <p className="text-gray-700">Thousands of pre-loved books available across all genres.</p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">💸 Budget Friendly</h3>
            <p className="text-gray-700">Buy or sell books at the lowest prices with maximum convenience.</p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">🌱 Sustainable Choice</h3>
            <p className="text-gray-700">Give books a second life and reduce your carbon footprint.</p>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-16 bg-gray-100 text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">Why Online Book Selling Works</h2>
        <div className="max-w-4xl mx-auto text-left text-gray-700 space-y-6 text-sm sm:text-base">
          <p><strong>✔ Convenience:</strong> Post your books online from home, and reach buyers instantly.</p>
          <p><strong>✔ Affordability:</strong> Students and readers can access books at half the price.</p>
          <p><strong>✔ Community:</strong> Connect with other book lovers and make your old books count.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p className="text-sm">&copy; 2025 BookStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
