const user = require("../model/UserModel");


exports.viewAllUsers = async (req, res) => {
  try {
    const userList = await user.find();
    if (!userList) {
      return res.status(404).json({ message: "no users found" });
    }
    return res.status(200).json({ message: "all data viewed", data: userList });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

exports.viewUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id not found" });
    }
    const userData = await user.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "no user Data" });
    }
    return res.status(201).json({ message: "data found", data: userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      email,
      DOB,
      password,
      state,
      address,
      idProof,
      idNumber,
    } = req.body;
    const { id } = req.params;

    if (
      !name ||
      !phoneNumber ||
      !email ||
      !DOB ||
      !password ||
      !state ||
      !address ||
      !idProof ||
      !idNumber
    ) {
      return res.status(400).json({ message: "users Data not found" });
    }

    if (!id) {
      return res.status(400).json({ message: "id not found" });
    }

    const updateUser = await user.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "updated successfully", updateUser });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};


