
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock, FaUnlock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Login Successful! Redirecting...");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const signInWithGoogle = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      const googleToken = response.credential;

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { googleToken },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Google Login Successful! Redirecting...");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Google authentication failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <section className="bg-gray-200 min-h-screen py-10 flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-full px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have an account, please login
            </p>
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
              >
                Log In
              </button>
            </form>
            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>
            <GoogleLogin
              onSuccess={signInWithGoogle}
              onError={() => toast.error("Google Sign-In Failed")}
            />
            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <Link
                to="/register"
                className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
