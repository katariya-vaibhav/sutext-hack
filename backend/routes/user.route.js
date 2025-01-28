import { Router } from "express";
import {
  registerUser,
  deleteUser,
  getCorrentUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", verifyJWT, getCorrentUser);
router.delete("/:id", verifyJWT, deleteUser);

export default router;
