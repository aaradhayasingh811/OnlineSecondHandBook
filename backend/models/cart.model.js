import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
            quantity: { type: Number, default: 1 }
        }
    ]
}, {
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
