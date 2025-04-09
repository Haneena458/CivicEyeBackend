const express = require("express");
const {
  viewAllUsers,
  viewUser,
  updateUser,
} = require("../controller/userController");

const router = express.Router();

router.get("/get-all-user", viewAllUsers);
router.get("/view-user/:id", viewUser); 
router.put("/update-user/:id", updateUser);

module.exports = router;
