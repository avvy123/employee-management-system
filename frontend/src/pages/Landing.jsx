import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="min-h-screen flex flex-col bg-white">

            {/* HERO */}
            <section className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">

                {/* Glow effect */}
                <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-10 left-10"></div>
                <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-10 right-10"></div>

                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Employee Management System
                </h1>

                <p className="max-w-2xl text-lg md:text-xl mb-10 text-white/90">
                    A modern platform to manage employees, streamline operations,
                    and boost productivity with real-time insights.
                </p>

                <div className="flex gap-4">
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:scale-105 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-indigo-600 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <h3 className="text-3xl font-bold text-indigo-600">500+</h3>
                        <p className="text-gray-500">Employees Managed</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-indigo-600">99.9%</h3>
                        <p className="text-gray-500">System Uptime</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-indigo-600">50+</h3>
                        <p className="text-gray-500">Organizations</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-indigo-600">24/7</h3>
                        <p className="text-gray-500">Support</p>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 px-6 bg-white text-black">
                <h2 className="text-4xl font-bold text-center mb-16">
                    Powerful Features
                </h2>

                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    <div className="p-8 bg-gray-50 rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-1">
                        <div className="text-indigo-600 text-3xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold mb-3">
                            Employee Management
                        </h3>
                        <p className="text-gray-600">
                            Easily add, edit, and manage employee records with a clean UI.
                        </p>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-1">
                        <div className="text-indigo-600 text-3xl mb-4">🔐</div>
                        <h3 className="text-xl font-semibold mb-3">
                            Role-Based Access
                        </h3>
                        <p className="text-gray-600">
                            Secure system with admin and user-level permissions.
                        </p>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-1">
                        <div className="text-indigo-600 text-3xl mb-4">⚡</div>
                        <h3 className="text-xl font-semibold mb-3">
                            Fast Search
                        </h3>
                        <p className="text-gray-600">
                            Instantly find employees using optimized search APIs.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h2 className="text-4xl font-bold mb-6">
                    Start Managing Your Team Today
                </h2>

                <p className="mb-8 text-white/90">
                    Join thousands of companies using our platform.
                </p>

                <Link
                    to="/signup"
                    className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:scale-105 transition"
                >
                    Create Account
                </Link>
            </section>

            {/* FOOTER */}
            <footer className="py-6 text-center text-gray-500 text-sm">
                © 2026 Employee Management System. All rights reserved.
            </footer>

        </div>
    );
}

export default Landing;