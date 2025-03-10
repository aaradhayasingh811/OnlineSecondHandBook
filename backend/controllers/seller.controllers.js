import Seller from "../models/seller.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register Seller
const registerSeller = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, title, gender, email, mobile, address, password } = req.body;

    let existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name,
      title,
      gender,
      email,
      mobile,
      address,
      password: hashedPassword,
    });
    await newSeller.save();
    
    res.status(201).json({ message: "Seller registered successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Seller
// const loginSeller = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }
    
//     const seller = await Seller.findOne({ email });
//     if (!seller) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "Strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({ token, seller: seller, success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

const loginSeller = async (req, res) => {
  try {
    const { email, password, googleToken } = req.body;
    let seller;

    if (googleToken) {
      // Google Login Handling
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name, picture } = ticket.getPayload();
      seller = await Seller.findOne({ email });

      if (!seller) {
        // Auto-register seller if not found
        seller = new Seller({
          email,
          name,
          password: "GoogleAuth",
          profilePicture: picture,
          isGoogleAuth: true,
        });
        await seller.save();
      }
    } else {
      // Manual Login Handling
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      seller = await Seller.findOne({ email });
      if (!seller) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (seller.isGoogleAuth) {
        return res.status(400).json({ message: "Use Google Login instead" });
      }

      const isMatch = await bcrypt.compare(password, seller.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    // Generate JWT token
    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, seller, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Update Seller Profile
const updateSellerProfile = async (req, res) => {
  try {
    const sellerId = req.seller.id;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedSeller = await Seller.findByIdAndUpdate(sellerId, updates, { 
      new: true, 
      runValidators: true 
    });

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", seller: updatedSeller.toObject() });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout Seller
const logoutSeller = (req, res) => {
  res.cookie("token", "", { httpOnly: true, secure: true, sameSite: "Strict", expires: new Date(0) });
  res.status(200).json({ message: "Seller logged out successfully" });
};

// Get Seller Profile
// const profileController = async (req, res) => {
//   try {
//     const sellerId = req.seller.id;
//     console.log(sellerId)
//     const seller = await Seller.findById(sellerId).select("-password");

//     if (!seller) {
//       return res.status(404).json({ message: "Seller not found" });
//     }

//     res.status(200).json({ seller: seller.toObject() });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
const profileController = async (req, res) => {
  try {
    console.log("Decoded Seller ID:", req.seller?.id); // Debugging

    const sellerId = req.seller.id;
    const seller = await Seller.findById(sellerId).select("-password");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ seller: seller.toObject() });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export { registerSeller, loginSeller, updateSellerProfile, logoutSeller, profileController };
