import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import authenticateJWT from "../middleware/authenticateJWT.js";

const router = Router();

// Public routes
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);

// Protected routes (require authentication)
router.post("/posts", authenticateJWT, createPost);
router.put("/posts/:id", authenticateJWT, updatePost);
router.delete("/posts/:id", authenticateJWT, deletePost);

export default router;
