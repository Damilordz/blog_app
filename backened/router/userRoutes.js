import { Router } from "express";
import * as userController from "../controllers/userController.js";
import authenticateJWT from "../middleware/authenticateJWT.js";

const router = Router();

// Route to handle user registration
router.post("/register", userController.registerUser);
router.post("/login", userController.userLogin);
router.get("/current-user", authenticateJWT, userController.getCurrentUser);

export default router;
