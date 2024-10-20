// src/components/WarningModal.jsx

import React from "react";

const WarningModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className=" bg-opacity-50 w-full h-full absolute" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        <h3 className="text-lg font-semibold text-red-600">Warning</h3>
        <p className="mt-2 text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
