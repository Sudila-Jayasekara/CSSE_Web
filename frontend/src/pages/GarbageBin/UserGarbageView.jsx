import React, { useState, useEffect } from "react";
import { garbageBinService } from "../../services/GarbageBinManagement/GarbageBinServce";
import bin_01 from "../../assets/images/bins/bin_01.png";
import bin_02 from "../../assets/images/bins/bin_02.png";
import bin_03 from "../../assets/images/bins/bin_03.png";
import ShowOneBin from "./ShowOneBin";

// Array of bin images for random selection
const binImages = [bin_01, bin_02, bin_03];

const UserGarbageView = () => {
  const [garbageBins, setGarbageBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [selectedBin, setSelectedBin] = useState(null);
  const [randomImage, setRandomImage] = useState(""); // State for random image

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

  const getProgressBarColor = (garbageLevel) => {
    const green = 255 - garbageLevel * 2.55;
    const red = garbageLevel * 2.55;
    return `rgb(${red}, ${green}, 0)`;
  };

  const GarbageBinsGrid = ({ garbageBins }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {garbageBins.map((bin) => {
          return (
            <div
              key={bin.id}
              className="relative overflow-hidden"
              onClick={() => {
                const randomImage =
                  binImages[Math.floor(Math.random() * binImages.length)];
                setRandomImage(randomImage); // Set the random image when bin is clicked
                setSelectedBin(bin);
              }}
            >
              <img
                src={binImages[Math.floor(Math.random() * binImages.length)]}
                alt="Garbage Bin"
                className="w-full h-100 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-center">
                  Bin ID: {bin.id}
                </h3>
                <p className="text-gray-700">Garbage Type: {bin.garbageType}</p>
                <div className="mt-4">
                  <div className="relative h-6 w-full bg-gray-200 rounded-full">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${bin.garbageLevel}%`,
                        backgroundColor: getProgressBarColor(bin.garbageLevel),
                      }}
                    ></div>
                    <span className="absolute top-0 left-0 right-0 text-center text-sm font-semibold text-black">
                      {bin.garbageLevel === 0
                        ? "Empty"
                        : bin.garbageLevel === 100
                        ? "Full"
                        : `${bin.garbageLevel}%`}
                    </span>
                  </div>
                </div>
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
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Garbage Bin List
        </h2>
        <GarbageBinsGrid garbageBins={garbageBins} />
      </div>

      {/* Show the selected bin details */}
      {selectedBin && (
        <ShowOneBin
          selectedBin={selectedBin}
          randomImage={randomImage} // Pass the random image to ShowOneBin
          onClose={() => {
            setSelectedBin(null);
            setRandomImage(""); // Reset random image on close
          }} // Clear the selection to close the modal
        />
      )}
    </div>
  );
};

export default UserGarbageView;
