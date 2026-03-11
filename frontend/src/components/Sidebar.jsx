import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar({ isOpen, setIsOpen }) {
    const location = useLocation();
    const { logout, user } = useAuth();

    const isActive = (path) => location.pathname === path;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex md:hidden">

            {/* Overlay */}
            <div
                className="flex-1 bg-black/40"
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div className="w-64 bg-[var(--bg-nav)] text-white h-full p-6 flex flex-col gap-6 shadow-lg">

                <button
                    className="self-end text-xl"
                    onClick={() => setIsOpen(false)}
                >
                    ✕
                </button>

                <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded ${isActive("/") ? "bg-white/10" : ""}`}
                >
                    Dashboard
                </Link>

                <Link
                    to="/employees"
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded ${isActive("/employees") ? "bg-white/10" : ""}`}
                >
                    Employees
                </Link>

                {user.role === "Admin" && (
                    <Link
                        to="/employees/add"
                        onClick={() => setIsOpen(false)}
                        className={`p-2 rounded ${isActive("/employees/add") ? "bg-white/10" : ""}`}
                    >
                        Add Employee
                    </Link>
                )}

                <div className="border-t border-white/20 pt-4">
                    <p className="text-gray-300 mb-2">
                        Hi, {user?.username}
                    </p>

                    <button
                        onClick={logout}
                        className="text-white"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;