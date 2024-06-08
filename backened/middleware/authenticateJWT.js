// Import necessary libraries and models
import jwt from "jsonwebtoken"; // For verifying JWTs
import User from "../models/user.js"; // User model for database lookup
import dotenv from "dotenv"; // For loading environment variables

// Load environment variables from .env file
dotenv.config();

// Get the JWT secret from environment variables
const jwtSecret = process.env.JWT_SECRET;

// Middleware to authenticate requests using JWT
const authenticateJWT = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, return 401 (Unauthorized)
  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing!" });
  }

  try {
    // Verify the token using the JWT secret
    // This checks the token's integrity and expiration
    const decodedToken = jwt.verify(token, jwtSecret);

    // Find the user in the database using the ID from the decoded token
    // This step ensures that the token belongs to a valid, existing user
    const user = await User.findById(decodedToken.userId);

    // If no user found (e.g., user was deleted), return 404 (Not Found)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request
    // This makes user data available to subsequent middleware and route handlers
    req.user = user;

    // Call next middleware
    next();
  } catch (error) {
    // Handle JWT verification errors (e.g., invalid token, expired token)
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token!" });
  }
};

// Export the middleware for use in other parts of the application
export default authenticateJWT;