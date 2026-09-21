import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { 
  FaPlusCircle, 
  FaUsers, 
  FaClipboardList, 
  FaArrowLeft, 
  FaShieldAlt 
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Overview",
      path: "/dashboard",
      icon: MdDashboard,
      exact: true,
    },
    {
      title: "Write Article",
      path: "/dashboard/addpost",
      icon: FaPlusCircle,
    },
    {
      title: "All Publications",
      path: "/dashboard/allposts",
      icon: FaClipboardList,
    },
    {
      title: "User Directory",
      path: "/dashboard/users",
      icon: FaUsers,
    },
  ];

  return (
    <aside className="w-64 h-full min-h-[calc(100vh-80px)] bg-slate-950/90 border-r border-slate-800/80 p-5 flex flex-col justify-between">
      <div>
        {/* Admin Header */}
        <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <FaShieldAlt size={16} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Admin Console</h2>
            <p className="text-[11px] text-indigo-400 font-medium">Management Hub</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
            Workspace
          </p>
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition duration-200 cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Return to Main Site */}
      <div className="pt-6 border-t border-slate-800">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition border border-slate-800/80"
        >
          <FaArrowLeft size={11} className="text-indigo-400" />
          <span>Return to Public Site</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
