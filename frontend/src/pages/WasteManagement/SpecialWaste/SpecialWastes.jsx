import React, { useState, useEffect } from 'react';
import { specialWasteService } from '../../../services/WasteManagement/SpecialWasteService';
import { paymentService } from '../../../services/paymentService';
import PaymentModal from '../PaymentModel';

const SpecialWasteItem = ({ item, handleDelete, handlePaymentClick }) => {
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
      <td className="py-3 px-4 text-gray-800">{item.id}</td>
      <td className="py-3 px-4 text-gray-800">{item.wasteType}</td>
      <td className="py-3 px-4 text-gray-800">{item.description}</td>
      <td className="py-3 px-4 text-gray-800">{formattedDate}</td>
      <td className="py-3 px-4 text-gray-800">{formattedTime}</td>
      <td className="py-3 px-4 text-gray-800">{item.user?.name || 'N/A'}</td>
      <td className="py-3 px-4">
        <button
          onClick={() => handlePaymentClick(item)}
          className="text-green-500 hover:text-green-700 mr-2"
        >
          Payment
        </button>
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

const WasteTable = ({ specialWastes, handleDelete, handlePaymentClick }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-3 px-4 text-left">ID</th>
          <th className="py-3 px-4 text-left">Waste Type</th>
          <th className="py-3 px-4 text-left">Description</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-left">Time</th>
          <th className="py-3 px-4 text-left">User</th>
          <th className="py-3 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {specialWastes.map((item) => (
          <SpecialWasteItem
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            handlePaymentClick={handlePaymentClick}
          />
        ))}
      </tbody>
    </table>
  );
};

const SpecialWastes = () => {
  const [specialWastes, setSpecialWastes] = useState([]);
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
    const fetchSpecialWastes = async () => {
      try {
        const wasteList = await specialWasteService.getAllSpecialWastes();
        console.log('Special wastes:', wasteList);
        if (userRole === 'ADMIN') {
          setSpecialWastes(wasteList);
        } else if (loggedInUserId) {
          const filteredWasteList = wasteList.filter(item => item.user.id === loggedInUserId);
          setSpecialWastes(filteredWasteList);
        }
      } catch (error) {
        setError('Failed to load special wastes');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialWastes();
  }, [loggedInUserId, userRole]);

  const handleDelete = async (id) => {
    try {
      await specialWasteService.deleteSpecialWasteById(id);
      alert('Special waste item deleted successfully');
      setSpecialWastes(specialWastes.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting special waste item:', error);
    }
  };

  const handlePaymentClick = (specialWaste) => {
    setSelectedSpecialWaste(specialWaste);
    setIsPaymentModalOpen(true);
  };

  const handlePayment = async (specialWaste, amount, dateTime) => {
    try {
      const paymentData = {
        amount: amount,
        dateTime: dateTime,
        specialWaste: {
          id: specialWaste.id,
          user: { id: specialWaste.user.id }
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
        <h2 className="text-2xl font-semibold mb-6 text-center">Special Wastes List</h2>
        <div className="overflow-x-auto">
          <WasteTable
            specialWastes={specialWastes}
            handleDelete={handleDelete}
            handlePaymentClick={handlePaymentClick}
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

export default SpecialWastes;
