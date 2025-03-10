import express from "express";
const bookRoutes = express.Router();
import {
    allBookController,
    getSingleBookController,
    addBookController,
    editBookController,
    filterbooksController,
    searchController,
    viewAllBookSpecificSeller
} from "../controllers/books.controller.js"; 

import { upload } from "../middlewares/multer.middleware.js";

import { sellerAuth } from "../middlewares/sellerVerify.middleware.js";

// Book routes
bookRoutes.get("/all-books", allBookController); 
bookRoutes.get("/books/:id", getSingleBookController);
bookRoutes.post("/add-books", sellerAuth, upload.single("image"), addBookController); 
bookRoutes.put("/edit-books/:bookId", editBookController); 
bookRoutes.get("/filter-books", filterbooksController); 
bookRoutes.get("/search", searchController); 
bookRoutes.get("/all-books/seller",sellerAuth, viewAllBookSpecificSeller); 

export default bookRoutes;
