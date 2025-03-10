import express from "express"
const app = express();
import dotenv from "dotenv"
import cors from "cors"
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true

}));
import cookieParser from "cookie-parser"



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRoute from "./routes/user.route.js";
import bookRoutes from "./routes/books.route.js";
import sellerRoutes from "./routes/seller.route.js";
import reviewRoute from "./routes/review.route.js";
import cartRoutes from "./routes/cart.route.js";
import wishRoutes from "./routes/wishlist.route.js";
import orderRouter from "./routes/order.route.js";
app.use("/api/v1",userRoute);
app.use("/api/v1",bookRoutes);
app.use("/api/v1",sellerRoutes);
app.use("/api/v1",reviewRoute);
app.use("/api/v1",cartRoutes);
app.use("/api/v1",wishRoutes);
app.use("/api/v1",orderRouter);

export default app;