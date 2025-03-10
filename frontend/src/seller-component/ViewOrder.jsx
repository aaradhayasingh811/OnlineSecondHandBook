import React, { useState, useEffect } from "react";
import OrderRecieved from "./OrderRecieved";
import axios from "axios";
import { Loader } from "lucide-react";
const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-orders-seller`,{
            withCredentials:true
          }
        );

        if (!response || !response.data) {
          console.warn("Received null or undefined response from API");
          setOrders([]);
          return;
        }
        
        console.log(response.data.orders)
        setOrders(response.data.orders);
        console.log(orders.length)
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders. Please try again later.");
        setOrders([]);
      } finally {
        setLoading(false); // Stop loading when request completes
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader className="animate-spin" size={32} />
          <span className="ml-3 text-gray-700">Loading Orders...</span>

        </div>
      ) : orders.length > 0 ? (
        orders.map((order) => <OrderRecieved key={order._id} order={order} />)
    ) : (
        <p className="text-center text-gray-600">No orders available.</p>
      )}
    </div>
  );
};

export default ViewOrder;
