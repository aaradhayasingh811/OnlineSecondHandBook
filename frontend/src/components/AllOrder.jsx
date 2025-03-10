import React, { useEffect, useState } from "react";
import OrderComponent from "./OrderComponent";
import axios from "axios";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-orders`, { withCredentials: true });
        setOrders(response.data.orders);
        // console.log(orders)
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6">All Orders</h1>

      {loading ? (
        <p className="text-center text-lg">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-red-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="flex justify-center">
              <OrderComponent 
                image={order.book?.image || "default-image.jpg"}  
                title={order.book?.title || "Unknown Book"} 
                authors={order.book?.author || "Unknown Author"} 
                price={order.book?.price || "N/A"} 
                deliveryDate={order.deliveryDate || "Processing"} 
                statusMessage={order.statusMessage || "Pending"} 
                bookId={order.book._id}
                orderId = {order._id}
                status = {order.status}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrder;
