import React, { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import axios from "axios"

const RightBook = () => {
  const [review , setReview] = useState([])
  const location = useLocation();
  const book = location.state?.book || {};

  const [isFavorite, setIsFavorite] = useState(false);
  console.log(book)
  const discountPercentage = book.originalPrice
    ? ((book.originalPrice - book.price) / book.originalPrice) * 100
    : 0;


    useEffect(() => {
      const checkWishlistStatus = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/is-in-wishlist/${book._id}`, {
            withCredentials: true,
          });
          const res  = await axios.get(`${import.meta.env.VITE_API_URL}/get-review/${book._id}`, {
            withCredentials: true,
          });
          setReview(res.data.review)
          console.log("review",review)

          
         
          setIsFavorite(response.data.isInWishlist);
        } catch (error) {
          console.error("Error checking wishlist:", error);
        }
      };
  
      if (book._id) checkWishlistStatus();
    }, [book._id]);
  
    
    const toggleWishlist = async () => {
      try {
        if (isFavorite) {
          await axios.delete(`${import.meta.env.VITE_API_URL}/delete-from-wishlist/${book._id}`, {
            withCredentials: true,
          });
          setIsFavorite(false);
        } else {
          await axios.post(`${import.meta.env.VITE_API_URL}/add-to-wishlist/${book._id}`, {}, { withCredentials: true });
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error updating wishlist:", error);
      }
    };
    

  return (
    <div className="p-6 md:p-8 bg-white shadow-lg rounded-xl max-w-3xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {book.title || "Unknown Title"}
          </h1>
          <div className="flex gap-2 mt-2">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 text-sm font-medium rounded-full">
              {book.stock > 5 ? "In Stock" : "Limited Stock"}
            </span>
          </div>
        </div>
        <button
          className={`text-2xl transition-all transform ${
            isFavorite ? "text-red-500 scale-110" : "text-gray-400"
          } hover:scale-125`}
          onClick={toggleWishlist}
        >
          <FaHeart />
        </button>
      </div>

      <p className="text-lg text-gray-600 mt-2">
        by <span className="font-semibold">{book.author || "Unknown Author"}</span>
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span className="flex text-yellow-500 text-lg">
          {[...Array(5)].map((_, i) => (
            <AiFillStar key={i} />
          ))}
        </span>
        <p className="text-gray-600 text-sm md:text-base">
          (4.9/5) 1,234 Ratings | {book.reviews?.length || 0} Reviews
        </p>
      </div>

      <div className="mt-4 text-2xl font-bold text-green-600">
        ${book.price} <span className="text-gray-500 line-through text-lg">${book.originalPrice}</span>
        <span className="text-red-500 text-lg"> ({discountPercentage.toFixed(0)}% OFF)</span>
      </div>
      <p className="text-gray-600 text-sm">Inclusive of all taxes</p>

      <div className="border-t pt-4 text-gray-700 mt-4">
        <h2 className="text-lg font-semibold mb-2">Highlights</h2>
        <ul className="list-disc list-inside text-sm md:text-base">
          <li><span className="font-semibold">Language:</span> {book.language}</li>
          <li><span className="font-semibold">Publisher:</span> {book.publisher}</li>
          <li><span className="font-semibold">Genre:</span> {book.genre}</li>
          <li><span className="font-semibold">Edition:</span> {book.edition}</li>
          <li><span className="font-semibold">Pages:</span> {book.pages}</li>
        </ul>
      </div>

      <div className="border-t pt-4 text-gray-700 mt-4">
        <h2 className="text-lg font-semibold mb-2">Seller</h2>
        <p className="text-gray-900 font-medium">{book.seller.title || "Unknown Seller"}</p>
        <p className="text-gray-600 text-sm">{book.days}-Day Replacement Policy</p>
      </div>

      <div className="border-t pt-4 text-gray-700 mt-4">
        <h2 className="text-lg font-semibold mb-2">Specifications</h2>
        <p><span className="font-semibold">Publication Year:</span> {book.publicationYear}</p>
        <p><span className="font-semibold">Net Quantity:</span> {book.quantity}</p>
        <p><span className="font-semibold">Imprint:</span> {book.imprint}</p>
        <p><span className="font-semibold">Pages:</span> {book.pages}</p>
      </div>

      <div className="border-t pt-6 text-gray-700 mt-6">
        <h2 className="text-xl font-semibold mb-4">Ratings & Reviews</h2>
        {review?.length > 0 ? (
          review.map((review, index) => (
            <div key={index} className="mb-4 pb-4 border-b last:border-none">
              <div className="flex items-center gap-2">
                <span className="flex text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <AiFillStar key={i} />
                  ))}
                </span>
                <p className="font-semibold">{review.title}</p>
              </div>
              <p className="text-gray-600 mt-1">{review.description}</p>
              <p className="text-sm text-gray-500 mt-1">Reviewed on {new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default RightBook;