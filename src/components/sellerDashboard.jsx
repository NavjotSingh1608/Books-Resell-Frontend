import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from './profileSection';
import ProfilePage from './profilePage';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function SellerDashboard() {
  const [books, setBooks] = useState([]);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get(`${API_BASE_URL}/seller/books?email=${email}`);
    setBooks(res.data.books);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
        <ProfileIcon/>
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Seller Panel</h2>
          <nav className="flex flex-col gap-4 text-gray-700">
            <Link to="/prediction" className="hover:text-blue-600 transition font-medium">
              ➕ Sell Book
            </Link>
            <span className="text-blue-600 font-semibold">📚 View Listed Books</span>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-10 text-white-500 hover:text-white-600 font-medium transition-all"
        >
          🚪 Logout
        </button>
      </div>

      {/* Right Main Area */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Books You've Listed</h1>

        {books.length === 0 ? (
          <p className="text-gray-500">You haven't listed any books yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition">
                {book.book_images?.[0] && (
                  <img
                    src={book.book_images[0]}
                    alt="Book"
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h2 className="text-lg font-semibold mb-1">{book.book_name}</h2>
                <p className="text-sm text-gray-600">Author: {book.author_name}</p>
                <p className="text-sm text-gray-600">Year: {book.publication_year}</p>
                <p className="text-sm text-gray-800 font-bold mt-2">₹{book.final_price}</p>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this book?")) {
                      axios.delete(`${API_BASE_URL}/seller/book/${book.reference_id}`).then(() => {
                        alert("Book deleted");
                        fetchBooks();
                      }).catch(err => {
                        alert("Error deleting book");
                        console.error(err);
                      });
                    }
                  }}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerDashboard;
