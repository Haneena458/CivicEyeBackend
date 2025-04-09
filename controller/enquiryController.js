const Enquiry = require("../model/enquiryModel");

exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, message,enquiredBy } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEnquiry = new Enquiry({ name, email, message,enquiredBy });
    const savedEnquiry = await newEnquiry.save();

    return res
      .status(201)
      .json({ message: "Enquiry details submitted successfully", savedEnquiry });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.viewEnquiry = async (req, res) => {
  try {
    const enquiryList = await Enquiry.find();
    return res
      .status(200)
      .json({ message: "Enquiries fetched successfully", data: enquiryList });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updateEnquiry = async (req, res) => {
  try {
    const { message, reply } = req.body;
    const { id } = req.params;

    if (!id || !message || !reply) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { message, reply },
      { new: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    return res.status(200).json({ message: "Enquiry updated successfully", updatedEnquiry });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.viewReplyEnquiry = async (req, res) => {
  try {
    // const { id } = req.params;
    // if (!id) {
    //   return res.status(400).json({ message: "id not found" });
    // }

    const replyEnquiry = await Enquiry.find(); // ✅ Await the query!

    if (!replyEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    return res.status(200).json({
      message: "Reply fetched successfully",
      data: replyEnquiry,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

