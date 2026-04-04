import { useState } from "react";
import { UserIcon, PasswordIcon } from "../common/Icon";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [forgotData, setForgotData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, password, confirmPassword } = forgotData;

    setError("");
    setSuccess("");

    if (!userName || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await authService.resetPassword({
        username: userName,
        password: password,
      });

      setSuccess("Password updated successfully ✅");

      setForgotData({
        userName: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User does not exist");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="relative z-10 w-full max-w-md sm:p-8 mx-4 sm:mx-auto">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 text-black">Reset Password</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center">{success}</p>
            )}
            <div className="relative">
              <UserIcon customClassName="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
              <input
                type="text"
                placeholder="Username"
                className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                value={forgotData.userName}
                onChange={(e) =>
                  setForgotData({ ...forgotData, userName: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <PasswordIcon customClassName="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
              <input
                type="password"
                placeholder="New Password"
                className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                value={forgotData.password}
                onChange={(e) =>
                  setForgotData({ ...forgotData, password: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <PasswordIcon customClassName="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                value={forgotData.confirmPassword}
                onChange={(e) =>
                  setForgotData({
                    ...forgotData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
