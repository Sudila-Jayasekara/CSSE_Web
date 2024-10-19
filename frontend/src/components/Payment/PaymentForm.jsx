import React, { useState } from "react";
import { useLocation , useNavigate  } from 'react-router-dom'; // Import useLocation to get state
import visa from '../../assets/visa.jpg';
import master from '../../assets/master.jpg';
import paypal from '../../assets/paypal.jpg';
import paymentImage from '../../assets/payment.jpg'; 

const PaymentForm = () => {
  const location = useLocation(); // Get the navigation state
  const navigate = useNavigate();

  const { amount } = location.state || { amount: 0 }; // Default to 0 if amount isn't passed

  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    saveCardDetails: false,
    email: "",
    phone: "",
  });

  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); // State to control popup visibility
  const user = JSON.parse(localStorage.getItem('user')); // Assuming 'user' is the key storing the user data
  const userId = user?.id || 1; // Fallback to 1 if user is not found
  const paymentType = user?.paymentType || "weight based"; 
 
  // Get the next payment date (for "Flat" payment type)
  const calculateNextPaymentDate = () => {
    const currentDate = new Date();
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    return nextMonth.toISOString();
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get current date and time
    const currentDateTime = new Date().toISOString();
  
    const nextPaymentDate = paymentType === "flat" ? calculateNextPaymentDate() : null;
  
    // Logging values to ensure they are correct
    console.log('User ID:', userId);
    console.log('Payment Type:', paymentType);
    console.log('Next Payment Date:', nextPaymentDate);
  
    const paymentData = {
      type: 'Credit Card', // assuming 'Credit Card' for now
      amount: amount,
      dateTime: currentDateTime,
      user: {
        id: userId // Use userId from localStorage or default to 1
      },
      recycleItem: null, // Set these based on your logic
      specialWaste: null, // Set these based on your logic
      paymentType: paymentType, // Example: replace with actual payment type logic
      nextPaymentDate: nextPaymentDate // Ensure the correct next payment date is passed
    };
  
    try {
      const response = await fetch("http://localhost:1010/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
  
      if (response.ok) {
        console.log("Payment successfully saved!");
        setIsPaymentSuccess(true); // Show success popup
      } else {
        console.error("Failed to save payment");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };
  


  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg flex">
      
      {/* Left Section: Payment Form */}
      <div className="w-2/3 pr-8">
        <h2 className="text-3xl font-semibold text-green-800 mb-6">Payment Process</h2>

        {/* Display the Amount to Pay */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Amount to Pay:</h3>
          <p className="text-gray-600">Rs {amount}</p> {/* Displaying the amount here */}
        </div>

        {/* Payment Methods */}
        <div className="flex items-center mb-4">
          <p className="mr-4 font-semibold">Payment Method</p>
          <img src={visa} alt="Visa" className="w-12 h-auto mb-4 ml-4" />
          <img src={master} alt="MasterCard" className="w-12 h-auto mb-4 ml-4" />
          <img src={paypal} alt="PayPal" className="w-12 h-auto mb-4 ml-4" />
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nameOnCard" className="block text-sm font-semibold mb-2">Name on card</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              placeholder="Meet Patel"
              value={formData.nameOnCard}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-semibold mb-2">Card number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="w-1/3">
              <label htmlFor="expiryMonth" className="block text-sm font-semibold mb-2">Card expiration (Month)</label>
              <select
                id="expiryMonth"
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                {/* Add more months */}
              </select>
            </div>

            <div className="w-1/3">
              <label htmlFor="expiryYear" className="block text-sm font-semibold mb-2">Year</label>
              <select
                id="expiryYear"
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                {/* Add more years */}
              </select>
            </div>

            <div className="w-1/3">
              <label htmlFor="securityCode" className="block text-sm font-semibold mb-2">Card Security Code</label>
              <input
                type="password"
                id="securityCode"
                name="securityCode"
                placeholder="Code"
                value={formData.securityCode}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="saveCardDetails"
                checked={formData.saveCardDetails}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-sm">Save card details</span>
            </label>
          </div>

          {/* Contact Information */}
          <h3 className="text-lg font-semibold mb-4">Contact information</h3>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            Complete Payment
          </button>
        </form>
      </div>

      {/* Right Section: Billing Address */}
      <div 
        className="w-1/3"
        style={{
          backgroundImage: `url(${paymentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '8px'
        }}
      >


        {/* Additional content for the right section can go here */}
      </div>
      {/* Payment Success Popup */}
      {isPaymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 text-center">
            <h3 className="text-xl font-semibold mb-4 text-green-800">Payment Successful</h3>
            <p className="text-lg text-gray-600 mb-4">Your payment of Rs {amount} was processed successfully!</p>
            <button
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              onClick={() => {setIsPaymentSuccess(false);
                navigate('/profile'); // Redirect to the profile page
              }} // Hide the popup when clicked
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
