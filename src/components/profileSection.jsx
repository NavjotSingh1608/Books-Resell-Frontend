import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing an icon for the profile

const ProfileIcon = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to navigate to the profile page
  const goToProfile = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <div
      className="fixed flex bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
      onClick={goToProfile}
    >
        <span className='px-1 py-1'>Profile</span>
      <FaUserCircle size={30} /> {/* Profile icon */}
    </div>
  );
};

export default ProfileIcon;
