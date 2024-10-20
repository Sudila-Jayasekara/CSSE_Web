import React, { useState, useEffect } from "react";
import { specialWasteService } from "../../../services/WasteManagement/SpecialWasteService";
import { useNavigate } from "react-router-dom";
import ImageSlideshow from "../ImageSlideshow";
//images
import recycleItems1 from "../../../assets/recycleItems.jpg";
import recycleItems2 from "../../../assets/recycleItems2.jpg";
import recycleItems3 from "../../../assets/recycleItems3.jpg";
import specialItems from "../../../assets/specialItems.jpg";

const AddSpecialWaste = () => {
  const [formData, setFormData] = useState({
    wasteType: "",
    description: "",
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
        user: user, // Set the user from localStorage
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
      const response = await specialWasteService.saveSpecialWaste(formData);

      if (response) {
        alert("Special waste added successfully!");
        navigate("/special-wastes");
      }
    } catch (error) {
      console.error("Error details: ", error);
      setError("Error adding special waste. Please try again.");
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
        <option value="Hazardous">Hazardous</option>
        <option value="Chemical">Chemical</option>
        <option value="Medical">Medical</option>
        <option value="Radioactive">Radioactive</option>
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

  const images = [recycleItems1, recycleItems2, recycleItems3, specialItems];

  return (
    <div className="flex h-screen w-full p-5 space-x-5">
      {/* Left: Form Section */}
      <div className="w-3/5 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Add Special Waste</h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {wasteTypeDropdown()} {/* Waste Type Dropdown */}
          {inputField("Description", "description", "text")} {/* Description Field */}
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

      {/* Right: Image Section */}
      <div className="w-2/5">
        <ImageSlideshow images={images} interval={5000} /> {/* Pass images to the Slideshow */}
      </div>
    </div>
  );
};

export default AddSpecialWaste;
