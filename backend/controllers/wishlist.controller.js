import Wishlist from "../models/wishlist.model.js";
import User from "../models/user.model.js";
import Book from "../models/books.model.js";
import mongoose from "mongoose";

const addToWishListController = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { books: bookId } },
      { new: true, upsert: true }
    ).populate("books");

    return res.json({ message: "Book added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

const removeFromWishlistController = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { books: bookId } },
      { new: true }
    ).populate("books");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.json({ message: "Book removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

const isBookInWishlistController = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const wishlist = await Wishlist.findOne({ user: userId });
    const isInWishlist = wishlist ? wishlist.books.includes(bookId) : false;

    return res.json({ isInWishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

const getAllWishlistController = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const wishlist = await Wishlist.findOne({ user: userId })
      .populate({
        path: "books",
        select: "title author price originalPrice discount image stock language",
      });

    return res.json({ 
      success: true, 
      wishlist: wishlist ? wishlist.books : []
        });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

export { addToWishListController, removeFromWishlistController, isBookInWishlistController , getAllWishlistController };
