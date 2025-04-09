const express = require("express")
const { createEnquiry, viewEnquiry, updateEnquiry, getEnquiryByEmail, viewReplyEnquiry } = require("../controller/enquiryController")

const router = express.Router()


router.post("/create-enquiry",createEnquiry)
router.get("/get-enquiry",viewEnquiry)
router.put("/update-enquiry/:id",updateEnquiry)
router.get("/get-reply-enquiry",viewReplyEnquiry)

module.exports = router