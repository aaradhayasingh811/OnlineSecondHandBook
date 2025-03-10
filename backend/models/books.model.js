import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  publisher: { type: String, required: true },
  genre: { type: String, required: true },
  edition: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  pages: { type: Number, required: true },
  condition: {
    type: String,
    enum: ["New", "Like New", "Very Good", "Good", "Acceptable"],
    required: true,
  },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: {
    type: Number,
    default: function () {
      return this.originalPrice && this.price
        ? ((this.originalPrice - this.price) / this.originalPrice) * 100
        : 0;
    },
  },
  stock: { type: Number, default: 1 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  quantity:{
    type:Number,
    default:1,
  },
  imprint:{
    type:String,
    default:'XYZ Publisher',
  },
  days:{
    type:Number,
    default:0,
  },
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
