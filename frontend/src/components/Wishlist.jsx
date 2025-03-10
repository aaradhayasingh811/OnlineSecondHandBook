import React from "react";
import { Trash2 } from "lucide-react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { use } from "react";
const Wishlist = ({
  image,
  title,
  author,
  price,
  originalPrice,
  discount,
  isAvailable = true,
  onRemove ,
  book
}) => {
  const navigate = useNavigate();

  const goToBook = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${book._id}`,{
        withCredentials:true
      });
      if (!response.data || !response.data.book) {
        console.error("Book data is missing from API response");
        return;
      }
      navigate(`/book/${book._id}`, { state: { book: response.data.book } });
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    }
  };
  

  return (
    <div onClick={goToBook} className="w-full px-4 flex h-[15vh] items-center justify-between border-b rounded-md border-gray-300 bg-white">
      {/* Book Image + Unavailability Label */}
      <div className="relative w-20 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-20 h-28 object-cover rounded-md border border-gray-200"
        />
        {!isAvailable && (
          <p className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs font-semibold text-red-500 mt-1">
            Currently unavailable
          </p>
        )}
      </div>

      {/* Book Details */}
      <div className="flex-1 ml-8 text-left">
        {/* Title & Author */}
        <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-500">{author}</p>

        {/* Assured Badge (Optional) */}
        <div className="mt-1">
          <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded">
            Assured
          </span>
        </div>

        {/* Pricing Section */}
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-md font-bold text-gray-900">${price}</p>
          <p className="text-xs text-gray-500 line-through">${originalPrice}</p>
          <p className="text-xs text-green-600 font-medium">({discount.toFixed(2)}% off)</p>
        </div>
      </div>

      {/* Remove Icon */}
      <button
        onClick={onRemove}
        className="p-2 text-gray-500 hover:text-red-500 transition"
        aria-label="Remove from wishlist"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default Wishlist;
