import { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { X } from "lucide-react";

const BestSellerCard = ({ book, handleUpdate }) => {
  const [bookLoading, setBookLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedBook, setEditedBook] = useState({ ...book });
  const [updating, setUpdating] = useState(false); // Loader state

  const toggleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleChange = (e) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    setUpdating(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/edit-books/${book._id}`,
        editedBook,
        { withCredentials: true }
      );

      if (response.status === 200) {
        handleUpdate(editedBook); // Update UI
        toggleEditModal();
      }
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Calculate discount percentage safely
  const discount =
    book.originalPrice && book.price
      ? Math.round(
          ((book.originalPrice - book.price) / book.originalPrice) * 100
        )
      : 0;

  return (
    <>
      <button
        onClick={toggleEditModal}
        className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 w-64 flex flex-col justify-between"
      >
        {/* Book Cover */}
        <div
          className="relative p-4 rounded-t-lg"
          style={{
            background: "linear-gradient(to bottom, #C19A6B 80%, #967969 20%)",
          }}
        >
          <img
            src={book.image || "/fallback-image.jpg"} // Fallback image
            alt={book.title}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>

        {/* Book Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{book.author}</p>
          <p className="text-xs text-gray-500">
            {book.edition} | {book.genre} | {book.language}
          </p>
          <p className="text-xs text-gray-500">
            Published: {book.publicationYear}
          </p>
          <p className="text-xs text-gray-500">Condition: {book.condition}</p>

          {/* Pricing */}
          <p className="text-green-600 font-semibold text-lg mt-2">
            ${Number(book.price)?.toFixed(2) || "N/A"}{" "}
            <span className="text-gray-500 line-through text-sm">
              ${Number(book.originalPrice)?.toFixed(2) || "N/A"}
            </span>{" "}
            {discount > 0 && (
              <span className="text-red-500 text-sm">({discount}% off)</span>
            )}
          </p>
        </div>

        {/* Loader while fetching book details */}
        {bookLoading && (
          <div className="flex justify-center py-2">
            <CircularProgress size={24} />
          </div>
        )}
      </button>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
            <button
              onClick={toggleEditModal}
              className="absolute top-2 right-2"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Book</h2>

            <div className="space-y-3">
              <input
                type="text"
                name="title"
                value={editedBook.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Book Title"
              />
              <input
                type="text"
                name="author"
                value={editedBook.author}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Author Name"
              />
              <input
                type="number"
                name="price"
                value={editedBook.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Selling Price"
              />
              <input
                type="number"
                name="originalPrice"
                value={editedBook.originalPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Original Price"
              />
              <input
                type="text"
                name="genre"
                value={editedBook.genre}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Genre"
              />
              <select
                name="condition"
                value={editedBook.condition}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Acceptable">Acceptable</option>
              </select>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={toggleEditModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                {updating && <CircularProgress size={16} color="inherit" />}
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellerCard;
