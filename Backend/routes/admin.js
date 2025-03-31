const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const allUsers =require("../controllers/allUsers")
const assignMentor = require("../controllers/assignMentor");


const router = express.Router();


router.get("/allUser/:role", authMiddleware, allUsers );
router.post("/assign-mentor", authMiddleware, assignMentor);

module.exports = router;
