import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    FaHome,
    FaImages,
    FaComments,
    FaMedkit,
    FaClipboardList,
    FaBlog,
    FaTags,
    FaBell,
    FaUsers,
    FaSignOutAlt,
} from "react-icons/fa";
import Cookies from "js-cookie";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const jwt = Cookies.get("jwt");

    const logoutHandler = () => {
        Cookies.remove("jwt");
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="h-full fixed">
            <aside
                id="separator-sidebar"
                className="flex flex-col justify-between top-0 left-0 z-15 w-64 h-full bg-gray-50 dark:bg-gray-800"
                aria-label="Sidebar"
            >
                {/* Logo Section */}
                <div className="flex flex-col items-center py-4">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-20 h-20"
                    />
                    <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">DP MEMORIAL</h2>
                </div>

                {/* Navigation Links */}
                <div className="flex-grow px-3 py-4 overflow-y-auto">
                    <ul className="space-y-4 font-medium flex flex-col justify-center">
                        {[
                            { to: "/", label: "Home", icon: FaHome },
                            { to: "/Gallary", label: "Gallery", icon: FaImages },
                            { to: "/Comments", label: "Comments", icon: FaComments },
                            { to: "/Feedback", label: "Feedback", icon: FaClipboardList },
                            { to: "/medicines", label: "Medicine", icon: FaMedkit },
                            { to: "/Appointment", label: "Appointments", icon: FaClipboardList },
                            { to: "/blogs", label: "Blogs", icon: FaBlog },
                            { to: "/Categories", label: "Categories", icon: FaTags },
                            { to: "/notifications", label: "Notifications", icon: FaBell },
                            { to: "/users", label: "Users", icon: FaUsers },
                        ].map(({ to, label, icon: Icon }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    className={`flex items-center p-2 rounded-lg ${isActive(to)
                                        ? "bg-indigo-600 text-white"
                                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="ms-3">{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logout Button */}
                <div className="p-4">
                    <button
                        onClick={logoutHandler}
                        className="flex items-center w-full p-2 text-red-600 bg-gray-200 rounded-lg dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                        <span className="ms-3">Logout</span>
                    </button>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
