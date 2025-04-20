import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa'; 
import CartIcon from './cartIcon';
import ProfileIcon from './profileSection';

// API_BASE_URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL;

function BookListingsPage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userEmail, setUserEmail] = useState('test@example.com');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/books`);
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.book_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = async (book) => {
    const email = localStorage.getItem('email'); // Fetch email from localStorage
    if (!email) {
      alert('You must be logged in to upload a book.');
      return;
    }
    setUserEmail(email);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('reference_id', book.reference_id);

      await axios.post(`${API_BASE_URL}/add-to-cart`, formData);
      alert('Book added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add book to cart.');
    }
  };

  return (
    <div className="mx-auto p-6 w-full max-w-7xl relative">
        <CartIcon />
        <ProfileIcon />
      <h1 className="text-3xl font-bold mb-6 text-center">Book Listings</h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a book..."
          className="border px-4 py-2 rounded-md w-full"
        />
      </div>

      {/* Book cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.reference_id} className="border p-4 rounded-md shadow-lg">
              <img
                src={book.book_images[0]}
                alt={book.book_name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{book.book_name}</h2>
              <p className="text-gray-600">{book.author_name}</p>
              <p className="mt-2">₹{book.final_price}</p>
              <button
                onClick={() => setSelectedBook(book)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 w-full hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4 text-center">{selectedBook.book_name}</h2>

            <div className="flex gap-4 overflow-x-auto mb-6">
              {selectedBook.book_images.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Book Image ${index + 1}`}
                  className="h-48 w-auto rounded-md border shadow cursor-pointer"
                  onClick={() => setSelectedImage(imgUrl)}
                />
              ))}
            </div>

            <div className="mb-4">
              <p className="mb-2"><strong>Author:</strong> {selectedBook.author_name}</p>
              <p className="mb-2"><strong>Description:</strong> {selectedBook.book_description}</p>
              <p className="mb-2"><strong>Price:</strong> ₹{selectedBook.final_price}</p>
              <p className="mb-2"><strong>Email: </strong> {selectedBook.email}</p>
            </div>

            <div className="mt-4 flex gap-4 justify-end">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={() => addToCart(selectedBook)}
              >
                Add to Cart
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={() => setSelectedBook(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[999]">
          <div className="max-w-4xl w-full px-4">
            <button
              className="justify-center top-4 max-w-[2rem] text-white-600 text-xl font-bold bg-red rounded-full px-2 py-0.5 shadow hover:bg-red-600"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Enlarged"
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BookListingsPage;
