import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/CSSELogo.png'

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center h-16 px-4">
<div className="flex items-center justify-center">
  <div className="bg-white w-20 h-10 rounded-lg p-2 flex items-center justify-center overflow-hidden"> {/* Container with fixed size */}
    <img className="h-10 w-10" src={logo} alt="Logo" /> {/* Increase the logo size */}
  </div>
</div>


      {/* Navigation Links (Hidden on small screens) */}
      <div className="hidden md:flex space-x-10">
        <a href="/" className="text-gray-300 hover:text-white">Home</a>
        <a href="#" className="text-gray-300 hover:text-white">About</a>
        <a href="#" className="text-gray-300 hover:text-white">Services</a>
        <a href="#" className="text-gray-300 hover:text-white">Contact</a>
      </div>

      {/* Search Bar (Hidden on small screens) */}
      <div className="hidden md:flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-lg text-black focus:outline-none"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Search
        </button>
      </div>

      {/* User Profile Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <img
          className="h-8 w-8 rounded-full"
          src="https://via.placeholder.com/40"
          alt="User Avatar"
        />
        <button
          onClick={handleProfileClick}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Profile
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button className="text-white hover:text-gray-300 focus:outline-none">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
