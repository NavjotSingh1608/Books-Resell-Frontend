import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const generateReferenceId = () => {
  return uuidv4(); // Generates a unique reference ID
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

function PredictionPage() {
  const [images, setImages] = useState([]);
  const [publicationYear, setPublicationYear] = useState('');
  const [priceImage, setPriceImage] = useState(null); // For the image containing the price
  const [costPrice, setCostPrice] = useState(''); // Cost Price entered by the user
  const [bookName, setBookName] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [referenceId, setReferenceId] = useState(generateReferenceId());
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handlePriceImageChange = (event) => {
    setPriceImage(event.target.files[0]);
  };

  const handleImageRemove = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // Function to handle price image extraction and updating cost price
  const handlePriceImageUpload = async () => {
    if (!priceImage) {
      alert('Please upload an image of the price label.');
      return;
    }

    const formData = new FormData();
    formData.append('price_image', priceImage); // Sending the price image to backend

    try {
      const response = await axios.post(`${API_BASE_URL}/extract-price`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { extracted_price } = response.data;
      if (extracted_price) {
        setCostPrice(extracted_price); // Set the extracted price into the Cost Price field
      } else {
        alert('Could not extract price from the image. Please provide a clearer image.');
      }
    } catch (error) {
      console.error('Error extracting price:', error);
      alert('Failed to extract price from the image.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = localStorage.getItem('email'); // Fetch email from localStorage
    if (!email) {
      alert('You must be logged in to submit.');
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append('book_images', img));
    formData.append('publication_year', publicationYear);
    formData.append('cost_price', costPrice); // Include the extracted price here
    formData.append('book_name', bookName);
    formData.append('book_description', bookDescription);
    formData.append('author_name', authorName);
    formData.append('email', email); // Send stored email
    formData.append('reference_id', referenceId);

    try {
      const response = await axios.post(`${API_BASE_URL}/store-book-details`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { final_price } = response.data;
      setPredictedPrice(final_price.toFixed(2));
    } catch (error) {
      console.error('Error predicting price:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async () => {
    if (!window.confirm('Are you sure you want to upload this book for sale?')) return;

    const email = localStorage.getItem('email'); // Fetch email from localStorage
    if (!email) {
      alert('You must be logged in to upload a book.');
      return;
    }

    const referenceId = generateReferenceId();

    const formData = new FormData();
    images.forEach((img) => formData.append('book_images', img));
    formData.append('publication_year', publicationYear);
    formData.append('cost_price', costPrice);
    formData.append('book_name', bookName);
    formData.append('book_description', bookDescription);
    formData.append('author_name', authorName);
    formData.append('email', email); // Send stored email
    formData.append('final_price', predictedPrice);
    formData.append('reference_id', referenceId);

    try {
      await axios.post(`${API_BASE_URL}/upload-book`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Book successfully uploaded for sale!');
      setImages([]);
      setPublicationYear('');
      setCostPrice('');
      setBookName('');
      setBookDescription('');
      setAuthorName('');
      setPredictedPrice(null);
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Failed to upload book.');
    }
  };

  return (
    <div className="mx-auto p-16 top-[6rem] w-full max-w-7xl relative">
      <h1 className="text-3xl font-bold mb-2 text-center">Predict Book Selling Price</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Book Name</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="border px-4 py-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Author Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="border px-4 py-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Book Description</label>
            <textarea
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
              className="border px-4 py-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Publication Year</label>
            <input
              type="number"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              className="border px-4 py-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Cost Price</label>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className="border px-4 py-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Upload Image of the Price Extraction (<span className='text-gray-500'>wait for sometime after upload</span>)
            <li>Please Upload clear image for better price detection</li>
            <li>Uploading misleading or fake price images may lead to a ban of your seller account</li>
            <li>We will verify the price from our side also</li>
            </label>
            <input
              type="file"
              onChange={handlePriceImageChange}
              className="border px-4 py-2 rounded-md w-full"
              required
            />
            <button
              type="button"
              onClick={handlePriceImageUpload}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Extract Price from Image
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Upload Book Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="border px-4 py-2 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict Price'}
            </button>
          </div>
        </form>

        <div>
          <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-4 mb-6">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Book Image ${index + 1}`}
                    className="w-32 h-48 object-cover rounded shadow cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => setPreviewImage(URL.createObjectURL(image))}
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs -mt-2 -mr-2 shadow-md hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mb-6">No images uploaded yet.</p>
          )}

          {predictedPrice && (
            <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md space-y-3">
              <div>
                <h2 className="text-lg font-semibold">Predicted Selling Price:</h2>
                <p className="text-2xl mt-1">₹{predictedPrice}</p>
              </div>
              <button
                onClick={handleFinalSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                Submit Book for Sale
              </button>
            </div>
          )}
        </div>
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PredictionPage;
