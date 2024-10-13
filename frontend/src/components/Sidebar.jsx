import React from 'react';

const Sidebar = ({ collapsed, setCollapsed }) => (
  <aside className={`bg-gray-800 text-white w-64 ${collapsed ? 'hidden' : 'block'} md:block transition-all ease-in-out duration-300`}>
    <div className="h-full flex flex-col">
      <button className="md:hidden p-4 text-white bg-gray-700 hover:bg-gray-600" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? 'Show Menu' : 'Hide Menu'}
      </button>
      <div className="flex items-center justify-center py-4">
        <img className="h-10" src="https://via.placeholder.com/150x50" alt="Sidebar Logo" />
      </div>
      <nav className="flex-1 space-y-4 px-4">
        <a href="#" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">Dashboard</a>
        <a href="#" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">Settings</a>
        <a href="#" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">Reports</a>
        <a href="#" className="block text-gray-300 hover:text-white py-2 px-4 rounded-md">Users</a>
      </nav>
      <div className="bg-gray-700 p-4">
        <a href="#" className="text-gray-300 hover:text-white">Logout</a>
      </div>
    </div>
  </aside>
);

export default Sidebar;
