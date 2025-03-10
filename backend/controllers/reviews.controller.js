import mongoose from "mongoose";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";
import Book from "../models/books.model.js";

const getAllReviewOfBookController = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const reviews = await Review.find({ book: bookId });
    if (reviews.length == 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this book" });
    }
    res.status(200).json({
      reviews: reviews,
      message: "Reviews of the book",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

const addReviewToBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user.userId;
    const { rating, title, description } = req.body;
    if( !rating || !title || !description){
        return res.status(400).json({ message: "Please fill all fields" });
    }
    const book = await Book.findOne({ _id: bookId });
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const review = new Review({
      rating,
      title,
      description,
      book,
      seller: book.seller,
      user
    });
    const savedReview = await review.save();
    res.status(201).json({
        review: savedReview,
        message: "Review added successfully",
    })
  }  catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding reviews to book",
      error: error.message,
    });
  }
};


const editReviewController = async (req, res) => {
    try {
      const { rating, title, description } = req.body;
      const { bookId } = req.params;
      const userId = req.user.userId;

      // Find the review by ID
      const review = await Review.findOne({$and:[{user:userId},{book:bookId}]});
      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }
  
      // Update fields only if provided in req.body
      if (rating !== undefined) review.rating = rating;
      if (title !== undefined) review.title = title;
      if (description !== undefined) review.description = description;
  
      // Save the updated review
      const updatedReview = await review.save();
  
      res.status(200).json({
        success: true,
        message: "Review updated successfully",
        review: updatedReview,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating review",
        error: error.message,
      });
    }
  }

  const deleteReviewController = async (req, res) => {
    try {
      const { bookId } = req.params;
      const userId = req.user.userId;
  
      // Find the review by user and book ID
      const review = await Review.findOne({ $and: [{ user: userId }, { book: bookId }] });
      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }
  
      // Delete the review
      await Review.deleteOne({ _id: review._id });
  
      res.status(200).json({
        success: true,
        message: "Review deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting review",
        error: error.message
      });
    }
  };

const getAllReviewOfSellerController = async(req,res) =>{
  try {
    const sellerId = req.seller.id;
    const reviews = await Review.find({ seller: sellerId }).populate('user').populate('book');
    if(!reviews){
      return res.status(404).json({ success: false, message: "No reviews found"})

    }
    res.status(200).json({
      success: true,
      reviews: reviews
      });


    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getting seller review",
      error: error.message
    });
  }
}

const getReviewByBookID = async(req,res) =>{
  try {
    const bookId = req.params.bookId;
    const {userId} = req.user;
   const review = await Review.find({
    book: bookId,
   })
      if(!review){
        return res.status(404).json({ success: false, message: "No review found"
          })
      }
      res.status(200).json({
        success: true,
        review: review
        });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getting book review",
      error: error.message
    });
  }
}

export  {
    addReviewToBook,
    editReviewController,
    getAllReviewOfBookController,
    deleteReviewController,
    getAllReviewOfSellerController,
    getReviewByBookID
}