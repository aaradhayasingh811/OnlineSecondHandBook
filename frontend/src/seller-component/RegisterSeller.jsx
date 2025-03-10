import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock, FaUnlock, FaMale, FaFemale } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterSeller = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    title: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    const { name, email, password, mobile, gender, title } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!name || !email || !password || !mobile || !gender || !title) {
      return "All fields are required";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    if (!mobileRegex.test(mobile)) {
      return "Mobile number must be 10 digits";
    }
    if (password.length < 3) {
      return "Password must be at least 3 characters";
    }
    return "";
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }
    setError("");
    console.log(formData)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register-seller`,
        formData,
        // { withCredentials: true }
      );
      
      if (response.data.success) {
        setSuccess("Registration successful! Redirecting...");
        localStorage.setItem("user", JSON.stringify(response.data.seller));
        setSuccess("Registration successful!");
        console.log("User Registered: ", formData);
        navigate("/loginSeller");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div>
      <section className="bg-gray-200 min-h-screen py-10 flex items-center justify-center">
        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg max-w-3xl w-full">
          <h2 className="text-2xl font-bold text-[#002D74]">Register</h2>
          <p className="text-sm mt-4 text-[#002D74]">Create your seller account</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <input type="text" name="name" placeholder="Name" className="w-full input-style p-2 my-1" value={formData.name} onChange={handleChange} />
            <br />
            <input type="text" name="title" placeholder="Company Title" className="w-full p-2 my-1 input-style" value={formData.title} onChange={handleChange} />
            <br />

            <input type="text" name="mobile" placeholder="Mobile Number" className="w-full p-2 my-1 input-style" value={formData.mobile} onChange={handleChange} />
            <br />

            <input type="email" name="email" placeholder="Email Address" className="w-full p-2 my-1 input-style" value={formData.email} onChange={handleChange} />
            <br />

            <div className="relative">
              <input type="password" name="password" placeholder="Password" className="w-full p-2 my-1 input-style" value={formData.password}  onChange={handleChange} />
              <br />

              {/* <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="w-full p-2 my-1 absolute right-3 top-3 text-gray-600" onClick={togglePasswordVisibility}>
                {showPassword ? <FaUnlock /> : <FaLock />}
              </button> */}
            </div>
            <div className="flex gap-4 mt-3">
              <label className="flex items-center">
                <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
                <span className="ml-2 text-2xl"><FaMale /></span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
                <span className="ml-2 text-2xl"><FaFemale /></span>
              </label>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white font-semibold rounded-lg px-4 py-3 mt-6 hover:bg-blue-600">Sign Up</button>
          </form>
          <div className="mt-5 text-center text-gray-600">
            <p>Already have an account? <Link to="/loginSeller" className="text-blue-500">Login</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterSeller;