const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware.js");
const getStudentList = require("../controllers/getStudentList.js");
const addStudent = require("../controllers/addStudent.js")
const removeStudent = require("../controllers/removeStudent.js")


const router = express.Router();

router.get("/studentList/:mentor_id", authMiddleware, getStudentList);
router.post("/addStudent/:email/:mentor_id", authMiddleware, addStudent);
router.delete("/mentor/:mentor_id/student/:user_id", authMiddleware, removeStudent);

module.exports = router;