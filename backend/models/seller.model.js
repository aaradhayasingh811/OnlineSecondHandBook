import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  address: {
    city: { type: String },
    pincode: { type: String },
    state: { type: String },
  },
  password: { type: String, required: true },
  totalProducts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },

});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
