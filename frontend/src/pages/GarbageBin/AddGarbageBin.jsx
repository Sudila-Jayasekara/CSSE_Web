import React, { useState, useEffect } from "react";
import { garbageBinService } from '../../services/GarbageBinManagement/GarbageBinServce';
import { useNavigate } from "react-router-dom";

const AddGarbageBin = () => {
  const [formData, setFormData] = useState({
    name: "",
    garbageType: "",
    garbageLevel: "",
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
      const response = await garbageBinService.saveGarbageBin(formData);

      if (response) {
        alert("Recycle item added successfully!");
        navigate("/list-bin"); 
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
      <label htmlFor="garbageType" className="block text-sm font-medium text-gray-700">
        Garbage Type
      </label>
      <select
        id="garbageType"
        name="garbageType"
        value={formData.garbageType}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      >
        <option value="">Select Garbage Type</option>
        <option value="type_01">type_01</option>
        <option value="type_02">type_02</option>
        <option value="type_03">type_03</option>
      </select>
    </div>
  );

  return (
    <div className="m-4">
      <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Add Garbage Bin</h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputField("Name", "name", "text")} {/* Name Input */}
          {wasteTypeDropdown()} {/* Garbage Type Dropdown */}
          {inputField("Garbage Level", "garbageLevel", "number")} {/* Garbage Level Input */}
          {inputField("Address", "address", "text")} {/* Address Input */}

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

export default AddGarbageBin;
