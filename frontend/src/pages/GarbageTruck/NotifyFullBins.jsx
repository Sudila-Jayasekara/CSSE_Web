import React, { useEffect, useState } from 'react';
import { garbageBinTruckService } from '../../services/GarbageTruckService';

const NotifyFullBins = () => {
    const [fullBins, setFullBins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFullGarbageBins = async () => {
            try {
                const bins = await garbageBinTruckService.getAllFullGarbageBins();
                setFullBins(bins);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFullGarbageBins();
    }, []);

    const handleToggleCollect = async (binId) => {
        try {
            const updatedBin = await garbageBinTruckService.toggleCollectBin(binId);
            setFullBins((prevBins) =>
                prevBins.map((bin) => (bin.id === updatedBin.id ? updatedBin : bin))
            );
        } catch (error) {
            console.error('Error updating collect status:', error);
            setError('Failed to update collect status');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="m-4">
            <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Full Garbage Bins</h2>
                {fullBins.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">#</th>
                                    <th className="px-4 py-3 text-left">Garbage Bin ID</th>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Address</th>
                                    <th className="px-4 py-3 text-left">Garbage Level</th>
                                    <th className="px-4 py-3 text-left">Notification Time</th>
                                    <th className="px-4 py-3 text-left">Collect</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fullBins.map((bin, index) => (
                                    <tr key={bin.id} className="border-t border-gray-200">
                                        <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                                        <td className="py-3 px-4 text-gray-700">{bin.id}</td>
                                        <td className="py-3 px-4 text-gray-700">{bin.name}</td>
                                        <td className="py-3 px-4 text-gray-700">{bin.address}</td>
                                        <td className="py-3 px-4 text-gray-700">{bin.garbageLevel}%</td>
                                        <td className="py-3 px-4 text-gray-700">{new Date(bin.notificationTime).toLocaleString()}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleToggleCollect(bin.id)}
                                                className={`px-4 py-2 rounded ${
                                                    bin.isCollected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                                }`}
                                            >
                                                {bin.isCollected ? 'Collected' : 'Collect'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>No full garbage bins available.</div>
                )}
            </div>
        </div>
    );
};

export default NotifyFullBins;
