const user = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
  const { name, phoneNumber, DOB, email, password } = req.body;
  try {
    if (!name || !phoneNumber || !DOB || !email || !password) {
      return res.status(400).json("all fields are required");
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "email already exist" });
    }

    console.log(phoneNumber);
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const type = email === "jane@mail.com" ? "admin" :"user"

    const newUser = new user({
      name,
      phoneNumber,
      DOB,
      email,
      password: hashedPassword,
      type:user.type
    });
    await newUser.save();
    return res.status(201).json({ message: "registered successfully" });
  } catch (error) {
    console.error("Error :", error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "you are not registered" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password do not match" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    return res.status(201).json({
      message: "login successfully",
      userName: existingUser.name,
      id:existingUser.id,
      token,
      type:existingUser.type
    });
  } catch (error) {
    console.error("Error ", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};




