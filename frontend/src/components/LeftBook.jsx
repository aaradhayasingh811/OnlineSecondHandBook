import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LeftBook = () => {
    const location = useLocation();
  const book = location.state?.book || {};
  console.log(book)
  const { id: bookId } = useParams(); 
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async () => {
    try {
      console.log("Book ID:", bookId);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-to-cart/${bookId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setCartItems(response.data.cartItems || []); // Store updated cart
        toast.success("Book added to cart successfully!");
        
        console.log("Response:", response.data);
      } else {
        toast.error("Failed to add book to cart.")
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to cart.")

    }
  };

  
  const bookNow = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${bookId}`, {
        withCredentials: true
      });
  
      const bookArray = [response.data]; 
      console.log(bookArray);
  
      navigate('/checkout', { 
        state: { 
          cartItems: bookArray.map((item, index) => ({
            ...item, 
            quantity: 1 
          } 
          )),
                } 
      });
  
    } catch (error) {
      console.error("Error in booking the item:", error);
      toast.error("Failed to fetch book details.")
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img
        src={ book.image || "https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg"}
        alt="Book Cover"
        className="h-[60vh] w-[80%] max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-lg transition-transform transform hover:scale-105"
      />
      <div className="mt-6 flex gap-4">
        <button
          onClick={addToCart}
          className="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Add to Cart
        </button>
        <button
          onClick={bookNow}
          className="px-6 py-2 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default LeftBook;
