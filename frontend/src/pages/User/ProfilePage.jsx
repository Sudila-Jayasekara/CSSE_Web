import React from 'react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Top row with 4 boxes */}
        <div className="bg-white h-24 rounded-lg shadow-md p-4">Box 1</div>
        <div className="bg-white h-24 rounded-lg shadow-md p-4">Box 2</div>
        <div className="bg-white h-24 rounded-lg shadow-md p-4">Box 3</div>
        <div className="bg-white h-24 rounded-lg shadow-md p-4">Box 4</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Large box on the left side */}
        <div className="md:col-span-2 bg-white h-64 rounded-lg shadow-md p-4">
          Large Box (e.g., Charts, Statistics)
        </div>

        {/* Two stacked boxes on the right side */}
        <div className="flex flex-col space-y-4">
          <div className="bg-white h-32 rounded-lg shadow-md p-4">Small Box 1</div>
          <div className="bg-white h-32 rounded-lg shadow-md p-4">Small Box 2</div>
        </div>
      </div>

      {/* Full-width section at the bottom */}
      <div className="mt-4">
        <div className="bg-white h-40 rounded-lg shadow-md p-4">
          Full-width Box (e.g., Recent Activity)
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
