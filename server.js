const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "*", // Change to a specific frontend URL for security
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json());

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const complaintRoutes = require("./routes/complaintRoutes")
const feedbackRoutes = require("./routes/feedbackRoutes")
const enquiryRoutes = require("./routes/enquiryRoutes")

app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/complaint",complaintRoutes)
app.use("/feedback",feedbackRoutes)
app.use("/enquiry",enquiryRoutes)

app.use("/uploads", express.static("uploads"));


const mongoURL = process.env.DB_URL;
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("✅ mongoDB connected");
  })
  .catch((error) => {
    console.log("❌ connection error");
  });

const PORT = process.env.PORT || 6001;
app.listen(PORT,()=>{
    console.log(`server run at ${PORT}`);
})
