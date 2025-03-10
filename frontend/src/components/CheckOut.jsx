import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Radio, FormControlLabel, MenuItem, Select, InputLabel, FormControl, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "", pincode: "", type: "HOME" });
  const [editAddressId, setEditAddressId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-address`, { withCredentials: true });
        if (response.data && response.data.data) {
          setAddresses(response.data.data);

          // Automatically select the first address if none is selected
          if (response.data.data.length > 0 && !selectedAddress) {
            setSelectedAddress(response.data.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddress();
  }, []);

  const handleSaveAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.pincode) {
      alert("All fields are required!");
      return;
    }
    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/edit-address/${editAddressId}`, newAddress, { withCredentials: true });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/address`, newAddress, { withCredentials: true });
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-address`, { withCredentials: true });
      setAddresses(response.data.data);
      setOpen(false);
      setNewAddress({ name: "", phone: "", address: "", pincode: "", type: "HOME" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress(address);
    setEditAddressId(address.addrID);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/delete-address/${id}`, { withCredentials: true });
      const updatedAddresses = addresses.filter((addr) => addr.addrID !== id);
      setAddresses(updatedAddresses);

      // Reset selected address if it was deleted
      if (selectedAddress?.addrID === id) {
        setSelectedAddress(updatedAddresses.length > 0 ? updatedAddresses[0] : null);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address. Please try again.");
    }
  };

  console.log(cartItems, totalPrice, selectedAddress)

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 min-h-[90vh]">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Checkout</h2>

      <h3 className="text-xl font-semibold mb-4">Select Delivery Address:</h3>
      {addresses.length === 0 ? (
        <p className="text-gray-600 text-center">No saved addresses. Please add one.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div key={addr.addrID} className={`p-4 border rounded-lg flex justify-between items-center ${selectedAddress?.addrID === addr.addrID ? "border-green-500" : "border-gray-300"}`}>
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedAddress?.addrID === addr.addrID}
                    onChange={() => {
                      console.log("Selected address:", addr);
                      setSelectedAddress(addr);
                    }}
                  />
                }
                label={
                  <div>
                    <p className="font-semibold">{addr.name} ({addr.type})</p>
                    <p>{addr.phone}</p>
                    <p>{addr.address}, {addr.pincode}</p>
                  </div>
                }
              />
              <div>
                <IconButton onClick={() => handleEditAddress(addr)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteAddress(addr.addrID)} color="error">
                  <Delete />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button variant="outlined" color="primary" fullWidth sx={{ mt: 3 }} onClick={() => setOpen(true)}>
        Add New Address
      </Button>

      <h3 className="text-xl font-semibold mt-6">Order Summary:</h3>
      <div className="p-4 bg-gray-100 rounded-lg">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
            <p>{item.book.title} x {item.quantity}</p>
            <p className="font-semibold">₹{(item.book.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-3">
          <p>Total:</p>
          <p>₹{totalPrice}</p>
        </div>
      </div>

      <Button variant="contained" color="success" fullWidth sx={{ mt: 4 }} onClick={() => navigate("/payment", { state: { cartItems, totalPrice, selectedAddress } })} disabled={!selectedAddress || cartItems.length === 0}>
        Continue to Payment
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditing ? "Edit Address" : "Add New Address"}</DialogTitle>
        <DialogContent>
          <TextField label="Full Name" fullWidth margin="dense" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
          <TextField label="Phone Number" fullWidth margin="dense" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} />
          <TextField label="Address" fullWidth multiline rows={3} margin="dense" value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
          <TextField label="Pincode" fullWidth margin="dense" value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select value={newAddress.type} onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}>
              <MenuItem value="HOME">Home</MenuItem>
              <MenuItem value="WORK">Work</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSaveAddress} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Checkout;
