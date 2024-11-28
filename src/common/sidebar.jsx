import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaImages, FaComments, FaMedkit, FaClipboardList, FaBlog, FaTags, FaBell, FaUsers, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie"
const Sidebar = () => {
    const jwt = Cookies.get("jwt");

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
                        src="/logo.png" // Replace with your logo URL
                        alt="Logo"
                        className="w-20 h-20"
                    />
                    <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">DP MEMORIAL</h2>
                </div>

                {/* Navigation Links */}
                <div className="flex-grow px-3 py-4 overflow-y-auto">
                    <ul className="space-y-4 font-medium flex flex-col justify-center">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaHome className="w-5 h-5" />
                                <span className="ms-3">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Gallary"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaImages className="w-5 h-5" />
                                <span className="ms-3">Gallery</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Comments"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaComments className="w-5 h-5" />
                                <span className="ms-3">Comments</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Feedback"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaClipboardList className="w-5 h-5" />
                                <span className="ms-3">Feedback</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/medicines"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaMedkit className="w-5 h-5" />
                                <span className="ms-3">Medicine</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/appointment"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaClipboardList className="w-5 h-5" />
                                <span className="ms-3">Appointments</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/blogs"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaBlog className="w-5 h-5" />
                                <span className="ms-3">Blogs</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Categories"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaTags className="w-5 h-5" />
                                <span className="ms-3">Categories</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/notifications"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaBell className="w-5 h-5" />
                                <span className="ms-3">Notifications</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <FaUsers className="w-5 h-5" />
                                <span className="ms-3">Users</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Logout Button */}
                <div className="p-4">
                    <button
                        onClick={() => Cookies.remove("jwt")}
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
