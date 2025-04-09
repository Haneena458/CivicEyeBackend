const Feedback = require("../model/feedbackModel");
require("../model/UserModel");

exports.createFeedback = async (req, res) => {
  try {
    const { feedback, createdBy } = req.body;

    if (!feedback || !createdBy) {
      return res.status(400).json({ message: "Feedback and user ID are required" });
    }

    const newFeedback = new Feedback({ feedback, createdBy });
    const savedFeedback = await newFeedback.save();

    return res.status(201).json({
      message: "Feedback submitted successfully",
      savedFeedback,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.viewFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    if (!feedbackList || feedbackList.length === 0) {
      return res.status(404).json({ message: "No feedbacks found" });
    }

    return res.status(200).json({
      message: "Feedbacks fetched successfully",
      data: feedbackList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.updateFeedback = async (req, res) => {
  try {
    const { feedback, status } = req.body;
    const { id } = req.params;

    if (!feedback || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { feedback, status },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(400).json({ message: "Feedback couldn't be updated" });
    }

    return res
      .status(200)
      .json({ message: "Updated successfully", data: updatedFeedback });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

