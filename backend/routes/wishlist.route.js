import express from "express"
const wishRoutes = express.Router();

import {addToWishListController ,removeFromWishlistController ,isBookInWishlistController , getAllWishlistController} from '../controllers/wishlist.controller.js'
import { authMiddleware } from "../middlewares/verifyJwt.middleware.js";


wishRoutes.get("/is-in-wishlist/:bookId",authMiddleware,isBookInWishlistController);
wishRoutes.post("/add-to-wishlist/:bookId",authMiddleware,addToWishListController);
wishRoutes.delete("/delete-from-wishlist/:bookId",authMiddleware,removeFromWishlistController);
wishRoutes.get("/all-wishlist",authMiddleware,getAllWishlistController)

export default wishRoutes;