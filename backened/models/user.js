// Import the mongoose library
import mongoose from "mongoose";

// Destructure Schema and model from mongoose
const { Schema, model } = mongoose;

// Define the schema for user registration
const UserSchema = new Schema({
  // Name field: required string
  name: {
    type: String,
    required: true,
  },
  // Email field: required string, must be unique
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique across all users
  },
  // Password field: required string
  password: {
    type: String,
    required: true,
  },
});

// Create the User model using the UserSchema
const User = model("User", UserSchema);

// Export the User model for use in other parts of the application
export default User;