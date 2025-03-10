import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerSidebar from "../seller-component/SellerSidebar";
import SellerProfile from "../seller-component/SellerProfile";
import AddBook from "../seller-component/AddBook";
import ViewBooks from "../seller-component/ViewBooks";
import ViewOrder from "../seller-component/ViewOrder";
import SellerReviews from "../seller-component/SellerReviews";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("profile");
  const [profile, setProfile] = useState("seller");
  const [errorMessage, setErrorMessage] = useState(null);

  // Sidebar handlers
  const handleProfile = () => setActiveView("profile");
  const handleAddBook = () => setActiveView("add-book");
  const handleViewBooks = () => setActiveView("view-books");
  const handleViewOrders = () => setActiveView("view-orders");
  const handleTrackDelivery = () => setActiveView("track-delivery");
  const handleReviews = () => setActiveView("view-reviews")

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/logout-seller`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        console.log("Logged out");
        navigate("/loginSeller");
      } else {
        console.log("Error logging out");
        alert("Error in logging out!!");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Error in logging out!!");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-profile-seller`,
          { withCredentials: true }
        );

        const { _id, totalProducts, createdAt, __v, ...filteredProfile } = response.data.seller;
        setProfile(filteredProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setErrorMessage("Failed to load profile!");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    console.log("Updated Profile:", profile);
  }, [profile]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="md:w-1/5">
        <SellerSidebar
          activeView={activeView}
          handleProfile={handleProfile}
          handleAddBook={handleAddBook}
          handleViewBooks={handleViewBooks}
          handleViewOrders={handleViewOrders}
          handleTrackDelivery={handleTrackDelivery}
          handleLogout={handleLogout}
          profile={profile}
          handleReviews={handleReviews}
        />
      </div>

      {/* Main Content */}
      <div className="md:w-4/5 w-full p-5">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {activeView === "profile" && <SellerProfile profile={profile} />}
        {activeView === "add-book" && <AddBook />}
        {activeView === "view-books" && <ViewBooks />}
        {activeView === "view-orders" && <ViewOrder/>}
        {activeView === "track-delivery" && <h2>Track Deliveries</h2>}
        {activeView === "view-reviews" && <SellerReviews/>}
      </div>
    </div>
  );
};

export default SellerDashboard;
