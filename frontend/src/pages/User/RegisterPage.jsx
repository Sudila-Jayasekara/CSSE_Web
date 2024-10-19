import React, { useState } from "react";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        paymentType: "",
        role: "USER", // Set the default role to USER
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.saveUser(formData);
            if (response) {
                alert("User registered successfully!");
                navigate("/login"); // Use navigate to redirect to login page
            }
        } catch (error) {
            setError("Error registering user. Please try again.");
        }
    };

    // InputField component
    const InputField = ({ label, name, type }) => (
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

    // Dropdown component
    const Dropdown = ({ label, name, options }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            >
                <option value="">Select Payment Type</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="m-4">
            <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300">
                <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Create Your Account</h2>

                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField label="Name" name="name" type="text" />
                    <InputField label="Email" name="email" type="email" />
                    <InputField label="Password" name="password" type="password" />
                    <InputField label="Phone Number" name="phone" type="text" />
                    <Dropdown
                        label="Payment Type"
                        name="paymentType"
                        options={[
                            { label: "Flat", value: "flat" },
                            { label: "Weight-Based", value: "weight_based" },
                        ]}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
