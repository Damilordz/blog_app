// Import necessary models and libraries
import User from "../models/user.js";
import bcrypt from "bcryptjs"; // For hashing passwords
import jwt from "jsonwebtoken"; // For generating JWTs
import dotenv from "dotenv"; // For loading environment variables

// Load environment variables from .env file
dotenv.config();

// Get the JWT secret from environment variables
const jwtSecret = process.env.JWT_SECRET;

// Controller for user registration
export const registerUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, password } = req.body;

    // Normalize email to lowercase for consistency
    const normalizedEmail = email.toLowerCase();

    // Validate email format (basic check)
    const [localPart, domainPart] = normalizedEmail.split("@");
    if (
      !normalizedEmail ||
      localPart.length < 4 ||
      localPart.length !== normalizedEmail.length - domainPart.length - 1
    ) {
      return res.status(400).json({
        message: "Email must be at least 4 characters long",
      });
    }

    // Validate password length
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user in the database
    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate a JWT for the new user
    let token;
    try {
      token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        jwtSecret,
        { expiresIn: "1h" } // Token expires in 1 hour
      );
    } catch (jwtError) {
      console.error("Error generating JWT:", jwtError);
      return res.status(500).json({ message: "Error generating token" });
    }

    // Send success response with token and user details (excluding password)
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for user login
export const userLogin = async (req, res) => {
  try {
    // Extract login credentials from request body
    const { email, password } = req.body;

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Find the user by email
    const existingUser = await User.findOne({ email: normalizedEmail });

    // Check if the user exists
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT for the authenticated user
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        jwtSecret,
        { expiresIn: "1h" } // Token expires in 1 hour
      );
    } catch (jwtError) {
      console.error("Error generating JWT:", jwtError);
      return res.status(500).json({ message: "Error generating token" });
    }

    // Prepare user object (excluding password)
    const user = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };

    // Send success response with token and user details
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error login: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get the current authenticated user's details
export const getCurrentUser = async (req, res) => {
  try {
    // req.user is set by the authenticateJWT middleware (not shown here)
    const userId = req.user.id;
    
    // Find the user by ID, excluding the password field
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Send user details
    res.json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};