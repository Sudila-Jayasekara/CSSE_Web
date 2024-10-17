import React, { useState, useEffect } from 'react';
import { recycleItemService } from '../../../services/WasteManagement/RecycleItemService'; // Adjust the import path as needed

const RecycleItems = () => {
  const [recycleItems, setRecycleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all recycle items when the component is mounted
    const fetchRecycleItems = async () => {
      try {
        const itemList = await recycleItemService.getAllRecycleItems();
        console.log(itemList);
        setRecycleItems(itemList);
      } catch (error) {
        setError('Failed to load recycle items');
      } finally {
        setLoading(false);
      }
    };

    fetchRecycleItems();
  }, []);

  if (loading) {
    return <div>Loading recycle items...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className='m-4'>
      <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Recycle Items List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Waste Type</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {recycleItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-3 px-4 text-gray-800">{item.id}</td>
                  <td className="py-3 px-4 text-gray-800">{item.wasteType}</td>
                  <td className="py-3 px-4 text-gray-800">{item.totalQuantity}</td>
                  <td className="py-3 px-4 text-gray-800">{item.dateTime}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(item.id)}
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
    await recycleItemService.deleteRecycleItemById(id);
    alert('Recycle item deleted successfully');
    // Re-fetch the recycle items list after deletion
    window.location.reload(); // or use setRecycleItems() to remove item from the list
  } catch (error) {
    console.error('Error deleting recycle item:', error);
  }
};

export default RecycleItems;
