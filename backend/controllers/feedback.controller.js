import { Feedback } from "../model/feedback.model.js";

const createFeedback = async (req, res) => {
  try {
    const { feedback, department , username } = req.body;
    // const user = req.user._id;

    const newFeedback = new Feedback({
      feedback,
      user: username,
      department,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback created successfully",
      newFeedback,
    });
  } catch (error) {
    console.error("Error while creating the feedback:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error while getting the feedback:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "username email");
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error while getting all feedbacks:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getFeedbackByDepartment = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      department: req.params.department,
    }).populate("user", "username email");
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error while getting feedbacks by department:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }
    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting the feedback:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export {
  createFeedback,
  getFeedback,
  getAllFeedback,
  getFeedbackByDepartment,
  deleteFeedback,
};
