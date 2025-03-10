import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "/logo.png";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/isLoggedIn`, { withCredentials: true });
        setIsLoggedIn(response.data.success);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/search?query=${searchQuery}`,{
        withCredentials: true
      });
      setBooks(response.data);
      navigate("/all-books", { state: { books: response.data } });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-20 py-3">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-28 md:w-36" />
        </Link>

        {/* Search Bar - Visible on Medium Screens & Above */}
        <div className="hidden md:flex w-full max-w-lg mx-4">
          <form onSubmit={handleSearch} className="relative flex items-center w-full">
            <input
              type="search"
              className="w-full bg-gray-100 text-gray-800 py-2 pl-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900">
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-2xl md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose /> : <CiMenuKebab />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <Link to="/user-dashboard" className="flex items-center hover:text-green-800 transition-all">
              <FaUserCircle className="mr-2 hidden sm:block" />
              <span>Profile</span>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center hover:text-green-800 transition-all">
              <TbLogin2 className="mr-2 hidden sm:block" />
              <span>Login</span>
            </Link>
          )}

          <Link to="/cart" className="flex items-center hover:text-green-800 transition-all">
            <FaShoppingCart className="mr-2 hidden sm:block" />
            <span>Cart</span>
          </Link>

          <Link to="/loginSeller" className="flex items-center hover:text-green-800 transition-all">
            <IoStorefront className="mr-2 hidden sm:block" />
            <span>Become a Seller</span>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <form onSubmit={handleSearch} className="px-4 py-2">
            <div className="relative flex items-center">
              <input
                type="search"
                className="w-full bg-gray-100 text-gray-800 py-2 pl-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900">
                <FaSearch />
              </button>
            </div>
          </form>

          <div className="flex flex-col items-start px-4 pb-4 space-y-3">
            {isLoggedIn ? (
              <Link to="/user-dashboard" className="flex items-center hover:text-green-800 transition-all">
                <FaUserCircle className="mr-2" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center hover:text-green-800 transition-all">
                <TbLogin2 className="mr-2" />
                <span>Login</span>
              </Link>
            )}

            <Link to="/cart" className="flex items-center hover:text-green-800 transition-all">
              <FaShoppingCart className="mr-2" />
              <span>Cart</span>
            </Link>

            <Link to="/loginSeller" className="flex items-center hover:text-green-800 transition-all">
              <IoStorefront className="mr-2" />
              <span>Become a Seller</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
