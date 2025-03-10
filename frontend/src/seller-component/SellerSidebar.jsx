import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, User, BookOpen, List, ShoppingCart, Truck, LogOut , StarIcon } from "lucide-react";

const SellerSidebar = ({ activeView, handleProfile, handleAddBook, handleViewBooks, handleViewOrders, handleTrackDelivery, handleLogout,profile , handleReviews }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { name: "Profile", icon: <User size={20} />, action: handleProfile, view: "profile" },
    { name: "Add a Book", icon: <BookOpen size={20} />, action: handleAddBook, view: "add-book" },
    { name: "View Books", icon: <List size={20} />, action: handleViewBooks, view: "view-books" },
    { name: "View Orders", icon: <ShoppingCart size={20} />, action: handleViewOrders, view: "view-orders" },
    { name: "Track Delivery", icon: <Truck size={20} />, action: handleTrackDelivery, view: "track-delivery" },
    { name: "My Reviews", icon: <StarIcon size={20} />, action: handleReviews, view: "view-reviews" },
    { name: "Logout", icon: <LogOut size={20} />, action: handleLogout, view: "" },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-3 z-50 fixed top-4 left-4 bg-gray-800 text-white rounded-full shadow-lg"
        aria-label="Toggle Sidebar"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>
      )}

      <div
        ref={sidebarRef}
        className={`bg-gray-900 text-white w-64 min-h-screen h-full p-5 space-y-4 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative top-0 left-0 z-40`}
        role="navigation"
      >
        <h2 className="text-xl font-bold text-center">Hello, { profile.name}</h2>
        <nav>
          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.action}
                  className={`flex items-center gap-3 p-3 w-full text-left rounded-lg transition-all 
                    ${activeView === item.view ? "bg-gray-700 text-white" : ""}`}
                >
                  {item.icon} <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SellerSidebar;
