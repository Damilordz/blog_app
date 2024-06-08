// Import the Post model
import Post from "../models/post.js";

// Controller to create a new blog post
export const createPost = async (req, res) => {
  try {
    // Extract title and content from request body
    const { title, content } = req.body;
    
    // Get author ID from the authenticated user (set by middleware)
    const author = req.user._id;
    
    // Create a new Post document
    const newPost = new Post({ title, content, author });
    
    // Save the new post to the database
    await newPost.save();
    
    // Respond with the created post and 201 (Created) status
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all blog posts
export const getAllPosts = async (req, res) => {
  try {
    // Find all posts, populate author details, and sort by creation date
    const posts = await Post.find()
      .populate("author", "name email") // Populate author field with user's name and email
      .sort({ createdAt: -1 }); // Sort posts by creation date in descending order (newest first)
    
    // Send the posts as JSON response
    res.json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get a single blog post by ID
export const getPostById = async (req, res) => {
  try {
    // Find post by ID and populate author details
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );
    
    // If no post found, return 404 (Not Found)
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // Send the post as JSON response
    res.json(post);
  } catch (error) {
    console.error("Error getting post by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to update a blog post
export const updatePost = async (req, res) => {
  try {
    // Extract title and content from request body
    const { title, content } = req.body;
    
    // Find post by ID and update, also updating the updatedAt timestamp
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: Date.now() },
      { new: true } // Return the updated document
    );
    
    // If no post found, return 404 (Not Found)
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // Send the updated post as JSON response
    res.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to delete a blog post
export const deletePost = async (req, res) => {
  try {
    // Find post by ID and delete
    const post = await Post.findByIdAndDelete(req.params.id);
    
    // If no post found, return 404 (Not Found)
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // Send success message
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};