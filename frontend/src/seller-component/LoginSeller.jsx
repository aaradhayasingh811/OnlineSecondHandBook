
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUnlock } from "react-icons/fa";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const LoginSeller = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login-seller`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log("Login Successful:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.seller));
        navigate("/seller/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
    setLoading(false);
  };

  // ✅ Handle Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login-seller`,
        { googleToken },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Google Login Successful:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.seller));
        navigate("/seller/dashboard");
      }
    } catch (error) {
      console.error("Google Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Google Login failed. Please try again.");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-[#eaedef]">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-3xl flex flex-col md:flex-row items-center">
          {/* Welcome Section */}
          <div className="md:w-1/2 w-full text-center p-5">
            <h2 className="text-3xl font-bold text-[#002D74]">Welcome, Seller!</h2>
            <p className="text-gray-600 mt-2">Log in to manage your books.</p>
            <img
              src="https://img.freepik.com/free-vector/books-online-library-isometric-3d-flat-concept-internet-knowledge-web-online-study-technology-computer-screen_1284-41289.jpg"
              alt="Welcome Seller"
              className="mt-4 rounded-lg"
            />
          </div>

          {/* Login Form Section */}
          <div className="md:w-1/2 w-full p-5">
            <h2 className="text-2xl font-bold text-[#002D74] text-center">Login</h2>
            <form className="mt-6" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-4 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaUnlock /> : <FaLock />}
                </button>
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            {/* Google Login Button */}
            <div className="mt-5 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert("Google Login Failed. Try again.")}
              />
            </div>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>Don't have an account?</p>
              <Link
                to="/registerSeller"
                className="py-2 px-5 bg-blue-500 text-white rounded-xl hover:scale-110 duration-300"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginSeller;
