import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const Payment = () => {
  const location = useLocation();
  const { cartItems, totalPrice, selectedAddress } = location.state || {}; 
  const toOrder = async()=>{
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/create-order`,
            { books: cartItems.map(item => item.book._id) },
            { withCredentials: true }
          );
          
          console.log(response)
          alert("order is booked by your side")

        
    } catch (error) {
        console.log(error);
        alert("error")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>

      {/* Order Summary */}
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {cartItems?.length > 0 ? (
          <ul className="mt-2">
            {cartItems.map((item, index) => (
              <li key={index} className="border-b py-2">
                {item.book.title} - ${item.book.price} x {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}

        <h3 className="text-lg font-semibold mt-4">Total Price: ${totalPrice}</h3>

        {/* Address Details */}
        <h3 className="text-lg font-semibold mt-4">Shipping Address:</h3>
        {selectedAddress ? (
          <p>
            <strong>{selectedAddress.name}</strong>  
            <br /> {selectedAddress.address}, {selectedAddress.pincode}  
            <br /> Phone: {selectedAddress.phone}
          </p>
        ) : (
          <p className="text-red-500">No address selected.</p>
        )}
      </div>

      {/* Proceed Button */}
      <button onClick={toOrder} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;
