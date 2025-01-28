import { Router } from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedback,
  getFeedbackByDepartment,
  deleteFeedback,
} from "../controllers/feedback.controller.js";
// import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/create-feedback", createFeedback);
router.get("/get-feedback/:id", getFeedback);
router.get("/get-feedbacks", getAllFeedback);
router.get("/get-feedback-by-dept", getFeedbackByDepartment);
router.delete("/deleteFeedback/:id", deleteFeedback);

export default router;
