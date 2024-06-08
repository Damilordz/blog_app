// Import the mongoose library
import mongoose from "mongoose";

// Destructure Schema and model from mongoose
const { Schema, model } = mongoose;

// Define the schema for the Post model
const postSchema = new Schema(
  {
    // Title field: required string
    title: {
      type: String,
      required: true,
    },
    // Content field: required string
    content: {
      type: String,
      required: true,
    },
    // Author field: references the User model by ObjectId
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    // CreatedAt field: stores the creation date, defaults to current date
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // UpdatedAt field: stores the last update date, defaults to current date
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    // IsDraft field: boolean to indicate if the post is a draft, defaults to false
    isDraft: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically add and manage createdAt and updatedAt fields
);

// Create the Post model using the postSchema
const Post = model("Post", postSchema);

// Export the Post model for use in other parts of the application
export default Post;