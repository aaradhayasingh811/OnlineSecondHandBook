import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Filter from "../components/Filter";
import { FaShoppingCart } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllBooks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [bestBooks, setBestBooks] = useState(location.state?.books || []);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!location.state?.books) {
      fetchBooks();
    }
  }, [location.state?.books]); 

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-books`,{
        withCredentials:true
      });
      setBestBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Add logic to fetch books for a specific page if implementing backend pagination
  };

  const BestSellerCard = ({ book }) => {
    const goToBook = async() =>{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${book._id}`,{
        withCredentials:true
      });
      
      console.log(response.data)
      navigate(`/book/${book._id}`, { state: { book: response.data.book } });
    }
    return (
      <button onClick={goToBook} className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 w-64 flex flex-col justify-between">
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

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{book.author}</p>
          <p className="text-xs text-gray-500">{book.edition} | {book.genre} | {book.language}</p>
          <p className="text-xs text-gray-500">Published: {book.publicationYear}</p>
          <p className="text-xs text-gray-500">Condition: {book.condition}</p>

          <p className="text-green-600 font-semibold text-lg mt-2">
            ${book.price.toFixed(2)}{" "}
            <span className="text-gray-500 line-through text-sm">
              ${book.originalPrice.toFixed(2)}
            </span>{" "}
            <span className="text-red-500 text-sm">
              ({Math.round(book.discount)}% off)
            </span>
          </p>
        </div>

        {/* <button className="w-full py-3 bg-[#1a5e2a] text-white rounded-b-lg text-sm font-medium hover:bg-[#145a2f] transition-colors duration-200 ease-in-out flex items-center justify-center">
          Add to Cart <FaShoppingCart className="ml-2" />
        </button> */}
      </button>
    );
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 px-6 py-8">
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity ${
            showFilter ? "opacity-100 visible" : "opacity-0 invisible"
          } md:hidden`}
          onClick={() => setShowFilter(false)}
        ></div>

        <div
          className={`absolute top-0 left-0 h-full w-2/3 bg-white shadow-lg transform ${
            showFilter ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-40 md:relative md:w-1/4 md:translate-x-0`}
        >
          <Filter setBestBooks={setBestBooks} />
        </div>

        <button
          className="md:hidden flex items-center gap-2 bg-[#1a5e2a] text-white px-4 py-2 rounded-lg shadow hover:bg-[#145a2f] transition-all w-fit"
          onClick={() => setShowFilter(true)}
        >
          <IoFilter size={20} />
          Filters
        </button>

        <div className="flex-1">
          {bestBooks.length === 0 ? (
            <p className="text-center text-gray-600">No books found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {bestBooks.map((book) => (
                <BestSellerCard book={book} key={book._id} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-5 flex justify-center">
        <Pagination count={10} variant="outlined" page={currentPage} onChange={handlePageChange} />
      </div>
    </>
  );
};

export default AllBooks;
