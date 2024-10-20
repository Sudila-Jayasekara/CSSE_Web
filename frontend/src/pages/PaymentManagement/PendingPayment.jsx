// import React, { useState, useEffect } from 'react';
// import { paymentService } from '../../services/paymentService';

// const PendingPayment = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [loggedInUserId, setLoggedInUserId] = useState(null);

//   // Fetch all payments when the component is mounted
//   const fetchPayments = async () => {
//     try {
//       const response = await paymentService.getAllPayments();
//       console.log(response);
//       const filtered = response.filter(
//         payment => payment.type === 'payment' && payment.user.id === loggedInUserId
//       );
//       setPayments(filtered);
//     } catch (error) {
//       setError('Failed to load payments.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     //console.log(user);
//     if (user) {
//       setLoggedInUserId(user.id);
//     }
//     fetchPayments();
//   }, [loggedInUserId]);

//   // Loading/Error Handling Component
//   const LoadingError = () => (
//     <div className="text-center text-lg">
//       {loading ? (
//         <div className="text-gray-500">Loading payments...</div>
//       ) : error ? (
//         <div className="text-red-500">Error: {error}</div>
//       ) : null}
//     </div>
//   );

//   // Function to format and display date and time separately
//   const formatDateTime = (dateTime) => {
//     const date = new Date(dateTime);
//     const formattedDate = date.toLocaleDateString();
//     const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     return { formattedDate, formattedTime };
//   };

//   // Payment Table Component
//   const PaymentTable = () => (
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
//           {payments.map(payment => {
//             const { formattedDate, formattedTime } = formatDateTime(payment.dateTime);
//             return (
//               <tr key={payment.id} className="border-t border-gray-200">
//                 <td className="py-3 px-4 text-gray-700">{payment.id}</td>
//                 <td className="py-3 px-4 text-gray-700">{payment.type}</td>
//                 <td className="py-3 px-4 text-gray-700">LKR {payment.amount.toFixed(2)}</td>
//                 <td className="py-3 px-4 text-gray-700">{formattedDate}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <div className="w-full bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Pending Payment</h2>

//         {/* Loading/Error Handling */}
//         <LoadingError />

//         {/* Payment Table */}
//         {!loading && !error && <PaymentTable />}
//       </div>
//     </div>
//   );
// };

// export default PendingPayment;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { garbageBinService } from '../../services/garbageBinService'

const PendingPayment = () => {
    const [payments, setPayments] = useState([]);
    const [garbageBins, setGarbageBins] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [currentMonthPayments, setCurrentMonthPayments] = useState([]); // State for current month payments
    const [paymentType, setPaymentType] = useState('');
    const navigate = useNavigate();

    // Fetch all payments when the component is mounted
    const fetchPayments = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setLoggedInUserId(user.id);
                setPaymentType(user.paymentType); // Fetch user's payment type
            }

            const response = await paymentService.getAllPayments();
            const filtered = response.filter(
                payment => payment.type === 'payment' && payment.user.id === loggedInUserId
            );
            setPayments(filtered);

            // Filter for current month payments
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            const monthPayments = filtered.filter(payment => {
                const paymentDate = new Date(payment.dateTime);
                return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
            });
            setCurrentMonthPayments(monthPayments);

            if (user.paymentType === 'weight_based') {
                const garbageBinResponse = await garbageBinService.getAllGarbageBins();
                const userGarbageBins = garbageBinResponse.filter(bin => bin.user.id === user.id);
                setGarbageBins(userGarbageBins);
            }

        } catch (error) {
            setError('Failed to load payments.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            console.log(user);
            setLoggedInUserId(user.id);
        }
        fetchPayments();
    }, [loggedInUserId]);

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


    // Payment Table Component
    const FlatPaymentTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Type</th>
                        <th className="py-3 px-4 text-left">Amount</th>
                        <th className="py-3 px-4 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => {
                        const { formattedDate } = formatDateTime(payment.dateTime);
                        return (
                            <tr key={payment.id} className="border-t border-gray-200">
                                <td className="py-3 px-4 text-gray-700">{payment.id}</td>
                                <td className="py-3 px-4 text-gray-700">{payment.type}</td>
                                <td className="py-3 px-4 text-gray-700">LKR {payment.amount.toFixed(2)}</td>
                                <td className="py-3 px-4 text-gray-700">{formattedDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    const WeightBasedTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Garbage Type</th>
                        <th className="py-3 px-4 text-left">Weight (kg)</th>
                        <th className="py-3 px-4 text-left">Amount (LKR)</th>
                        <th className="py-3 px-4 text-left">Pay Now</th>
                    </tr>
                </thead>
                <tbody>
                    {garbageBins.map(bin => {
                        const weight = (bin.garbageLevel / 100) * 100; // Assume max capacity is 60kg
                        const amount = weight * 70; // 70 LKR per kg
                        return (
                            <tr key={bin.id} className="border-t border-gray-200">
                                <td className="py-3 px-4 text-gray-700">{bin.id}</td>
                                <td className="py-3 px-4 text-gray-700">{bin.garbageType}</td>
                                <td className="py-3 px-4 text-gray-700">{weight.toFixed(2)}</td>
                                <td className="py-3 px-4 text-gray-700">LKR {amount.toFixed(2)}</td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleWeightBasedPayment(bin.id, amount)}
                                        className="py-1 px-3 rounded bg-green-600 text-white hover:bg-green-700"
                                    >
                                        Pay Now
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    // Function to handle weight-based payment
    const handleWeightBasedPayment = (garbageBinId, amount) => {
        // Navigate to the PaymentForm with the calculated weight-based amount
        navigate('/payment-form', { state: { garbageBinId, amount } });
    };

    // Function to format and display date and time separately
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString();
        return { formattedDate };
    };

    const handleFlatPaymentClick = () => {
        // Navigate to the PaymentForm if there are payments for the current month
        if (currentMonthPayments.length === 0) {
            const flatAmount = 500; // This is the fixed amount to pass
            navigate('/payment-form', { state: { amount: flatAmount } });
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Pending Payment</h2>
    
                {/* Conditional rendering based on payment type */}
                {paymentType === 'flat' && (
                    <>
                        <div className="mb-6 text-center">
                            <button
                                onClick={handleFlatPaymentClick}
                                className={`py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 ${currentMonthPayments.length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={currentMonthPayments.length > 0}
                            >
                                {currentMonthPayments.length > 0 ? 'Already Paid' : 'Proceed to Payment'} 
                            </button>
                        </div>
                        <FlatPaymentTable />
                    </>
                )}

                {paymentType === 'weight_based' && <WeightBasedTable />}

                {/* Loading/Error Handling */}
                <LoadingError />
            </div>
        </div>
    );
};

export default PendingPayment;
