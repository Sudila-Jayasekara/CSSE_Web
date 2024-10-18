import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, item, handlePayment }) => {
    const [amount, setAmount] = useState('');
    const [dateTime, setDateTime] = useState('');
  
    const handleSubmit = () => {
      if (amount && dateTime) {
        handlePayment(item, amount, dateTime);
        onClose(); // Close the modal after submitting the payment
      } else {
        alert("Please fill all fields");
      }
    };
  
    return (
      isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Payment for {item?.wasteType}</h2>
            <div className="mb-4">
              <label>Amount: </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label>Date and Time: </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
                Submit Payment
              </button>
              <button onClick={onClose} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    );
  };
  
  export default PaymentModal;