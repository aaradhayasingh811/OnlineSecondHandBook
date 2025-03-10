import express from "express";
import { registerSeller, loginSeller, updateSellerProfile, logoutSeller ,profileController } from "../controllers/seller.controllers.js";
import { sellerAuth } from "../middlewares/sellerVerify.middleware.js";
const sellerRoutes = express.Router();

sellerRoutes.post("/register-seller", registerSeller);
sellerRoutes.post("/login-seller", loginSeller);
sellerRoutes.put("/update-seller", sellerAuth, updateSellerProfile);
sellerRoutes.get("/logout-seller",sellerAuth, logoutSeller);
sellerRoutes.get("/get-profile-seller",sellerAuth, profileController);

export default sellerRoutes;
