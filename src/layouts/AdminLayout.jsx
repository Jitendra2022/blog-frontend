import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Container */}
        <div className="hidden md:block w-64 shrink-0">
          <Sidebar />
        </div>

        {/* Admin Content Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
