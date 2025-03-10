import express from "express";
const userRoute = express.Router();
import {
    registerController,
    loginController,
    updateUserController,
    addAddressController,
    editAddressController,
    sendEmail,
    deleteAddressController,
    logoutController,
    isLoggedInController,
    checkController,
    getAllAddressController,
    getProfileController
} from "../controllers/users.controller.js";       

import { authMiddleware } from "../middlewares/verifyJwt.middleware.js";

// User routes
userRoute.post("/register", registerController);
userRoute.post("/login", loginController);
userRoute.put("/update-profile",authMiddleware, updateUserController);
userRoute.get("/logout",authMiddleware, logoutController);
userRoute.get("/profile",authMiddleware, getProfileController);
userRoute.get("/isLoggedIn",authMiddleware, isLoggedInController);
userRoute.get("/check-login",authMiddleware, checkController);


// Address routes
userRoute.get("/all-address", authMiddleware, getAllAddressController);
userRoute.post("/address",authMiddleware, addAddressController);
userRoute.put("/edit-address/:addrID",authMiddleware, editAddressController);
userRoute.delete("/delete-address/:addrID",authMiddleware, deleteAddressController); 

// Contact route
userRoute.post("/contact", sendEmail);

export default userRoute;
