const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
  {
    complaint: {
      type: String,
      required: true,
    },
    complaintType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    district: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    proof: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Solved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("complaint", complaintSchema);
