import React, { useState, useEffect } from "react";
import { garbageBinService } from "../../services/GarbageBinManagement/GarbageBinServce";
import bin_01 from "../../assets/images/bins/bin_01.png";
import bin_02 from "../../assets/images/bins/bin_02.png";
import bin_03 from "../../assets/images/bins/bin_03.png";

// Array of bin images for random selection
const binImages = [bin_01, bin_02, bin_03];

const UserGarbageView = () => {
  const [garbageBins, setGarbageBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

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
        setError("Failed to load garbage bins");
      } finally {
        setLoading(false);
      }
    };

    fetchGarbageBins();
  }, [loggedInUserId, userRole]);

  const GarbageBinsGrid = ({ garbageBins, isAdmin }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {garbageBins.map((bin, index) => {
          const randomImage =
            binImages[Math.floor(Math.random() * binImages.length)];

          return (
            <div
              key={bin.id}
              className="relative   overflow-hidden"
            >
              <img
                src={randomImage}
                alt="Garbage Bin"
                className="w-full h-100 object-cover"
              />
              <div className="absolute inset-0  flex flex-col justify-center text-white p-4 text-center -mt-36">
                <p className="text-lg font-bold">Collect : {bin.id}</p>
                {isAdmin && (
                  <>
                    <p className="text-sm">User: {bin.user.name}</p>
                    <p className="text-sm">User ID: {bin.user.id}</p>
                  </>
                )}
                <p className="text-lg font-bold">Bin : {bin.name}</p>
                <p className="text-lg font-bold">{bin.garbageType}</p>
                <p className="text-lg font-bold">Level: {bin.garbageLevel} %</p>
                <p className="text-lg font-bold"> {bin.address}</p>
              </div>
            </div>
          );
        })}
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
        <GarbageBinsGrid
          garbageBins={garbageBins}
          isAdmin={userRole === "ADMIN"}
        />
      </div>
    </div>
  );
};

export default UserGarbageView;
