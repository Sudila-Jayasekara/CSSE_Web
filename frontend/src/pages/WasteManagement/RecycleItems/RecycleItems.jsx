import React, { useState, useEffect } from 'react';
import { recycleItemService } from '../../../services/WasteManagement/RecycleItemService';
import { paymentService } from '../../../services/paymentService';
import PaymentModal from '../PaymentModel';

const RecycleItems = () => {
  const [recycleItems, setRecycleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedRecycleItem, setSelectedRecycleItem] = useState(null);

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
        console.log('Recycle items:', itemList);
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

  const RecycleItemsTable = ({ recycleItems, handleDelete, handlePaymentClick, isAdmin }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              {isAdmin && (
                <>
                  <th className="px-4 py-3 text-left">User Name</th>
                  <th className="px-4 py-3 text-left">User ID</th>
                </>
              )}
              <th className="px-4 py-3 text-left">Waste Type</th>
              <th className="px-4 py-3 text-left">Total Quantity</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              {/* <th className="px-4 py-3 text-left">Reward</th> */}
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recycleItems.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                {isAdmin && (
                  <>
                    <td className="py-3 px-4 text-gray-700">{item.user.name}</td>
                    <td className="py-3 px-4 text-gray-700">{item.user.id}</td>
                  </>
                )}
                <td className="py-3 px-4 text-gray-700">{item.wasteType}</td>
                <td className="py-3 px-4 text-gray-700">{item.totalQuantity}</td>
                <td className="py-3 px-4 text-gray-700">{new Date(item.dateTime).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-gray-700">{new Date(item.dateTime).toLocaleTimeString()}</td>
                {/* <td className="py-3 px-4 text-gray-700">{item.amount}</td> */}
                <td className="py-3 px-4">
                  <button
                    onClick={() => handlePaymentClick(item)}
                    className="text-green-500 hover:text-green-700 px-3 py-1 rounded-md bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Payment
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2 px-3 py-1 rounded-md bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  
  const handleDelete = async (id) => {
    try {
      await recycleItemService.deleteRecycleItemById(id);
      alert('Recycle item deleted successfully');
      setRecycleItems(recycleItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting recycle item:', error);
    }
  };

  const handlePaymentClick = (recycleItem) => {
    setSelectedRecycleItem(recycleItem);
    setIsPaymentModalOpen(true);
  };
 
  const handlePayment = async (recycleItem, amount, dateTime) => {
    try {
        const paymentData = {
            amount: amount,
            dateTime: dateTime,
            recycleItem:{
                id: recycleItem.id,
                user:{
                    id: recycleItem.user.id
                }
            }
        };

        console.log('Payment data:', paymentData);

        await paymentService.savePayment(paymentData);

        alert('Payment saved successfully!');
    } catch (error) {
        console.error('Error making payment:', error);
        alert('Error saving payment.');
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
            handlePaymentClick={handlePaymentClick}
            isAdmin={userRole === 'ADMIN'}
          />
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        item={selectedRecycleItem} 
        handlePayment={handlePayment} 
      />
    </div>
  );
};

export default RecycleItems;
