import { Router } from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedback,
  getFeedbackByDepartment,
  deleteFeedback,
} from "../controllers/feedback.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/create-feedback", verifyJWT, createFeedback);
router.get("/get-feedback/:id", verifyJWT, getFeedback);
router.get("/get-feedbacks", verifyJWT, getAllFeedback);
router.get("/get-feedback-by-dept", verifyJWT, getFeedbackByDepartment);
router.delete("/deleteFeedback/:id", verifyJWT, deleteFeedback);

export default router;
