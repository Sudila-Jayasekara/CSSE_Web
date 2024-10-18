import React, { useState, useEffect } from 'react';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [toggledSections, setToggledSections] = useState({});

  // Load the saved toggle state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('toggledSections');
    if (savedState) {
      setToggledSections(JSON.parse(savedState)); // Load saved state from localStorage
    }
  }, []);

  // Function to toggle a specific section and save the state to localStorage
  const toggleSection = (section) => {
    const newState = {
      ...toggledSections,
      [section]: !toggledSections[section], // Toggle the section
    };
    setToggledSections(newState);

    // Save the updated state to localStorage
    localStorage.setItem('toggledSections', JSON.stringify(newState));
  };

  return (
    <aside className={`bg-gray-800 text-white w-64 ${collapsed ? 'hidden' : 'block'} md:block transition-all ease-in-out duration-300`}>
      <div className="h-full flex flex-col">
        {/* Menu Toggle Button */}
        <button className="md:hidden p-4 text-white bg-gray-700 hover:bg-gray-600" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Show Menu' : 'Hide Menu'}
        </button>
        
        {/* Logo */}
        <div className="flex items-center justify-center py-4">
          <img className="h-10" src="https://via.placeholder.com/150x50" alt="Sidebar Logo" />
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-4 px-4">
          {/* Toggleable Section 1 */}
          <div>
            <button 
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection('users')}
            >
              Users
            </button>
            {toggledSections['users'] && (
              <div className="pl-6 space-y-2">
                <a href="/login" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">Login</a>
                <a href="/register" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">Register</a>
                <a href="/users" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">View Users</a>
              </div>
            )}
          </div>
          
          {/* Toggleable Section 2 */}
          <div>
            <button 
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection('settings')}
            >
              Settings
            </button>
            {toggledSections['settings'] && (
              <div className="pl-6 space-y-2">
                <a href="/profile" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">Profile</a>
                <a href="/security" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">Security</a>
              </div>
            )}
          </div>

          {/* Additional sections can be added here similarly */}
          
          {/* Other Links */}
          <a href="#" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">Reports</a>
        </nav>
        
        {/* Logout */}
        <div className="bg-gray-700 p-4">
          <a href="#" className="text-gray-300 hover:text-white">Logout</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
