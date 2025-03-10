import mongoose from "mongoose";
import User from "../models/user.model.js";
import Book from "../models/books.model.js";
import Cart from "../models/cart.model.js";

const addToCartController = async (req, res) => {
  try {
    const { userId } = req.user;
    const { bookId } = req.params;
    const { quantity } = req.body;

    // Validate User
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate Book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ user: user });

    if (!cart) {
      cart = new Cart({
        user: user,
        items: [{ book: book, quantity: quantity || 1 }],
      });
    } else {
      // Check if book already exists in cart
      const bookIndex = cart.items.findIndex(item => item.book.toString() === bookId);
      if (bookIndex > -1) {
        cart.items[bookIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ book: book, quantity: quantity || 1 });
      }
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Book added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding book to cart",
      error: error.message,
    });
  }
};

const removeItemFromCartController = async (req, res) => {
  try {
    const { userId } = req.user;
    const {  bookId } = req.params;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the book in the cart
    const bookIndex = cart.items.findIndex(item => item.book.toString() === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in cart" });
    }

    // Remove the book from cart
    cart.items.splice(bookIndex, 1);

    // If cart is empty after removal, delete it
    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
    } else {
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Book removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing book from cart",
      error: error.message,
    });
  }
};

const getAllItemfromCartController = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ message: "You are not logged in!!" });
    }

    // Fetch cart and populate book details
    const cart = await Cart.find({ user: userId }).populate("items.book");

    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json({
      success: true,
      message: "All items from cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getting items from cart",
      error: error.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1." });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ success: false, message: "Cart not found." });

    const itemIndex = cart.items.findIndex((item) => item.book.toString() === bookId);
    if (itemIndex === -1) return res.status(404).json({ success: false, message: "Book not found in cart." });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, message: "Cart updated successfully", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export  { addToCartController, removeItemFromCartController , getAllItemfromCartController ,updateCartQuantity };
