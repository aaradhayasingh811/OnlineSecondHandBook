import User from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const registerController = async (req, res) => {
    try {
      const { name, email, password, phone, gender } = req.body;
  
      // Validate all fields
      if (!name || !email || !password || !phone || !gender) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        gender,
      });
  
      // Save user to database
      await newUser.save();
  
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: { name, email, phone, gender },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: error.message,
      });
    }
  };


  // const loginController = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  
  //     // Validate input fields
  //     if (!email || !password) {
  //       return res.status(400).json({ success: false, message: "All fields are required" });
  //     }
  
  //     // Check if user exists
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(401).json({ success: false, message: "Invalid credentials" });
  //     }
  
  //     // Compare passwords
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) {
  //       return res.status(401).json({ success: false, message: "Invalid credentials" });
  //     }
  
  //     // Generate JWT Token
  //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
  //     res.status(200).json({
  //       success: true,
  //       message: "Login successful",
  //       user: { name: user.name, email: user.email, phone: user.phone, gender: user.gender },
  //       token,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: "Error logging in",
  //       error: error.message,
  //     });
  //   }
  // };

  const loginController = async (req, res) => {
    try {
      const { email, password, googleToken } = req.body;
  
      let user;
      let token;
      if (googleToken) {
        console.log("Received Google Token:", googleToken);
      }
      
  
      if (googleToken) {
        // Google login flow
        const ticket = await client.verifyIdToken({
          idToken: googleToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
  
        const payload = ticket.getPayload();
        user = await User.findOne({ email: payload?.email });
        if (!user) {
          user = new User({
            name: payload?.name,
            email: payload?.email,
            password: undefined,
            phone: undefined, 
            isGoogleUser: true, 
          });
          await user.save();
        }
      } else {
        // Manual login flow
        if (!email || !password) {
          return res.status(400).json({ success: false, message: "All fields are required" });
        }
  
        user = await User.findOne({ email });
        if (!user || !user.password) {
          return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
  
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
      }
  
      // Generate JWT token
      token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      // Set token in an HTTP-Only cookie
     
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  
      // Send response
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: { name: user.name, email: user.email, phone: user.phone, gender: user.gender },
        
      });
    } catch (error) {
      console.log("logging error", error)
      res.status(500).json({
        success: false,
        message: "Error logging in",
        error: error.message,
      });
    }
  };

  const updateUserController = async (req, res) => {
    try {
      const { userId } = req.user;
      const { email, phone, name, password } = req.body;
  
      // Find user by ID
      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Check if at least one field is provided
      if (!email && !phone && !name && !password) {
        return res.status(400).json({
          success: false,
          message: "At least one field (email, phone, name, or password) must be provided for update",
        });
      }
  
      // Update fields if they are provided
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (name) user.name = name;
  
      // Hash password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      // Save updated user
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User details updated successfully",
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
        },
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating user details",
        error: error.message,
      });
    }
  };

  const addAddressController = async (req, res) => {
    try {
      const { userId } = req.user;
      const { type, address, pincode, phone, name } = req.body;
  
      // Validate required fields
      if (!type || !address || !phone || !pincode || !name) {
        return res.status(400).json({ message: "All address fields are required" });
      }
  
      // Find user by ID
      const addrID = uuidv4();
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Add new address to the user's address array
      user.address.push({ type, address, pincode, phone , addrID, name });
  
      // Save updated user data
      await user.save();
  
      res.status(200).json({ message: "Address added successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  const editAddressController = async (req, res) => {
    try {
        const { addrID } = req.params;
        const userId = req.user.userId; 

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the address inside the user's address array
        const address = user.address.find((addr) => addr.addrID.toString() === addrID);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        // Update only the provided fields
        if (req.body.type) address.type = req.body.type;
        if (req.body.address) address.address = req.body.address;
        if (req.body.pincode) address.pincode = req.body.pincode;
        if (req.body.phone) address.phone = req.body.phone; // Fixed
        if (req.body.name) address.name = req.body.name; // Fixed

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: "Address updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


  const deleteAddressController = async (req, res) => {
    try {
        const { addrID } = req.params;
        const userId = req.user.userId;

        // Find the user and check if the address exists
        const user = await User.findOne({ _id: userId, "address.addrID": addrID });
        if (!user) {
            return res.status(404).json({ message: "User or address not found" });
        }

        // Remove the address using `$pull`
        await User.updateOne({ _id: userId }, { $pull: { address: { addrID } } });

        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting address", error: error.message });
    }
};

const getProfileController = async(req,res) =>{
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
    
  } catch (error) {
    res.status(500).json({ message: "Error in getting profile", error: error.message });
  }
}




  // contact us
  import nodemailer from 'nodemailer';

// Transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS
  },
  
});


// Controller function to send email
 const sendEmail = async (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: 'Email and message are required' });
    }

    const mailOptions = {
      to: process.env.USER_EMAIL, 
      from: email, 
      subject: 'Enquiry Message',
      text: `You have received a new message from: ${email}\n\nMessage: ${message}`
  };
  
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, 
      sameSite: "None", 
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging out", error: error.message });
  }
};

const isLoggedInController =  async(req,res) =>{
  try {
    const userId = req.user.userId;
    if(userId){
      const user = await User.findById(userId);
      if(!user){
        return res.status(401).json({ success: false, message: "User not found"})
      }
      user.isLoggedIn = true;
      await user.save();
      res.status(200).json({ success: true, message: "User is logged in"
        });

    }
    else{
      res.status(401).json({ success: false, message: "User is not logged in"});
    }
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Error checking login status",
      error: error.message });
  }
}

const checkController = async(req,res) =>{
  try {
    const userId = req.user.userId;
    if(!userId){
      return res.status(401).json({ success: false, message: "User is not logged"})
    }
    const user = await User.findById(userId);
    if(!user){
      return res.status(401).json({ success: false, message: "User not found"})
    }
    return res.status(200).json(user);

    
  } catch (error) {
    res.status(500).json({ success: false, message: "Error checking cookie", error: error.message });

  }
}


const getAllAddressController = async(req,res) =>{
  try {
    const userId = req.user.userId;
    if(!userId){
      return res.status(401).json({ success: false, message: "User is not logged"})
    }
    const user = await User.findById(userId);
    if(!user){
      return res.status(401).json({ success: false, message: "User not found"})
    }
    return res.status(200).json({
      success: true,
      message: "All addresses",
      data: user.address
    })
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Error getting address", error: error.message });  
  }
}


  export  {
    addAddressController,
    editAddressController,
    registerController,
    loginController,
    updateUserController,
    sendEmail,
    deleteAddressController,
    logoutController,
    isLoggedInController,
    checkController,
    getAllAddressController,
    getProfileController
  }