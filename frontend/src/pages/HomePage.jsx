import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>      
      <div className='flex flex-col items-center space-y-4'>
        <Link 
          to="/data-analytics" 
          className='text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out'>
          Link to Data Analytics Pages
        </Link>
        
        <Link 
          to="/payment-management" 
          className='text-green-500 hover:text-green-700 transition duration-300 ease-in-out'>
          Link to Payment Management
        </Link>
        
        <Link 
          to="/waste-collection" 
          className='text-yellow-500 hover:text-yellow-700 transition duration-300 ease-in-out'>
          Link to Waste Collection
        </Link>
        
        <Link 
          to="/waste-management" 
          className='text-red-500 hover:text-red-700 transition duration-300 ease-in-out'>
          Link to Waste Management
        </Link>
      </div>
    </>
  );
};

export default HomePage;
