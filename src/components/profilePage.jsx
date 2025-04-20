import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa"; // Import pencil icon

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null); // To store the selected profile image

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user-profile?email=${email}`);
      setUserData(res.data.user);

      if (res.data.user && res.data.user.email) {
        const cartRes = await axios.get(`${API_BASE_URL}/cart?email=${res.data.user.email}`);
        setBooks(cartRes.data.cart_items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);  // Appending the file

    try {
      const res = await axios.post(`${API_BASE_URL}/upload-profile-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set header to handle FormData
      });

      // Update userData with the new profile image URL
      setUserData((prevData) => ({
        ...prevData,
        profile_image: res.data.image_url,
      }));
    } catch (err) {
      console.error("Error uploading profile image:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleBackToShop = () => {
    navigate("/shop");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white p-36 shadow-md rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        {userData ? (
          <>
            <div className="mb-4 relative">
              {userData.profile_image ? (
                <img
                  src={userData.profile_image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto"
                />
              ) : (
                <p>No profile image</p>
              )}

              {/* Circle with pencil icon at the bottom-right */}
              <label
                htmlFor="profileImageInput"
                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700"
                style={{ transform: "translate(20%, 20%)" }}
              >
                <FaPen size={16} />
              </label>
              <input
                type="file"
                id="profileImageInput"
                style={{ display: "none" }}
                onChange={handleProfileImageUpload}
              />
            </div>
            <p className="mb-2"><strong>Name:</strong> {userData.name}</p>
            <p className="mb-2"><strong>Email:</strong> {userData.email}</p>
            <p className="mb-2"><strong>Role:</strong> {userData.role}</p>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
        <p className="mb-4">
          <strong>
            {role === "buyer" ? "Books Uploaded:" : "Books in Cart:"}
          </strong>{" "}
          {loading ? "Loading..." : books.length}
        </p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleBackToShop}
        >
          Back to Shop
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
