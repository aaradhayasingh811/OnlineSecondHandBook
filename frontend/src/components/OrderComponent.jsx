import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, X } from "lucide-react";

const ReviewPopup = ({ onClose, onSubmit, initialReview, bookId }) => {
  const [rating, setRating] = useState(initialReview?.rating || 0);
  const [title, setTitle] = useState(initialReview?.title || "");
  const [description, setDescription] = useState(
    initialReview?.description || ""
  );

  const handleSubmit = async () => {
    const review = { rating, title, description };
    try {
      if (initialReview) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/edit-review/${bookId}`,
          review,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/add-review/${bookId}`,
          review,
          { withCredentials: true }
        );
      }
      onSubmit(review);
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">
          {initialReview ? "Edit Review" : "Rate & Review"}
        </h2>
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              className={`cursor-pointer ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your review..."
          className="w-full p-2 border rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {initialReview ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

const OrderComponent = ({
  image,
  title,
  authors,
  price,
  deliveryDate,
  statusMessage,
  bookId,
  orderId,
  status,
}) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState(null);
  
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-review/${bookId}`,
          {
            withCredentials: true,
          }
        );
        
        
        if (
          Array.isArray(response.data.reviews) &&
          response.data.reviews.length > 0 &&
          status != "Cancelled"
        ) {
          setReview(response.data.reviews[0]); // Assuming one review per user
        } else {
          setReview(null);
          setIsCancelled(true);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    console.log(status)
        if(status === "Cancelled"){
          setIsCancelled(true)
        }
    fetchReview();
  }, [bookId]);

  const handleCancelOrder = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/cancel-order/${orderId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setIsCancelled(true);
    }
    setReview(null);
  };
  const handleReviewSubmit = (newReview) => {
    setReview(newReview);
  };

  return (
    <div className="w-full max-w-2xl p-4 flex flex-col sm:flex-row items-center border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300">
      <div className="w-32 h-40 sm:w-28 sm:h-36 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg border border-gray-300"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{authors}</p>
        <p className="text-lg font-semibold text-gray-900 mt-2">${price}</p>
        <p className="text-xs text-gray-500">{statusMessage}</p>

        {review && (
          <p className="mt-2 text-sm text-gray-700">
            {`"${review.description.slice(0, 50)}..."`} - Rated {review.rating}
            ⭐
          </p>
        )}

        <div className="flex flex-col sm:flex-col gap-2 mt-4">
          <button
            className={`flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all 
    ${
      isCancelled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
            onClick={() => setShowReview(true)}
            disabled={isCancelled}
          >
            <Star size={16} className="text-yellow-400" />
            {review ? "Edit Review" : "Rate & Review Product"}
          </button>

          <button
            onClick={handleCancelOrder}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-all"
          >
            {isCancelled ? "Cancelled" : "Cancel Order"}
          </button>
        </div>
      </div>
      {showReview && (
        <ReviewPopup
          onClose={() => setShowReview(false)}
          onSubmit={handleReviewSubmit}
          initialReview={review}
          bookId={bookId}
        />
      )}
    </div>
  );
};

export default OrderComponent;
