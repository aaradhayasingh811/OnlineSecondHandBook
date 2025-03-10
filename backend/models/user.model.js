import mongoose from "mongoose";

import { v4 as uuidv4 } from 'uuid';

const addressSchema = new mongoose.Schema({
  addrID: { type: String, required: true, default: uuidv4 },
  type: { type: String, enum: ["HOME", "WORK"], required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function () { return !this.isGoogleUser; } }, // Conditional required
  phone: { type: String, required: function () { return !this.isGoogleUser; } },
  gender: { type: String },
  address: [addressSchema],
  isGoogleUser: { type: Boolean, default: false }, 
  totalProducts: { type: Number, default: 0 },
  isLoggedIn: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
