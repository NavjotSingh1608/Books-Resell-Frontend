import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./styles.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col font-sans">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white shadow z-10 sticky top-0">
        <h1 className="text-xl font-bold text-blue-600">Book Resell Store</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="flex-grow flex flex-col justify-center items-center px-6 py-20 text-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/book2.jpg')",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backgroundBlendMode: "lighten",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-black p-2 rounded">
          Discover & Sell Books <br />
          <span className="text-blue-600">The Smart Way</span>
        </h1>
        <p className="text-lg max-w-xl text-black mb-8 px-4">
          Buy affordable second-hand books or sell yours easily. Join BookStore
          to make reading sustainable and budget-friendly.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition font-medium"
          >
            Login
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium"
          >
            Sign Up
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
          What Makes <span className="text-blue-600">Us Different?</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              title: "🔍 Easy Discovery",
              desc: "Advanced search helps you find the books you need in seconds.",
            },
            {
              title: "🚚 Fast Delivery",
              desc: "Get books delivered to your doorstep with lightning speed.",
            },
            {
              title: "🔄 Hassle-Free Selling",
              desc: "List your books in just a few clicks and start earning.",
            },
          ].map(({ title, desc }, i) => (
            <div
              key={i}
              className="p-6 bg-blue-50 border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/book1.jpg')",
          backgroundColor: "rgba(255,255,255,0.4)",
          backgroundBlendMode: "lighten",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-10 rounded-xl bg-white/90">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
            Why BookStore is the Right Choice
          </h2>
          <div className="text-left text-gray-800 space-y-6 text-base sm:text-lg">
            <p>
              <strong>✔ Curated for Students:</strong> Access syllabi-based
              books handpicked for your curriculum.
            </p>
            <p>
              <strong>✔ Trusted by Sellers:</strong> Join hundreds of students
              already earning from unused books.
            </p>
            <p>
              <strong>✔ Personalized Experience:</strong> Get book
              recommendations and tailored updates.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BookStore. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Landing;
