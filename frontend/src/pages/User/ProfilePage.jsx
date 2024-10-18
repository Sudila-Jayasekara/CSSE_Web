import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    paymentType: '',
    contactNumber: '',
    profilePicture: '',
  });

  useEffect(() => {
    // Fetch user details from local storage when the component is mounted
    const savedUser = JSON.parse(localStorage.getItem('user')) || {
      name: 'John Doe',
      email: 'john@example.com',
      paymentType: 'Flat Payment',
      contactNumber: '123-456-7890',
      profilePicture: '',
    };
    setUser(savedUser);
  }, []);

  // Handle profile picture change
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = {
          ...user,
          profilePicture: reader.result,
        };
        setUser(updatedUser);
        // Save the updated user with profilePicture in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Profile</h1>

      {/* Profile Picture */}
      <div className="mb-4 text-center">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="block mx-auto mb-4"
        />
      </div>

      {/* Username */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Username</h2>
        <p className="text-gray-600">{user.name}</p>
      </div>

      {/* Email */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Email</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Contact Number */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Contact Number</h2>
        <p className="text-gray-600">{user.phone}</p>
      </div>

      {/* Payment Type */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Payment Type</h2>
        <p className="text-gray-600">{user.paymentType}</p>
      </div>

      
    </div>
  );
};

export default Profile;
