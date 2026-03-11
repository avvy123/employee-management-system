import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

function Navbar() {
    const location = useLocation();
    const { logout, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navItem = (path) =>
        `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition
        ${isActive(path)
            ? "text-indigo-600 bg-indigo-100"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`;

    return (
        <>
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 backdrop-blur bg-[var(--bg-nav)] border-b">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex items-center h-16">

                        {/* LEFT - BRAND */}
                        <div className="flex-1">
                            <button
                                onClick={logout}
                                className="flex items-center gap-3 font-bold text-xl"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    </svg>
                                </div>

                                EMS
                            </button>
                        </div>

                        {/* CENTER - NAV LINKS */}
                        <div className="hidden md:flex justify-center gap-2">
                            <Link to="/dashboard" className={navItem("/dashboard")}>
                                Dashboard
                            </Link>

                            <Link to="/employees" className={navItem("/employees")}>
                                Employees
                            </Link>

                            {user?.role === "Admin" && (
                                <Link
                                    to="/employees/add"
                                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                >
                                    Add Employee
                                </Link>
                            )}
                        </div>

                        {/* RIGHT - USER */}
                        <div className="hidden md:flex flex-1 justify-end items-center gap-4">

                            <span className="text-white text-sm">
                                Hi, {user?.username}
                            </span>

                            <button
                                onClick={logout}
                                className="px-3 py-2 text-sm text-white hover:text-red-600"
                            >
                                Logout
                            </button>

                        </div>

                        {/* MOBILE HAMBURGER */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="md:hidden text-2xl ml-auto"
                        >
                            ☰
                        </button>

                    </div>
                </div>
            </nav>

            {/* MOBILE SIDEBAR */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}

export default Navbar;