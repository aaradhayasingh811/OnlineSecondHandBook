import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShoppingCart = () => {
  const [quantities, setQuantities] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          withCredentials: true,
        });

        const cartData = response.data.cart?.[0]?.items || [];
        setCartItems(cartData);
        setQuantities(cartData.map((item) => item.quantity || 1));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // not working --> corrected now working
  const updateQuantity = async (index, type, bookId) => {
    const newQuantities = [...quantities];
    const prevQuantities = [...quantities]; // Save previous state
  
    if (type === "increase") newQuantities[index]++;
    else if (type === "decrease" && newQuantities[index] > 1) newQuantities[index]--;
  
    setQuantities(newQuantities);
  
    try {
      console.log(newQuantities[index])
      await axios.put(
        `${import.meta.env.VITE_API_URL}/cart-update/${bookId}`,
        { quantity: newQuantities[index] },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity.");
      setQuantities(prevQuantities); // Rollback on error
    }
  };
  
  const removeItem = async (index, bookId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/remove-from-cart/${bookId}`, {
        withCredentials: true,
      });

      setCartItems((prev) => prev.filter((_, i) => i !== index));
      setQuantities((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item.");
    }
  };

  const toCheckout = () => {
    console.log(cartItems)
    navigate("/checkout", {
      state: {
        cartItems: cartItems.map((item, index) => ({
          ...item,
          quantity: quantities[index], 
        })),
      },
    });
  };

  const goToBook = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`,{
        withCredentials: true
      });
      if (!response.data || !response.data.book) {
        console.error("Book data is missing from API response");
        return;
      }
      navigate(`/book/${id}`, { state: { book: response.data.book } });
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 min-h-[90vh]">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => {
            const book = item.book || {};
            return (
              <div  key={index} className="w-full flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50 border rounded-md shadow-sm">
                <img src={book.image} alt={book.title || "Book Image"} className="w-20 h-24 rounded-md me-4" />

                <div className="flex-1 text-center sm:text-left sm:my-0 my-4">
                  <h3 className="font-semibold text-lg text-gray-800 hover:cursor-pointer" onClick={()=>goToBook(book._id)} >{book.title || "Unknown Title"}</h3>
                  <p className="text-gray-600 text-sm">{book.author || "Unknown Author"}</p>
                  
                  <p className="text-green-600 font-semibold text-lg">
                    ₹{book.price?.toFixed(2)} 
                    <span className="text-gray-500 line-through text-sm"> ₹{book.originalPrice?.toFixed(2)}</span>
                  </p>
                </div>

                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex items-center gap-2 my-1 sm:my-0">
                    <button onClick={() => updateQuantity(index, "decrease", book._id)} className="p-2 border rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                      <AiOutlineMinus />
                    </button>
                    <span className="px-4 py-2 border rounded-md bg-white text-gray-700">
                      {quantities[index]}
                    </span>
                    <button onClick={() => updateQuantity(index, "increase", book._id)} className="p-2 border rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                      <AiOutlinePlus />
                    </button>
                  </div>

                  <button onClick={() => removeItem(index, book._id)} className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg shadow hover:bg-red-600 transition-all my-1 sm:my-0">
                    <FaTrash />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartItems.length > 0 && (
        <button onClick={toCheckout} className="w-full mt-8 bg-green-600 text-white py-3 font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">
          Place Order
        </button>
      )}
    </div>
  );
};

export default ShoppingCart;
