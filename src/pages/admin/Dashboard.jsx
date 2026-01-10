import React from "react";
import { FaUsers, FaClipboardList, FaComments } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-blue-500 text-white py-6 px-[5px] rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase">Total Users</p>
              <h2 className="text-3xl font-bold">120</h2>
            </div>
            <FaUsers size={40} className="opacity-80" />
          </div>
        </div>

        {/* Total Posts */}
        <div className="bg-green-500 text-white py-6 px-[5px] rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase">Total Posts</p>
              <h2 className="text-3xl font-bold">85</h2>
            </div>
            <FaClipboardList size={40} className="opacity-80" />
          </div>
        </div>

        {/* Total Comments */}
        <div className="bg-purple-500 text-white py-6 px-[5px] rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase">Total Comments</p>
              <h2 className="text-3xl font-bold">320</h2>
            </div>
            <FaComments size={40} className="opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
