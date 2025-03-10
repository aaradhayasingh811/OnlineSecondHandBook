import express from "express";
const reviewRoute = express.Router();
import {
  addReviewToBook,
  editReviewController,
  getAllReviewOfBookController,
  deleteReviewController,
  getAllReviewOfSellerController,
  getReviewByBookID
} from "../controllers/reviews.controller.js"; 

import { authMiddleware } from "../middlewares/verifyJwt.middleware.js";
import { sellerAuth } from "../middlewares/sellerVerify.middleware.js";
// Review routes
reviewRoute.get("/all-review/:bookId", getAllReviewOfBookController); 
reviewRoute.get("/all-review-seller",sellerAuth, getAllReviewOfSellerController); 
reviewRoute.post("/add-review/:bookId",authMiddleware, addReviewToBook); 
reviewRoute.put("/edit-review/:bookId", authMiddleware, editReviewController); 
reviewRoute.get("/get-review/:bookId", authMiddleware, getReviewByBookID); 
reviewRoute.delete("/delete-review/:bookId", authMiddleware, deleteReviewController); 


export default reviewRoute;
