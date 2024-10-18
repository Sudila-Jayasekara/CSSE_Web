import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService'; // Adjust the import path as needed

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all users when the component is mounted
    const fetchUsers = async () => {
      try {
        const userList = await userService.getAllUsers();
        setUsers(userList);
      } catch (error) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className='m-4'>
        <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Users List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Payment Type</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-3 px-4 text-gray-800">{user.id}</td>
                <td className="py-3 px-4 text-gray-800">{user.name}</td>
                <td className="py-3 px-4 text-gray-800">{user.email}</td>
                <td className="py-3 px-4 text-gray-800">{user.phone}</td>
                <td className="py-3 px-4 text-gray-800">{user.paymentType}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

const handleDelete = async (id) => {
  try {
    await userService.deleteUser(id);
    alert('User deleted successfully');
    // Re-fetch the users list after deletion
    window.location.reload(); // or use setUsers() to remove user from the list
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export default Users;
