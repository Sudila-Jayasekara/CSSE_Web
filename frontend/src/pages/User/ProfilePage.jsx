import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    paymentType: '',
    phone: '',
    profilePicture: '',
  });

  const [showPaymentDetails, setShowPaymentDetails] = useState(false); // State to toggle payment details
  const [months, setMonths] = useState([]); // State to store months for the dropdown
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch user details from local storage when the component is mounted
    const savedUser = JSON.parse(localStorage.getItem('user')) || {
      name: 'John Doe',
      email: 'john@example.com',
      paymentType: 'Flat Payment',
      phone: '123-456-7890',
      profilePicture: '',
    };
    setUser(savedUser);

    // Generate months starting from the current month
    generateMonthsList();
  }, []);

  // Helper function to generate months list
  const generateMonthsList = () => {
    const currentMonth = new Date().getMonth(); // Get current month (0-11, where 0 is January)
    const monthsList = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Filter out past months, show only the current month and future months
    const availableMonths = monthsList.slice(currentMonth);
    setMonths(availableMonths);
  };

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

  // Toggle payment details visibility
  const togglePaymentDetails = () => {
    setShowPaymentDetails(!showPaymentDetails);
  };

  // Navigate to payment form
  const handlePayClick = () => {
    navigate('/paymentform'); // Assuming your payment form is routed to /payment-form
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

      {/* Payment Details (for Flat Payment only) */}
      {user.paymentType === 'flat' && (
        <div className="mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={togglePaymentDetails}
          >
            {showPaymentDetails ? 'Hide Payment Details' : 'View Payment Details'}
          </button>

          {showPaymentDetails && (
            <div className="mt-4 bg-gray-100 p-6 rounded-md">
              <h2 className="text-2xl font-bold mb-4 text-center">Flat Payment</h2>

              {/* Select payment month */}
              <div className="mb-4">
                <label className="text-lg font-medium">Select payment month</label>
                <select className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold">Monthly payment :</h3>
                <p className="text-gray-600">Rs 1,500</p>
              </div>

              <button
                className="px-4 py-2 mt-4 bg-green-500 text-white rounded-md w-full"
                onClick={handlePayClick}
              >
                Make Payment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
