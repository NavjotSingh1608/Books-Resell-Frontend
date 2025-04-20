import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

// API_BASE_URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL;

const CartIcon = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState('');

  const toggleCart = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('You must be logged in to upload a book.');
      return;
    }
    if (!showCart && email) {
      try {
        const res = await axios.get(`${API_BASE_URL}/cart?email=${email}`);
        setCartItems(res.data.cart_items);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    }
    setShowCart(!showCart);
  };

  const removeFromCart = async (referenceId) => {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('You must be logged in to remove items from the cart.');
      return;
    }
  
    try {
      await axios.delete(`${API_BASE_URL}/remove-from-cart`, {
        params: { email, reference_id: referenceId }
      });
  
      setCartItems(cartItems.filter(item => item.reference_id !== referenceId));
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };

  return (
    <div className="absolute top-6 right-6 z-50">
      {/* Cart Icon Button */}
      <button
        onClick={toggleCart}
        className="text-xl text-white hover:text-blue-200 transition-colors duration-200"
      >
        <FaShoppingCart />
      </button>

      {/* Cart Card */}
      {showCart && (
        <div className="absolute right-0 mt-4 w-80 bg-white text-black p-4 rounded-lg shadow-lg z-50">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button
              onClick={() => setShowCart(false)}
              className="w-8 h-8 flex items-center bg-red-600 justify-center text-white-600 hover:text-white-500 hover:bg-red-500 text-lg border rounded"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between border p-2 rounded mb-2">
                {/* Book Image */}
                <img
                    src={item.book_images[0]}
                    alt={item.book_name}
                    className="w-16 h-24 object-cover rounded"
                />
                {/* Book Details */}
                <div className="flex flex-col justify-between ml-4 flex-1">
                    <h3 className="text-md font-semibold">{item.book_name}</h3>
                    <p className="text-sm text-gray-600">{item.author_name}</p>
                    <p className="text-blue-700 font-bold">₹{item.final_price}</p>
                </div>

                {/* Remove Button */}
                <button
                    onClick={() => removeFromCart(item.reference_id)} // Pass the _id here
                    className="bg-red-600 w-auto text-white-600 hover:text-white-800 hover:bg-red-500"
                >
                    ✕
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
