// import React, { useState, useEffect } from 'react';
// import { paymentService } from '../../services/paymentService';

// // Dropdown Filter Component
// const FilterDropdown = ({ paymentType, handleFilterChange }) => {
//   return (
//     <div className="flex justify-center mb-6">
//       <select
//         className="block w-1/4 px-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         value={paymentType}
//         onChange={handleFilterChange}
//       >
//         <option value="">All Payments</option>
//         <option value="payment">Payments</option>
//         <option value="collection">Collections</option>
//         <option value="reward">Rewards</option>
//       </select>
//     </div>
//   );
// };

// // Loading/Error Handling Component
// const LoadingError = ({ loading, error }) => {
//   return (
//     <div className="text-center text-lg">
//       {loading ? (
//         <div className="text-gray-500">Loading payments...</div>
//       ) : error ? (
//         <div className="text-red-500">Error: {error}</div>
//       ) : null}
//     </div>
//   );
// };

// // Table Component
// const PaymentTable = ({ payments }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
//         <thead className="bg-blue-600 text-white">
//           <tr>
//             <th className="py-3 px-4 text-left">ID</th>
//             <th className="py-3 px-4 text-left">Type</th>
//             <th className="py-3 px-4 text-left">Amount</th>
//             <th className="py-3 px-4 text-left">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map(payment => (
//             <tr key={payment.id} className="border-t border-gray-200">
//               <td className="py-3 px-4 text-gray-700">{payment.id}</td>
//               <td className="py-3 px-4 text-gray-700">{payment.type}</td>
//               <td className="py-3 px-4 text-gray-700">LKR {payment.amount.toFixed(2)}</td>
//               <td className="py-3 px-4 text-gray-700">{new Date(payment.dateTime).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Main PaymentPage Component
// const PaymentPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [filteredPayments, setFilteredPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [paymentType, setPaymentType] = useState(''); // Type: 'payment', 'collection', 'reward'

//   // Fetch all payments when the component is mounted
//   const fetchPayments = async () => {
//     try {
//       const response = await paymentService.getAllPayments();
//       console.log(response);
//       setPayments(response);
//       setFilteredPayments(response); // Initially, show all payments
//     } catch (error) {
//       setError('Failed to load payments.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   // Function to filter payments based on the selected payment type
//   const handleFilterChange = (e) => {
//     const selectedType = e.target.value;
//     setPaymentType(selectedType);

//     if (selectedType === '') {
//       setFilteredPayments(payments); // Show all payments if no filter is applied
//     } else {
//       // Filter payments based on the type selected
//       const filtered = payments.filter(payment => payment.type === selectedType);
//       setFilteredPayments(filtered);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="w-full bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Payment History</h2>

//         {/* Filter Dropdown */}
//         <FilterDropdown paymentType={paymentType} handleFilterChange={handleFilterChange} />

//         {/* Loading/Error Handling */}
//         <LoadingError loading={loading} error={error} />

//         {/* Payment Table */}
//         {!loading && !error && <PaymentTable payments={filteredPayments} />}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;


import React, { useState, useEffect } from 'react';
import { paymentService } from '../../services/paymentService';

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [type, settype] = useState(''); // Type: 'payment', 'collection', 'reward'

  // Fetch all payments when the component is mounted
  const fetchPayments = async () => {
    try {
      const response = await paymentService.getAllPayments();
      setPayments(response);
      setFilteredPayments(response); // Initially, show all payments
    } catch (error) {
      setError('Failed to load payments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Function to filter payments based on the selected payment type
  const handleFilterChange = (e) => {
    const selectedType = e.target.value;
    settype(selectedType);

    if (selectedType === '') {
      setFilteredPayments(payments); // Show all payments if no filter is applied
    } else {
      const filtered = payments.filter(payment => payment.type === selectedType);
      setFilteredPayments(filtered);
    }
  };

  // Dropdown Filter Component
  const FilterDropdown = () => (
    <div className="flex justify-center mb-6">
      <select
        className="block w-1/4 px-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={type}
        onChange={handleFilterChange}
      >
        <option value="">All Payments</option>
        <option value="payment">Payments</option>
        <option value="collection">Collections</option>
        <option value="reward">Rewards</option>
      </select>
    </div>
  );

  // Loading/Error Handling Component
  const LoadingError = () => (
    <div className="text-center text-lg">
      {loading ? (
        <div className="text-gray-500">Loading payments...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : null}
    </div>
  );

  // Function to format and display date and time separately
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
  };

  // Payment Table Component
  const PaymentTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Type</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Date</th>
            {/* <th className="py-3 px-4 text-left">Time</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(payment => {
            const { formattedDate, formattedTime } = formatDateTime(payment.dateTime);
            return (
              <tr key={payment.id} className="border-t border-gray-200">
                <td className="py-3 px-4 text-gray-700">{payment.id}</td>
                <td className="py-3 px-4 text-gray-700">{payment.type}</td>
                <td className="py-3 px-4 text-gray-700">LKR {payment.amount.toFixed(2)}</td>
                <td className="py-3 px-4 text-gray-700">{formattedDate}</td>
                {/* <td className="py-3 px-4 text-gray-700">{formattedTime}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Payment History</h2>

        {/* Filter Dropdown */}
        <FilterDropdown />

        {/* Loading/Error Handling */}
        <LoadingError />

        {/* Payment Table */}
        {!loading && !error && <PaymentTable />}
      </div>
    </div>
  );
};

export default PaymentPage;
