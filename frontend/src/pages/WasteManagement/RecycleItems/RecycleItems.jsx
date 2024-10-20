import React, { useState, useEffect } from 'react';
import { recycleItemService } from '../../../services/WasteManagement/RecycleItemService';
import { paymentService } from '../../../services/paymentService';
import PaymentModal from '../PaymentModel';

const SpecialWasteItem = ({ item, handleDelete, handlePaymentClick, userRole }) => {
  const [cost, setCost] = useState(null);
  const [loadingCost, setLoadingCost] = useState(true);

  const formatDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    const formattedDate = dateObj.toLocaleDateString(undefined, options);
    const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions);

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDateTime(item.dateTime);

  useEffect(() => {
    const fetchCost = async (id) => {
      try {
        const payment = await paymentService.getPaymentByRecycleItemId(id);
        setCost(payment ? payment.amount : null);
      } catch (error) {
        console.error('Error fetching payment:', error);
      } finally {
        setLoadingCost(false);
      }
    };

    fetchCost(item.id);
  }, [item.id]);

  return (
    <tr key={item.id} className="border-t">
      <td className="py-3 px-4 text-gray-800">{item.id}</td>
      <td className="py-3 px-4 text-gray-800">{item.wasteType}</td>
      <td className="py-3 px-4 text-gray-800">{item.totalQuantity}</td>
      <td className="py-3 px-4 text-gray-800">{formattedDate}</td>
      <td className="py-3 px-4 text-gray-800">{formattedTime}</td>
      <td className="py-3 px-4 text-gray-800">
        {loadingCost ? (
          'Loading...'
        ) : (
          cost !== null ? cost : 'No payment found'
        )}
      </td>
      <td className="py-3 px-4">
        {userRole === 'ADMIN' && cost === null && (
          <button
            onClick={() => handlePaymentClick(item)}
            className="text-green-500 hover:text-green-700 mr-2"
          >
            Payment
          </button>
        )}
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

const WasteTable = ({ recycleItems, handleDelete, handlePaymentClick, userRole }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-3 px-4 text-left">ID</th>
          <th className="py-3 px-4 text-left">Waste Type</th>
          <th className="py-3 px-4 text-left">Quantity</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-left">Time</th>
          <th className="py-3 px-4 text-left">Reward</th>
          <th className="py-3 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {recycleItems.map((item) => (
          <SpecialWasteItem
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            handlePaymentClick={handlePaymentClick}
            userRole={userRole}
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedSpecialWaste, setSelectedSpecialWaste] = useState(null);

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
        const wasteList = await recycleItemService.getAllRecycleItems(); // Correct service call
        console.log('Special wastes:', wasteList);
        if (userRole === 'ADMIN') {
          setRecycleItems(wasteList);
        } else if (loggedInUserId) {
          const filteredWasteList = wasteList.filter(item => item.user.id === loggedInUserId);
          setRecycleItems(filteredWasteList);
        }
      } catch (error) {
        setError('Failed to load special wastes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecycleItems();
  }, [loggedInUserId, userRole]);

  const handleDelete = async (id) => {
    try {
      await recycleItemService.deleteRecycleItemById(id);
      alert('Special waste item deleted successfully');
      setRecycleItems(recycleItems.filter((item) => item.id !== id)); // Fixed state update
    } catch (error) {
      console.error('Error deleting special waste item:', error);
    }
  };

  const handlePaymentClick = (recycleItem) => {
    setSelectedSpecialWaste(recycleItem);
    setIsPaymentModalOpen(true);
  };

  const handlePayment = async (recycleItem, amount, dateTime) => {
    try {
      const paymentData = {
        amount: amount,
        dateTime: dateTime,
        recycleItem: {
          id: recycleItem.id,
          user: { id: recycleItem.user.id }
        }
      };

      console.log('Payment data:', paymentData);
      await paymentService.savePayment(paymentData);
      alert('Payment saved successfully!');
      setIsPaymentModalOpen(false);
    } catch (error) {
      console.error('Error making payment:', error);
      alert('Error saving payment.');
    }
  };

  if (loading) {
    return <div>Loading special wastes...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="m-4">
      <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Recycle Item List</h2>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Generate Report
        </button>
        <div className="overflow-x-auto">
          <WasteTable
            recycleItems={recycleItems} // Fixed variable name
            handleDelete={handleDelete}
            handlePaymentClick={handlePaymentClick}
            userRole={userRole}
          />
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        item={selectedSpecialWaste} 
        handlePayment={handlePayment} 
      />
    </div>
  );
};

export default RecycleItems;
