import React, { useState, useEffect } from 'react';
import { recycleItemService } from '../../../services/WasteManagement/RecycleItemService';

const RecycleItem = ({ item, handleDelete, isAdmin, index }) => {
  const formatDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    const formattedDate = dateObj.toLocaleDateString(undefined, options);
    const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions);

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDateTime(item.dateTime);

  return (
    <tr key={item.id} className="border-t">
      <td className="py-3 px-4 text-gray-800">{index + 1}</td>
      {isAdmin && (
        <>
          <td className="py-3 px-4 text-gray-800">{item.user.name}</td>
          <td className="py-3 px-4 text-gray-800">{item.user.id}</td>

        </>
      )}
      <td className="py-3 px-4 text-gray-800">{item.wasteType}</td>
      <td className="py-3 px-4 text-gray-800">{item.totalQuantity}</td>
      <td className="py-3 px-4 text-gray-800">{formattedDate}</td>
      <td className="py-3 px-4 text-gray-800">{formattedTime}</td>

      <td className="py-3 px-4">
        <button
          onClick={() => handleDelete(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const RecycleItemsTable = ({ recycleItems, handleDelete, isAdmin }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="py-3 px-4 text-left">#</th>
          {isAdmin && (
            <>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left">User ID</th>

            </>
          )}
          <th className="py-3 px-4 text-left">Waste Type</th>
          <th className="py-3 px-4 text-left">Quantity</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-left">Time</th>

          <th className="py-3 px-4 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {recycleItems.map((item, index) => (
          <RecycleItem
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            isAdmin={isAdmin}
            index={index} // Pass the index to the RecycleItem component
          />
        ))}
      </tbody>
    </table>
  );
};

const RecycleItems = () => {
  const [recycleItems, setRecycleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedInUserId(user.id);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    const fetchRecycleItems = async () => {
      try {
        const itemList = await recycleItemService.getAllRecycleItems();

        if (userRole === 'ADMIN') {
          setRecycleItems(itemList);
        } else if (loggedInUserId) {
          const userRecycleItems = itemList.filter(item => item.user.id === loggedInUserId);
          setRecycleItems(userRecycleItems);
        }
      } catch (error) {
        setError('Failed to load recycle items');
      } finally {
        setLoading(false);
      }
    };

    fetchRecycleItems();
  }, [loggedInUserId, userRole]);

  const handleDelete = async (id) => {
    try {
      await recycleItemService.deleteRecycleItemById(id);
      alert('Recycle item deleted successfully');
      // Re-fetch the recycle items list after deletion
      setRecycleItems(recycleItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting recycle item:', error);
    }
  };

  if (loading) {
    return <div>Loading recycle items...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="m-4">
      <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Recycle Items List</h2>
        <div className="overflow-x-auto">
          <RecycleItemsTable
            recycleItems={recycleItems}
            handleDelete={handleDelete}
            isAdmin={userRole === 'ADMIN'}
          />
        </div>
      </div>
    </div>
  );
};

export default RecycleItems;
