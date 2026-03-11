const jwt = require("jsonwebtoken");


// 🔐 Verify Logged In User
const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract token from "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

    // Attach user data to request
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(403).json({ message: "Invalid or expired token" });

  }

};



// 🔐 Admin Only Access
const adminOnly = (req, res, next) => {

  try {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();

  } catch (error) {

    return res.status(500).json({ message: "Authorization error" });

  }

};



module.exports = {
  authMiddleware,
  adminOnly
};