import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Book from "./pages/Book";
import Cart from "./pages/Cart";
import AllBooks from "./pages/AllBooks";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import Stripe from "./components/Stripe";
import UserDashboard from "./pages/UserDashboard";
import AuthSeller from "../src/seller-pages/AuthSeller";
import SellerDashboard from "./seller-pages/SellerDashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
};

const MainContent = () => {
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith("/seller");

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {!isSellerRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/checkout" element={<Order />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/stripe-pay" element={<Stripe />} />
        {/* Seller Routes */}
        <Route path="/loginSeller" element={<AuthSeller />} />
        <Route path="/registerSeller" element={<AuthSeller />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
      </Routes>
      {!isSellerRoute && <Footer />}
    </div>
  );
};

export default App;
