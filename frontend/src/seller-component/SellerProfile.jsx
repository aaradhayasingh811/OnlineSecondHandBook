import { useState, useEffect } from "react";
import { Edit, Save, Loader } from "lucide-react";
import axios from "axios";

const SellerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState("");

  // Fetch Profile Data on Mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-profile-seller`,
          { withCredentials: true }
        );

        const { _id, totalProducts, createdAt,isGoogleUser, __v, ...filteredProfile } =
          response.data.seller;

        setProfile(filteredProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Failed to load profile!");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    console.log("Updated Profile:", profile);
  }, [profile]);

  const handleEditToggle = async () => {
    if (isEditing) {
      setLoading(true);
      setMessage("");

      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/update-seller`, profile, {
          withCredentials: true,
        });
        setMessage("Profile updated successfully!");
      } catch (error) {
        setMessage("Failed to update profile!");
        console.error("Error updating profile:", error);
      } finally {
        setLoading(false);
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (!profile || Object.keys(profile).length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={32} />
        <span className="ml-3 text-gray-700">Loading Profile...</span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-xl rounded-2xl bg-gradient-to-br from-gray-100 to-gray-300 transition-all 
      hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Seller Profile</h2>

      {/* Profile Image */}
      <div className="relative flex justify-center">
        <img
          src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-400 shadow-md transition-all 
            hover:scale-110 hover:border-gray-500 duration-300"
        />
      </div>

      {/* Profile Fields */}
      <div className="mt-4 space-y-4">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="font-semibold capitalize w-24 text-gray-700">{key}:</span>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={typeof value === "object" ? JSON.stringify(value) : value}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full bg-white shadow-sm transition-all focus:ring-2 focus:ring-blue-400 
          hover:shadow-md duration-300"
              />
            ) : (
              <span className="text-gray-800">
                {typeof value === "object" ? JSON.stringify(value) : value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Message Notification */}
      {message && (
        <p className={`text-center mt-4 font-semibold ${message.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
          {message}
        </p>
      )}

      {/* Edit/Save Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleEditToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all shadow-md 
            hover:shadow-lg hover:scale-105 duration-300 ${
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } ${loading && "opacity-50 cursor-not-allowed"}`}
          disabled={loading}
        >
          {loading ? <Loader size={18} className="animate-spin" /> : isEditing ? <Save size={18} /> : <Edit size={18} />}
          {loading ? "Saving..." : isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default SellerProfile;
