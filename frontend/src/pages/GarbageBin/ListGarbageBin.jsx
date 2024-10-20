import React, { useState, useEffect } from "react";
import { garbageBinService } from "../../services/GarbageBinManagement/GarbageBinServce";

const ListGarbageBin = () => {
  const [garbageBins, setGarbageBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGarbageBin, setSelectedGarbageBin] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUserId(user.id);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    const fetchGarbageBins = async () => {
      try {
        const binList = await garbageBinService.getAllGarbageBins();

        if (userRole === "ADMIN") {
          setGarbageBins(binList);
        } else if (loggedInUserId) {
          const userGarbageBins = binList.filter(
            (bin) => bin.user.id === loggedInUserId
          );
          setGarbageBins(userGarbageBins);
        }
      } catch (error) {
        setError("Failed to load Garbage bins");
      } finally {
        setLoading(false);
      }
    };

    fetchGarbageBins();
  }, [loggedInUserId, userRole]);

  const handleDelete = async (id) => {
    try {
      await garbageBinService.deleteGarbageBinById(id);
      alert("Recycle bin deleted successfully");
      setGarbageBins(garbageBins.filter((bin) => bin.id !== id));
    } catch (error) {
      console.error("Error deleting recycle bin:", error);
    }
  };

  const handleEdit = (bin) => {
    setSelectedGarbageBin(bin);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await garbageBinService.updateGarbageBin(
        selectedGarbageBin.id,
        selectedGarbageBin
      );
      alert("Recycle bin updated successfully");
      setIsEditModalOpen(false);
      // Refresh the list after editing
      const updatedList = await garbageBinService.getAllGarbageBins();
      setGarbageBins(updatedList);
    } catch (error) {
      console.error("Error updating recycle bin:", error);
      alert("Error updating recycle bin.");
    }
  };

  const handleChange = (e) => {
    setSelectedGarbageBin({
      ...selectedGarbageBin,
      [e.target.name]: e.target.value,
    });
  };

  const GarbageBinsTable = ({ garbageBins, handleDelete, handleEdit, isAdmin }) => {
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
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Garbage Type</th>
              <th className="px-4 py-3 text-left">Garbage Level</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {garbageBins.map((bin, index) => (
              <tr key={bin.id} className="border-t border-gray-200">
                <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                {isAdmin && (
                  <>
                    <td className="py-3 px-4 text-gray-700">{bin.user.name}</td>
                    <td className="py-3 px-4 text-gray-700">{bin.user.id}</td>
                  </>
                )}
                <td className="py-3 px-4 text-gray-700">{bin.name}</td>
                <td className="py-3 px-4 text-gray-700">{bin.garbageType}</td>
                <td className="py-3 px-4 text-gray-700">{bin.garbageLevel}</td>
                <td className="py-3 px-4 text-gray-700">{bin.address}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEdit(bin)}
                    className="text-green-500 hover:text-green-700 px-3 py-1 rounded-md bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(bin.id)}
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

  if (loading) {
    return <div>Loading garbage bins...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="m-4">
      <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Garbage Bin List</h2>
        <GarbageBinsTable
          garbageBins={garbageBins}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isAdmin={userRole === 'ADMIN'}
        />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedGarbageBin && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Garbage Bin</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedGarbageBin.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Garbage Type</label>
                <input
                  type="text"
                  name="garbageType"
                  value={selectedGarbageBin.garbageType}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Garbage Level</label>
                <input
                  type="number"
                  name="garbageLevel"
                  value={selectedGarbageBin.garbageLevel}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={selectedGarbageBin.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListGarbageBin;
