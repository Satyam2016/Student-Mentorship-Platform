const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const userInfo = require("../controllers/userInfo");


const router = express.Router();

router.get("/user/:userId", authMiddleware, userInfo);

module.exports = router;