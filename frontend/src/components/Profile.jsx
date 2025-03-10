// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import axios from "axios";

// const Profile = () => {
//   const [user, setUser] = useState({ name: "", email: "", phone: "", createdAt: "" });
//   const [open, setOpen] = useState(false);
//   const [editData, setEditData] = useState({ name: "", phone: "", email: "", password: "" });

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/v1/profile", { withCredentials: true });
//         setUser(response.data.user);
//         setEditData({ name: response.data.user.name, phone: response.data.user.phone, email: response.data.user.email, password: "" });
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleEdit = async () => {
//     try {
//         console.log(editData)
//       await axios.put("http://localhost:4000/api/v1/update-profile", editData, { withCredentials: true });
//       setUser((prev) => ({ ...prev, ...editData }));
//       setOpen(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200 mt-12">
//       <Typography variant="h4" className="text-center text-gray-900 font-semibold mb-10">Profile</Typography>
      
//       <Card className="shadow-lg rounded-lg overflow-hidden">
//         <div className="bg-gray-100 p-6 flex justify-center">
//           <img src="data:image/png;base64,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" alt="Profile" className="rounded-full border-4 border-white shadow-md" />
//         </div>
//         <CardContent className="p-6">
//           <Typography variant="h6" className="font-semibold text-gray-800">{user.name}</Typography>
//           <Typography variant="body1" className="text-gray-600 mt-2">Email: <span className="text-gray-900">{user.email}</span></Typography>
//           <Typography variant="body1" className="text-gray-600 mt-2">Phone: <span className="text-gray-900">{user.phone}</span></Typography>
//           <Typography variant="body1" className="text-gray-600 mt-2">Joined: <span className="text-gray-900">{new Date(user.createdAt).toDateString()}</span></Typography>
//         </CardContent>
//       </Card>

//       <Button 
//         variant="contained" 
//         fullWidth 
//         className="mt-6 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 rounded-lg shadow-md transition duration-300"
//         onClick={() => setOpen(true)}
//       >
//         Edit Profile
//       </Button>

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle className="text-gray-800 font-semibold">Edit Profile</DialogTitle>
//         <DialogContent className="p-6 space-y-4">
//           <TextField label="Full Name" fullWidth variant="outlined" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
//           <TextField label="Phone Number" fullWidth variant="outlined" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
//           <TextField label="Email" fullWidth variant="outlined" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
//           <TextField label="New Password" fullWidth type="password" variant="outlined" value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} />
//         </DialogContent>
//         <DialogActions className="p-4">
//           <Button onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-800">Cancel</Button>
//           <Button onClick={handleEdit} className="bg-green-600 hover:bg-blue-700 text-white hover:text-white px-4 py-2 rounded-lg">Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { Edit, Save, Loader } from "lucide-react";
import axios from "axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [editData, setEditData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, { withCredentials: true });
        const { _id, password, totalProducts, address, __v, isLoggedIn, ...filteredUser } = response.data.user;
        setUser(filteredUser);
        setEditData({
          name: filteredUser.name,
          phone: filteredUser.phone,
          email: filteredUser.email,
        });
      } catch (error) {
        console.error("Failed to load profile!");
      }
    };
    fetchUser();
  }, []);

  const handleEditToggle = async () => {
    if (isEditing) {
      setLoading(true);
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/update-profile`, editData, { withCredentials: true });
        setUser((prev) => ({ ...prev, ...editData }));
      } catch (error) {
        console.error("Failed to update profile!");
      } finally {
        setLoading(false);
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={32} />
        <span className="ml-3 text-gray-700">Loading Profile...</span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-xl rounded-2xl bg-gradient-to-br from-gray-100 to-gray-300 transition-all hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">User Profile</h2>
      
      <div className="relative flex justify-center">
        <img
          src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-400 shadow-md transition-all hover:scale-110 hover:border-gray-500 duration-300"
        />
      </div>
      
      <div className="mt-4 space-y-4">
        {Object.entries(user).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="font-semibold capitalize text-gray-700">{key}:</span>
            {isEditing && key !== "createdAt" ? (
              <input
                type="text"
                name={key}
                value={editData[key] || ""}
                onChange={handleChange}
                className="border rounded-md p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <span className="text-gray-900">{key === "createdAt" ? new Date(value).toDateString() : value}</span>
            )}
          </div>
        ))}
      </div>
      
      <button
        className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition duration-300"
        onClick={handleEditToggle}
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin" size={20} /> : isEditing ? <Save size={20} /> : <Edit size={20} />}
        {isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
};

export default Profile;
