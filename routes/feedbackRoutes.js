const express = require('express')
const { createFeedback, viewFeedback, updateFeedback } = require('../controller/feedbackController')

const router = express.Router()

router.post("/create-feedback",createFeedback)
router.get("/get-feedback",viewFeedback)
router.put("/update-feedback/:id",updateFeedback)

module.exports = router