import React, { useState,useEffect  } from "react";
import { recycleItemService } from "../../../services/WasteManagement/RecycleItemService";
import { useNavigate } from "react-router-dom";

const AddRecycleItem = () => {
  const [formData, setFormData] = useState({
    wasteType: "",
    totalQuantity: "",
    paymentType: "",
    dateTime: "",
    address: "",
    user: null,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch the user from localStorage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: user // Set the user from localStorage
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Form Data: ", formData);
  
    try {
      const response = await recycleItemService.saveRecycleItem(formData);
  
      if (response) {
        alert("Recycle item added successfully!");
        navigate("/recycle-items"); 
      }
    } catch (error) {
      console.error("Error details: ", error);
        setError("Error adding recycle item. Please try again.");
    }
  };
  

  const inputField = (label, name, type) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>
  );

  const wasteTypeDropdown = () => (
    <div>
      <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700">
        Waste Type
      </label>
      <select
        id="wasteType"
        name="wasteType"
        value={formData.wasteType}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      >
        <option value="">Select Waste Type</option>
        <option value="Electronic">Electronic</option>
        <option value="Glass">Glass</option>
        <option value="Plastic">Plastic</option>
        <option value="Metal">Metal</option>
        <option value="Paper">Paper</option>
      </select>
    </div>
  );

  // Date and time input field
  const dateTimeField = () => (
    <div>
      <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
        Date and Time
      </label>
      <input
        type="datetime-local"
        id="dateTime"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>
  );

  return (
    <div className="m-4">
      <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Add Recycle Item</h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {wasteTypeDropdown()} {/* Waste Type Dropdown */}
          {inputField("Total Quantity", "totalQuantity", "text")}
          {dateTimeField()} {/* DateTime Input */}
          {inputField("Address", "address", "text")}

          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecycleItem;
