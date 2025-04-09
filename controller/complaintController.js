const Complaint = require("../model/complaintModel");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

exports.createComplaint = async (req, res) => {
  try {
    const {
      complaint,
      complaintType,
      description,
      district,
      location,
      date,
      time,
      createdBy,
    } = req.body;

    if (!complaintType || !complaint || !location || !date) {
      return res.status(400).json({ message: "fields are required" });
    }
    if (!req.file) {
      return res.status(400).json("file not found");
    }

    const userData = new Complaint({
      complaint,
      complaintType,
      description,
      district,
      location,
      date,
      time,
      createdBy,
      proof: `/uploads/${req.file.filename}`,
    });
    const savedData = await userData.save();
    return res
      .status(201)
      .json({ message: "uploaded successfully", savedData });
  } catch (error) {
    console.log(error);
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
    }
    return res.status(500).json("error occured");
  }
};

exports.viewAllComplaint = async (req, res) => {
  try {
    const userList = await Complaint.find();
    if (!userList) {
      return res.status(404).json({ message: "no user" });
    }
    return res
      .status(200)
      .json({ message: "user list fetched successfully", data: userList });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

exports.viewMyComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Complaint ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Complaint ID format" });
    }

    const myComplaint = await Complaint.find({ createdBy: id });
    if (!myComplaint) {
      return res
        .status(404)
        .json({ message: "No complaint found with this ID" });
    }

    return res.status(200).json({
      message: "complaint fetched successfully",
      data: myComplaint,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    if (!status) {
      return res.status(400).json({ message: " fields are required" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedComplaint) {
      return res.status(400).json({ message: "complaint could'nt updated" });
    }
    return res
      .status(200)
      .json({ message: "updated successfully", updatedComplaint });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

exports.viewComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const complaintList = await Complaint.findOne({ _id: id });

    if (!complaintList) {
      return res.status(404).json({ message: "no complaints" });
    }
    return res
      .status(200)
      .json({ message: "user list fetched successfully", data: complaintList });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};
