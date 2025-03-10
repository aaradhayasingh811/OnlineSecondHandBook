import jwt from "jsonwebtoken";

const sellerAuth = (req, res, next) => {
  const token = req.cookies?.token; // Ensure token exists
  console.log("Token received:", req.cookies?.token);


  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.seller = { id: decoded.id };  
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};

export { sellerAuth };
