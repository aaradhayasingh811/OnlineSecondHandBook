import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Address from "../components/Address";
import Profile from "../components/Profile";
import AllWishlist from "./AllWishlist";
import axios from "axios";
import AllOrder from "../components/AllOrder";
import Notification from "../components/Notification";

const VIEWS = {
  PROFILE: "profile",
  ORDERS: "orders",
  ADDRESS: "address",
  WISHLIST: "wishlist",
  NOTIFICATIONS: "notifications",
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState(VIEWS.PROFILE);

  const handleNavigation = (view) => setActiveView(view);

  const handleLogout = async () => {
    console.log("Logging out...");
    await axios.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true });
    navigate("/");
    window.location.reload();

  };

  return (
    <div className="flex">
<Sidebar
  activeView={activeView}  // Pass activeView state
  handleProfile={() => handleNavigation(VIEWS.PROFILE)}
  handleOrders={() => handleNavigation(VIEWS.ORDERS)}
  handleAddress={() => handleNavigation(VIEWS.ADDRESS)}
  handleWishlist={() => handleNavigation(VIEWS.WISHLIST)}
  handleNotifications={() => handleNavigation(VIEWS.NOTIFICATIONS)}
  handleLogout={handleLogout}
/>

      <div className="flex-1 p-6">
        {activeView === VIEWS.PROFILE && <Profile />}
        {activeView === VIEWS.ADDRESS && <Address />}
        {activeView === VIEWS.ORDERS && <AllOrder />}
        {activeView === VIEWS.WISHLIST && <AllWishlist />}
        {activeView === VIEWS.NOTIFICATIONS && <Notification />}
        
      </div>
    </div>
  );
};

export default UserDashboard;
