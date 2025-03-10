import express from "express";
const cartRoutes = express.Router();
import {
  addToCartController,
  removeItemFromCartController,
  getAllItemfromCartController,
  updateCartQuantity
} from "../controllers/cart.controller.js"; 

import {authMiddleware} from "../middlewares/verifyJwt.middleware.js"
// Cart routes
cartRoutes.post("/add-to-cart/:bookId",authMiddleware, addToCartController); 
cartRoutes.get("/cart",authMiddleware, getAllItemfromCartController); 
cartRoutes.put("/cart-update/:bookId",authMiddleware, updateCartQuantity); 
cartRoutes.delete("/remove-from-cart/:bookId",authMiddleware, removeItemFromCartController); 

export default cartRoutes;
