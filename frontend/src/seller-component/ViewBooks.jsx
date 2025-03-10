import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Pagination } from "@mui/material";
import BestSellerCard from "./BestSellerCard";
import {Loader} from "lucide-react"

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const booksPerPage = 8; // Control books per page

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-books/seller`,
          { withCredentials: true }
        );
        setBooks(response.data || []); // Ensure books array exists
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBookUpdate = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  // Calculate pagination details
  const totalPages = Math.ceil(books.length / booksPerPage);
  const paginatedBooks = books.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage
  );

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-50">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        All Books
      </h2>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center flex-grow">
          <Loader className="animate-spin" size={32} />
          <span className="ml-3 text-gray-700">Loading Books...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <p className="text-red-500 text-center font-semibold flex-grow">
          {error}
        </p>
      )}

      {/* No Books Available */}
      {!loading && !error && books.length === 0 && (
        <p className="text-gray-500 text-center flex-grow">
          No books available.
        </p>
      )}

      {/* Books Grid (Scrollable) */}
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {paginatedBooks.map((book) => (
            <BestSellerCard
              key={book._id}
              book={book}
              handleUpdate={handleBookUpdate}
            />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 p-2">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default ViewBooks;
