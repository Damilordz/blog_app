// Import necessary libraries
import mongoose from "mongoose"; // ODM for MongoDB
import express from "express"; // Web framework for Node.js
import cors from "cors"; // Middleware for enabling CORS
import bodyParser from "body-parser"; // Middleware for parsing JSON request bodies
import "dotenv/config"; // Load environment variables from .env file

// Import routers and middleware
import userRouter from "./router/userRoutes.js";
import postRouter from "./router/postRoutes.js";
import authenticateJWT from "./middleware/authenticateJWT.js";

// Create an Express application
const app = express();

// Set the port, use environment variable or default to 8000
const PORT = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    // origin: "https://blog-app-frontend-green.vercel.app", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// MongoDB connection setup
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB_NAME || "blog_app";

// MongoDB Atlas connection URI
const uri = `mongodb+srv://${username}:${password}@cluster0.1uz5agr.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB client options
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// Connect to MongoDB Atlas cluster
mongoose.connect(uri, clientOptions).then(
  () => {
    console.log("Successfully connected to the database!");
  },
  (err) => {
    console.log("Could not connect to the database..." + err);
  }
);

// Simple welcome route
app.get("/welcome", (req, res) => {
  res.send("<h1>Welcome to Backend</h1>");
});

// Test route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Use combined routes
app.use("/api", userRouter); // User routes (login, register, etc.)
app.use("/api", authenticateJWT, postRouter); // Post routes (protected by JWT)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
