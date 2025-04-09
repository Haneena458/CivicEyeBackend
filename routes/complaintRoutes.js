const express = require("express");

const upload = require("../confiq/multer");
const { createComplaint, viewAllComplaint, viewMyComplaint, updateComplaint, viewComplaint } = require("../controller/complaintController");

const router = express.Router();

router.post("/create-complaint", upload.single("proof"), createComplaint);
router.get("/get-all-complaint",viewAllComplaint)
router.get("/get-my-complaint/:id",viewMyComplaint)
router.put("/update-complaint/:id", updateComplaint);
router.get("/get-complaint/:id",viewComplaint)

module.exports = router;
