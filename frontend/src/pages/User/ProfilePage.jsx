import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    paymentType: '',
  });

  useEffect(() => {
    // Fetch user details from local storage when the component is mounted
    const savedUser = JSON.parse(localStorage.getItem('user')) || {
      name: 'John Doe',
      email: 'john@example.com',
      paymentType: 'Flat Payment',
    };
    setUser(savedUser);
  }, []);

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Profile</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Username</h2>
        <p className="text-gray-600">{user.name}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Email</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Payment Type</h2>
        <p className="text-gray-600">{user.paymentType}</p>
      </div>
      <button
        onClick={() => alert('Edit functionality not implemented yet')}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
