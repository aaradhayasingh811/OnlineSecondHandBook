import express from "express"
const app = express();
import dotenv from "dotenv"
import cors from "cors"
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true

}));
import cookieParser from "cookie-parser"

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
  

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
import StripeRouter from "./routes/stripe.route.js";
app.use("/api/v1",userRoute);
app.use("/api/v1",bookRoutes);
app.use("/api/v1",sellerRoutes);
app.use("/api/v1",reviewRoute);
app.use("/api/v1",cartRoutes);
app.use("/api/v1",wishRoutes);
app.use("/api/v1",orderRouter);
app.use("/api/v1/stripe", StripeRouter);


export default app;
