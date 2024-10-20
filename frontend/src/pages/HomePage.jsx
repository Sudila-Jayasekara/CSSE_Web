import React from 'react';
import background from '../assets/homeBackground.jpg'; // Make sure the path is correct

const HomePage = () => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }} // Use the imported image
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Environmental Solutions</h1>
        <p className="text-gray-600 mb-6">
          Explore our services and join us in making a difference for the planet.
        </p>
        <a 
          href="/data-analytics" 
          className='inline-block bg-blue-500 text-white hover:bg-blue-700 transition duration-300 ease-in-out px-4 py-2 rounded'>
          Data Analytics
        </a>
        <a 
          href="/payment-management" 
          className='inline-block bg-green-500 text-white hover:bg-green-700 transition duration-300 ease-in-out px-4 py-2 rounded ml-4'>
          Payment Management
        </a>
        <a 
          href="/waste-collection" 
          className='inline-block bg-yellow-500 text-white hover:bg-yellow-700 transition duration-300 ease-in-out px-4 py-2 rounded ml-4'>
          Waste Collection
        </a>
        <a 
          href="/waste-management" 
          className='inline-block bg-red-500 text-white hover:bg-red-700 transition duration-300 ease-in-out px-4 py-2 rounded ml-4'>
          Waste Management
        </a>
      </div>
    </div>
  );
};

export default HomePage;
