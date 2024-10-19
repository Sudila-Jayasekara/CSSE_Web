import React, { useState } from "react";
import { garbageBinService } from "../../services/GarbageBinManagement/GarbageBinServce";
import bin_01 from "../../assets/images/bins/bin_01.png";
import bin_02 from "../../assets/images/bins/bin_02.png";
import bin_03 from "../../assets/images/bins/bin_03.png";
import { FaPlus } from "react-icons/fa";

// Array of bin images for random selection
const binImages = [bin_01, bin_02, bin_03];

const ShowOneBin = ({ selectedBin, onClose, isAdmin }) => {
  const [trashAmount, setTrashAmount] = useState(0);
  const [garbageLevel, setGarbageLevel] = useState(selectedBin.garbageLevel);

  if (!selectedBin) return null;

  const randomImage = binImages[Math.floor(Math.random() * binImages.length)];

  const getProgressBarColor = (garbageLevel) => {
    const green = 255 - garbageLevel * 2.55;
    const red = garbageLevel * 2.55;
    return `rgb(${red}, ${green}, 0)`;
  };

  const handleAddTrash = () => {
    const newGarbageLevel = Math.min(garbageLevel + parseInt(trashAmount), 100);
    setGarbageLevel(newGarbageLevel);

    const updatedBin = { ...selectedBin, garbageLevel: newGarbageLevel };
    garbageBinService
      .updateGarbageBin(selectedBin.id, updatedBin)
      .then(() => {
        console.log("Garbage level updated successfully!");
      })
      .catch((err) => console.error("Failed to update garbage level", err));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="p-0 w-full max-w-md">
        <div className="relative">
          <img
            src={randomImage}
            alt="Garbage Bin"
            className="w-full h-100 object-cover rounded-t-lg"
          />
          {/* <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full focus:outline-none"
          >
            X
          </button> */}

          <div className="absolute inset-0 font-bold bg-opacity-50 flex flex-col justify-center items-center text-white p-4 -mt-40">
            <h3 className="text-3xl font-bold mb-2">Bin ID: {selectedBin.id}</h3>
            <p className="text-xl">Garbage Type: {selectedBin.garbageType}</p>
            <p className="text-xl">Bin Name: {selectedBin.name}</p>
            <p className="text-xl">Address: {selectedBin.address}</p>
            {isAdmin && (
              <>
                <p className="text-lg">User: {selectedBin.user.name}</p>
                <p className="text-lg">User ID: {selectedBin.user.id}</p>
              </>
            )}
            <div className="mt-4 w-full">
              <div className="relative h-6 w-1/2 bg-white rounded-full mx-auto mt-6">
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${garbageLevel}%`,
                    backgroundColor: getProgressBarColor(garbageLevel),
                  }}
                ></div>
                <span className="absolute top-0 left-0 right-0 text-center text-sm font-semibold text-black">
                  {garbageLevel === 0
                    ? "Empty"
                    : garbageLevel === 100
                    ? "Full"
                    : `${garbageLevel}%`}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-center items-center">
              <input
                type="number"
                value={trashAmount}
                onChange={(e) => setTrashAmount(e.target.value)}
                className="p-2 rounded-l-lg border border-gray-300 text-black w-1/4"
                placeholder="Add Trash (kg)"
              />
              <button
                onClick={handleAddTrash}
                className="bg-green-500 text-white p-2 rounded-r-lg flex items-center"
              >
                <FaPlus className="mr-1" />
              </button>
            </div>
            <button
              onClick={onClose}
              className=" top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full focus:outline-none mt-6"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOneBin;
