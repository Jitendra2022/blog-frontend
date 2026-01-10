import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaPlusCircle, FaUsers, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav>
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
            >
              <MdDashboard size={22} />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Add Post */}
          <li>
            <Link
              to="/dashboard/addpost"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
            >
              <FaPlusCircle size={20} />
              <span>Add Post</span>
            </Link>
          </li>

          {/* All Posts */}
          <li>
            <Link
              to="/dashboard/posts"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
            >
              <FaClipboardList size={20} />
              <span>All Posts</span>
            </Link>
          </li>

          {/* All Users */}
          <li>
            <Link
              to="/dashboard/users"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
            >
              <FaUsers size={20} />
              <span>All Users</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
