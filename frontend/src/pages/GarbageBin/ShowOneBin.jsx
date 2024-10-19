import React from "react";
import bin_01 from "../../assets/images/bins/bin_01.png";
import bin_02 from "../../assets/images/bins/bin_02.png";
import bin_03 from "../../assets/images/bins/bin_03.png";

// Array of bin images for random selection
const binImages = [bin_01, bin_02, bin_03];

const ShowOneBin = ({ selectedBin, onClose }) => {
  if (!selectedBin) return null;

  const randomImage =
    binImages[Math.floor(Math.random() * binImages.length)];

  const getProgressBarColor = (garbageLevel) => {
    const green = 255 - (garbageLevel * 2.55);
    const red = garbageLevel * 2.55;
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
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
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Bin ID: {selectedBin.id}
          </h3>
          <p className="text-gray-700 text-center">
            Garbage Type: {selectedBin.garbageType}
          </p>
          <div className="mt-4">
            <div className="relative h-6 w-full bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full rounded-full"
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
  );
};

export default ShowOneBin;
