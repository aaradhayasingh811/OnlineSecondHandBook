import React, { useState, useEffect } from "react";
import {
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Radio, FormControlLabel, MenuItem, Select, InputLabel, FormControl,
  IconButton, CircularProgress
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const Address = ({ selectedAddress, setSelectedAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "", pincode: "", type: "HOME" });
  const [editAddressId, setEditAddressId] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-address`, { withCredentials: true });
        setAddresses(response.data.data || []);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
      setLoading(false);
    };
    fetchAddresses();
  }, []);

  const handleSaveAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.pincode) {
      alert("All fields are required!");
      return;
    }
    setSaving(true);
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
    setSaving(false);
  };

  const handleEditAddress = (address) => {
    setNewAddress(address);
    setEditAddressId(address.addrID);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDeleteAddress = async (id) => {
    setDeleting(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/delete-address/${id}`, { withCredentials: true });
      setAddresses(addresses.filter((addr) => addr.addrID !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address. Please try again.");
    }
    setDeleting(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Select Delivery Address</h3>

      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : addresses.length === 0 ? (
        <p className="text-gray-600 text-center">No saved addresses. Please add one.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div key={addr._id} className={`p-4 border rounded-lg flex justify-between items-center ${selectedAddress?._id === addr._id ? "border-green-500" : "border-gray-300"}`}>
              <FormControlLabel
                control={<Radio checked={selectedAddress?._id === addr._id} onChange={() => setSelectedAddress(addr)} />}
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
                <IconButton onClick={() => handleDeleteAddress(addr.addrID)} color="error" disabled={deleting === addr.addrID}>
                  {deleting === addr.addrID ? <CircularProgress size={24} /> : <Delete />}
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button variant="outlined" color="primary" fullWidth sx={{ mt: 3 }} onClick={() => setOpen(true)} disabled={saving}>
        {saving ? <CircularProgress size={24} /> : "Add New Address"}
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
          <Button onClick={handleSaveAddress} color="primary" disabled={saving}>
            {saving ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Address;
