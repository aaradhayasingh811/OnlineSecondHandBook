import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
const Filter = ({ closeFilter ,setBestBooks }) => {
  const [sortOption, setSortOption] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [availability, setAvailability] = useState("inStock");
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    language: true,
    availability: true,
    tags: true,
  });

  const languages = ["English", "Hindi", "French", "Spanish", "German"];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const resetFilters = () => {
    setSortOption("");
    setSelectedLanguage("");
    setAvailability("inStock");
    setIncludeOutOfStock(false);
    setSearchTag("");
    fetchBooks();
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/filter-books`, {
        params: {
          sort: sortOption,
          language: selectedLanguage,
          availability: availability,
          tag: searchTag,
        },
        withCredentials: true 
      });
      console.log(response.data);
      setBestBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  


  return (
    <div className="p-6 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border border-gray-200 max-w-sm mx-auto">
      {/* Close Button */}
      {closeFilter && (
        <button
          onClick={closeFilter}
          className="text-gray-700 absolute top-4 right-4 text-2xl hover:text-red-500 transition"
        >
          <IoClose />
        </button>
      )}

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Filters</h2>

      {/* Sort By */}
      <div className="mb-5">
        <div
          className="flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
          onClick={() => toggleSection("sort")}
        >
          <h3 className="text-lg font-medium text-gray-700">Sort By</h3>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              expandedSections.sort ? "rotate-180" : ""
            }`}
          />
        </div>
        {expandedSections.sort && (
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full mt-3 border border-gray-300 p-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="bestseller">Best Sellers</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        )}
      </div>

      {/* Language Selection */}
      <div className="mb-5">
        <div
          className="flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
          onClick={() => toggleSection("language")}
        >
          <h3 className="text-lg font-medium text-gray-700">Language</h3>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              expandedSections.language ? "rotate-180" : ""
            }`}
          />
        </div>
        {expandedSections.language && (
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full mt-3 border border-gray-300 p-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="all">All Languages</option>
            {languages.map((lang, index) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Availability */}
      <div className="mb-5">
        <div
          className="flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
          onClick={() => toggleSection("availability")}
        >
          <h3 className="text-lg font-medium text-gray-700">Availability</h3>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              expandedSections.availability ? "rotate-180" : ""
            }`}
          />
        </div>
        {expandedSections.availability && (
          <div className="mt-3 space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value="inStock"
                checked={availability === "inStock"}
                onChange={() => setAvailability("inStock")}
                className="w-5 h-5 text-green-500 focus:ring-green-500"
              />
              <span className="text-gray-600">In Stock</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value="outStock"
                checked={availability === "outStock"}
                onChange={() => setAvailability("outStock")}
                className="w-5 h-5 text-green-500 focus:ring-green-500"
              />
              <span className="text-gray-600">Out of Stock</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeOutOfStock}
                onChange={() => setIncludeOutOfStock(!includeOutOfStock)}
                className="w-5 h-5 text-green-500 focus:ring-green-500"
              />
              <span className="text-gray-600">Include Out of Stock</span>
            </label>
          </div>
        )}
      </div>

      {/* Search by Tag */}
      <div className="mb-5">
        <div
          className="flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
          onClick={() => toggleSection("tags")}
        >
          <h3 className="text-lg font-medium text-gray-700">Search by Tag</h3>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              expandedSections.tags ? "rotate-180" : ""
            }`}
          />
        </div>
        {expandedSections.tags && (
          <input
            type="text"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            placeholder="Enter tag (e.g. fiction, bestseller)"
            className="w-full mt-3 border border-gray-300 p-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        )}
      </div>

      {/* Apply & Reset Buttons */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={resetFilters}
          className="w-1/2 bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-400 transition"
        >
          Reset
        </button>
        <button
        onClick={fetchBooks}
          className="w-1/2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
