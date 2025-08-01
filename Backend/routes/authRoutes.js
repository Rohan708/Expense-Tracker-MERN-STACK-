const express = require("express");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");

// Import the protect middleware
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Added the protect middleware to this route
router.get("/getUser", protect, getUserInfo);

module.exports = router;

