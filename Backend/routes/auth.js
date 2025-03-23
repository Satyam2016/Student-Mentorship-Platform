const express = require("express");
const {registerUser, loginUser}= require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware.js");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login",  loginUser);

// Protected route example (only accessible by authenticated users)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Mentor-only route


// Student-only route
router.get("/student/dashboard", authMiddleware, roleMiddleware("student"), (req, res) => {
  res.json({ message: "Welcome, Student!" });
});

module.exports = router;
