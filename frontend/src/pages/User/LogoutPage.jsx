import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the user data from localStorage on logoutPage
    localStorage.removeItem('user');

    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Logging Out...</h2>
        <p className="text-gray-600">You have been logged out successfully. Redirecting...</p>
      </div>
    </div>
  );
};

export default LogoutPage;
