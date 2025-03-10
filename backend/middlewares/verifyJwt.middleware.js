// import jwt from "jsonwebtoken"
// import User from "../models/user.model.js"

// const authMiddleware = (req, res, next) => {
//     const token = req.cookies.token || req.headers["authorization"];
//     if (!token) {
//       return res.status(401).json({ msg: "Unauthorized: No token provided" });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       return res.status(403).json({ msg: "Invalid or expired token" });
//     }
//   };



// export { authMiddleware };

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to `req.user`
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};

export { authMiddleware };
