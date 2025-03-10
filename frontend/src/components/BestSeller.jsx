import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const BestSeller = ({ books }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (books.length > 0) {
      setLoading(false);
    }
  }, [books]);

  const BestSellerCard = ({ book }) => {
    const [bookLoading, setBookLoading] = useState(false);
    const navigate = useNavigate();

    const goToBook = async () => {
      setBookLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${book._id}`,
          {
            withCredentials: true,
          }
        );
        if (!response.data || !response.data.book) {
          console.error("Book data is missing from API response");
          return;
        }
        navigate(`/book/${book._id}`, { state: { book: response.data.book } });
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      }
      setBookLoading(false);
    };

    return (
      <button
        onClick={goToBook}
        className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 w-64 flex flex-col justify-between"
      >
        {/* Book Cover */}
        <div
          className="relative p-4 rounded-t-lg"
          style={{
            background: "linear-gradient(to bottom, #C19A6B 80%, #967969 20%)",
          }}
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>

        {/* Book Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{book.author}</p>
          <p className="text-xs text-gray-500">
            {book.edition} | {book.genre} | {book.language}
          </p>
          <p className="text-xs text-gray-500">
            Published: {book.publicationYear}
          </p>
          <p className="text-xs text-gray-500">Condition: {book.condition}</p>

          {/* Pricing */}
          <p className="text-green-600 font-semibold text-lg mt-2">
            ₹{book.price.toFixed(2)}{" "}
            <span className="text-gray-500 line-through text-sm">
              ₹{book.originalPrice.toFixed(2)}
            </span>{" "}
            <span className="text-red-500 text-sm">
              ({Math.round(book.discount)}% off)
            </span>
          </p>
        </div>

        {/* Loader while fetching book details */}
        {bookLoading && (
          <div className="flex justify-center py-2">
            <CircularProgress size={24} />
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-10 py-8">
      <div className="flex justify-between">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#1a5e2a] mb-12">
          Best Sellers
        </h2>
        <Link
          to="/all-books"
          className="text-center text-lg font-bold text-blue-600 mb-12 hover:text-blue-900"
        >
          See more...
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {books.map((book) => (
            <BestSellerCard book={book} key={book._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
