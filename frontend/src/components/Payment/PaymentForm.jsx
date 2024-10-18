import React, { useState } from "react";
import visa from '../../assets/visa.jpg'
import master from '../../assets/master.jpg'
import paypal from '../../assets/paypal.jpg'

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    saveCardDetails: false,
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg flex">

      <div className="w-2/3 pr-8">
        <h2 className="text-3xl font-semibold text-green-800 mb-6">Payment Process</h2>

      
        <div className="flex items-center mb-4">
          <p className="mr-4 font-semibold">Payment Method</p>
          <img src={visa} alt="Visa" className="w-12 h-auto mb-4 ml-4" />
          <img src={master} alt="MasterCard" className="w-12 h-auto mb-4 ml-4" />
          <img src={paypal} alt="PayPal" className="w-12 h-auto mb-4 ml-4" />
        </div>

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

          {/* Card Number */}
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

          {/* Card Expiry and Security Code */}
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

          {/* Save Card Details */}
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
        </form>
      </div>

      {/* Right Section: Billing Address */}
      <div className="w-1/3">
        <h3 className="text-lg font-semibold mb-4">Billing address</h3>

        <form onSubmit={handleSubmit}>
          {/* Country */}
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-semibold mb-2">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>Country</option>
              <option value="USA">United States</option>
              <option value="CA">Canada</option>
              {/* Add more countries */}
            </select>
          </div>

          {/* Address, City, State, Zip Code */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-semibold mb-2">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-semibold mb-2">State</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="zipCode" className="block text-sm font-semibold mb-2">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
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
    </div>
  );
};

export default PaymentForm;
