import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    deliveryDate: {
      type: Date,
      // required: true,
    },
    statusMessage: {
      type: String,
      default: "Your item has been shipped",
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Delivered",
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    book :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    seller :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
    }
  },
  { timestamps: true } 
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
