const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware.js");
const getStudentList = require("../controllers/getStudentList.js");
const addStudent = require("../controllers/addStudent.js")


const router = express.Router();

router.get("/studentList/:mentor_id", authMiddleware, roleMiddleware("mentor"), getStudentList);
router.get("/addStudent/:email/:mentor_id", authMiddleware, roleMiddleware("mentor"), addStudent);

module.exports = router;