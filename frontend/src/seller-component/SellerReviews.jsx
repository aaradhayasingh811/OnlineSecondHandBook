import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "lucide-react";

const SellerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-review-seller`,
          { withCredentials: true }
        );

        if (response?.data?.reviews) {
          setReviews(response.data.reviews);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader className="animate-spin" size={32} />
          <span className="ml-3 text-gray-700">Loading Reviews...</span>

        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200 transition-transform transform hover:scale-105"
            >
              <div className="flex gap-3">
                <img
                  src={review.book.image || "https://via.placeholder.com/100"}
                  alt={review.book.title}
                  className="w-16 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {review.book.title}
                  </h3>
                  <p className="text-xs text-gray-600">by {review.book.author}</p>
                  <p className="text-blue-600 font-semibold mt-1 text-sm">
                    ${review.book.price}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500">
                  Buyer: <span className="font-semibold text-gray-800">{review.user.name}</span>
                </p>
                <p className="text-yellow-500 text-sm font-bold mt-1">
                  ⭐ {review.rating} / 5
                </p>
                <p className="mt-2 text-gray-700 text-xs italic">
                  "{review.description.length > 50
                    ? review.description.substring(0, 50) + "..."
                    : review.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-sm">No reviews available.</p>
      )}
    </div>
  );
};

export default SellerReviews;