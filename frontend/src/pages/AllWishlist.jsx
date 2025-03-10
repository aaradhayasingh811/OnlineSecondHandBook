import React, { useEffect, useState } from "react";
import Wishlist from "../components/Wishlist";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const AllWishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null); // Track the book being removed

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-wishlist`, {
          withCredentials: true,
        });
        setWishlistData(response.data.wishlist || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
      setLoading(false);
    };

    fetchWishlist();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (title) => {
    alert(`${title} added to cart!`);
  };

  // Handle Remove from Wishlist
  const handleRemove = async (bookId) => {
    setRemovingId(bookId); // Show loader on the specific book being removed
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/delete-from-wishlist/${bookId}`, {
        withCredentials: true,
      });
      setWishlistData(wishlistData.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error removing book:", error);
    }
    setRemovingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full flex flex-col gap-2">
        {loading ? (
          <div className="flex justify-center w-full py-10">
            <CircularProgress size={50} />
          </div>
        ) : wishlistData.length > 0 ? (
          wishlistData.map((book) => (
            <Wishlist
              key={book._id}
              book={book}
              image={book.image || ""}
              title={book.title}
              author={book.author}
              price={book.price}
              originalPrice={book.originalPrice}
              discount={book.discount}
              onAddToCart={() => handleAddToCart(book.title)}
              onRemove={() => handleRemove(book._id)}
              isRemoving={removingId === book._id} 
            />
          ))
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default AllWishlist;
