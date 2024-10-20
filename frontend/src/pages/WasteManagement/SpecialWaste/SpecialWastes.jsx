import React, { useState, useEffect } from 'react';
import { specialWasteService } from '../../../services/WasteManagement/SpecialWasteService';
import { paymentService } from '../../../services/paymentService';
import PaymentModal from '../PaymentModel';
import { jsPDF } from 'jspdf';


const SpecialWasteItem = ({ item, handleDelete, handlePaymentClick, userRole }) => {
  const [cost, setCost] = useState(null); // State to hold the payment amount
  const [loadingCost, setLoadingCost] = useState(true); // State for loading indicator

  const formatDateTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    const formattedDate = dateObj.toLocaleDateString(undefined, options);
    const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions);

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDateTime(item.dateTime);

  // Fetch the cost when the component mounts
  useEffect(() => {
    const fetchCost = async (id) => {
      try {
        const payment = await paymentService.getPaymentBySpecialWasteId(id);
        if (payment) {
          setCost(payment.amount); // Assuming the payment object has an 'amount' property
        } else {
          setCost(null); // No payment found
        }
      } catch (error) {
        console.error('Error fetching payment:', error);
      } finally {
        setLoadingCost(false);
      }
    };

    fetchCost(item.id); // Fetch cost using item ID
  }, [item.id]);

  return (
    <tr key={item.id} className="border-t">
      <td className="py-3 px-4 text-gray-800">{item.id}</td>
      <td className="py-3 px-4 text-gray-800">{item.wasteType}</td>
      <td className="py-3 px-4 text-gray-800">{item.description}</td>
      <td className="py-3 px-4 text-gray-800">{formattedDate}</td>
      <td className="py-3 px-4 text-gray-800">{formattedTime}</td>
      <td className="py-3 px-4 text-gray-800">
        {loadingCost ? (
          'Loading...' // Loading indicator
        ) : (
          cost !== null ? (
            cost // Display payment amount if found
          ) : (
            'No payment found' // Display message if no payment exists
          )
        )}
      </td>
      <td className="py-3 px-4">
        {userRole === 'USER' && cost === null && (
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

const WasteTable = ({ specialWastes, handleDelete, handlePaymentClick, userRole }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-3 px-4 text-left">ID</th>
          <th className="py-3 px-4 text-left">Waste Type</th>
          <th className="py-3 px-4 text-left">Description</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-left">Time</th>
          <th className="py-3 px-4 text-left">Cost</th>
          <th className="py-3 px-4 text-left">Actions</th>  {/*don't want display if cost is not null */}
        </tr>
      </thead>
      <tbody>
        {specialWastes.map((item) => (
          <SpecialWasteItem
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            handlePaymentClick={handlePaymentClick}
            userRole={userRole}  // Pass userRole to SpecialWasteItem
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

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Special Waste Report', 70, 10);

    // Add column headers for waste data
    doc.setFontSize(12);
    doc.text('ID', 10, 20);
    doc.text('Waste Type', 40, 20);
    doc.text('Description', 80, 20);
    doc.text('Cost', 150, 20);

    // Add rows of waste data
    specialWastes.forEach((waste, index) => {
      const rowY = 30 + (index * 10); // Set dynamic Y position for each row
      doc.text(waste.id.toString(), 10, rowY);
      doc.text(waste.wasteType, 40, rowY);
      doc.text(waste.description, 80, rowY);
      doc.text(waste.cost ? waste.cost.toString() : 'No payment', 150, rowY);
    });

    // Save the PDF
    doc.save('special_waste_report.pdf');
  };

  return (
    <div className="m-4">
      <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Special Wastes List</h2>
        <button
          onClick={handleGenerateReport}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Generate Report
        </button>
        <div className="overflow-x-auto">
          <WasteTable
            specialWastes={specialWastes}
            handleDelete={handleDelete}
            handlePaymentClick={handlePaymentClick}
            userRole={userRole}  // Pass userRole to WasteTable
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
