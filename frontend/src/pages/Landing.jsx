import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="min-h-screen flex flex-col">

            {/* HERO */}
            <section className="flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

                <h1 className="text-5xl font-bold mb-6">
                    Employee Management System
                </h1>

                <p className="max-w-xl text-lg mb-8">
                    Manage your employees, track records, and organize your workforce
                    with a powerful modern dashboard.
                </p>

                <div className="flex gap-4">
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="px-6 py-3 border border-white rounded-lg"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 px-6 bg-gray-50 text-black">

                <h2 className="text-3xl font-bold text-center mb-12">
                    Features
                </h2>

                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    <div className="p-6 bg-white rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-3">
                            Manage Employees
                        </h3>
                        <p>
                            Add, edit and remove employees with a powerful admin interface.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-3">
                            Role Based Access
                        </h3>
                        <p>
                            Admins control employees while users get restricted access.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-3">
                            Fast Search
                        </h3>
                        <p>
                            Instantly search employees using optimized API queries.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">

                <h2 className="text-3xl font-bold mb-6">
                    Start Managing Your Team Today
                </h2>

                <Link
                    to="/signup"
                    className="px-8 py-4 bg-indigo-600 text-white rounded-lg"
                >
                    Create Account
                </Link>

            </section>

        </div>
    );
}

export default Landing;