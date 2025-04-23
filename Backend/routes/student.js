const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const userInfo = require("../controllers/userInfo");
const updateUserInfo = require("../controllers/updateUserInfo")


const router = express.Router();

router.get("/user/:userId", authMiddleware, userInfo);
router.put("/user/:userId", authMiddleware,  updateUserInfo);

module.exports = router;