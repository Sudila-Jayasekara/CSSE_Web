import React from "react";
import bin_01 from "../../assets/images/bins/bin_01.png";
import bin_02 from "../../assets/images/bins/bin_02.png";
import bin_03 from "../../assets/images/bins/bin_03.png";

// Array of bin images for random selection
const binImages = [bin_01, bin_02, bin_03];

const ShowOneBin = ({ selectedBin, onClose, isAdmin }) => {
  if (!selectedBin) return null;

  // Randomly select an image for the bin
  const randomImage = binImages[Math.floor(Math.random() * binImages.length)];

  // Function to determine the color of the progress bar based on garbage level
  const getProgressBarColor = (garbageLevel) => {
    const green = 255 - garbageLevel * 2.55;
    const red = garbageLevel * 2.55;
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="p-0 w-full max-w-md">
        <div className="relative">
          <img
            src={randomImage}
            alt="Garbage Bin"
            className="w-full h-100 object-cover rounded-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
          >
            X
          </button>
          <div className="absolute inset-0 font-bold bg-opacity-50 flex flex-col justify-center items-center text-white p-4 -mt-40">
            <h3 className="text-3xl font-bold mb-2">Bin ID: {selectedBin.id}</h3>
            <p className="text-xl ">Garbage Type: {selectedBin.garbageType}</p>
            <p className="text-xl ">Bin Name: {selectedBin.name}</p>
            <p className="text-xl ">Address: {selectedBin.address}</p>
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
                    width: `${selectedBin.garbageLevel}%`,
                    backgroundColor: getProgressBarColor(selectedBin.garbageLevel),
                  }}
                ></div>
                <span className="absolute top-0 left-0 right-0 text-center text-sm font-semibold text-black">
                  {selectedBin.garbageLevel === 0
                    ? "Empty"
                    : selectedBin.garbageLevel === 100
                    ? "Full"
                    : `${selectedBin.garbageLevel}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOneBin;
