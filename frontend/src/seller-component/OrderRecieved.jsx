import React, { useState } from "react";
import axios from "axios";

const OrderRecieved = ({ order }) => {
  const { book, user, _id, statusMessage: initialMessage } = order;
  const [status, setStatus] = useState(order?.status);
  const [statusMessage, setStatusMessage] = useState(initialMessage || "");

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/update-status/${_id}`,
        { status, statusMessage },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Order status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 w-full max-w-2xl mx-auto border border-gray-200">
      <div className="flex items-center gap-4">
        {/* Book Image */}
        <img
          src={book.image || ""}
          alt={book.title}
          className="w-20 h-24 object-cover rounded-md border"
        />

        {/* Order Details */}
        <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
          <p className="font-semibold">{book.title}</p>
          <p className="text-gray-600">Author: {book.author}</p>
          <p className="text-gray-600">Buyer: {user.name}</p>
          <p className="text-gray-600">Qty: {book.quantity}</p>
        </div>
      </div>

      {/* Status Update Form */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-sm"
          disabled={status === "Cancelled"}
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="text"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
          placeholder="Enter status message..."
          disabled={status === "Cancelled"}  // Disable when status is "Cancelled"
          className={`p-2 border rounded bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition flex-1 text-sm 
            ${status === "Cancelled" ? "bg-gray-200 cursor-not-allowed text-gray-500" : ""}`}
        />

        <button
          onClick={handleUpdateStatus}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 text-sm"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default OrderRecieved;
