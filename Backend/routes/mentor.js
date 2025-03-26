const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware.js");
const getStudentList = require("../controllers/getStudentList.js");
const addStudent = require("../controllers/addStudent.js")
const removeStudent = require("../controllers/removeStudent.js");
const createMeeting =require("../controllers/createMeeting.js");
const fetchMeeting = require("../controllers/fetchMeeting.js");
const fetchChat = require("../controllers/fetchChat.js");
const addChatMessage =require("../controllers/addChatMessage")


const router = express.Router();

router.get("/studentList/:mentor_id", authMiddleware, getStudentList);
router.post("/addStudent/:email/:mentor_id", authMiddleware, addStudent);
router.delete("/mentor/:mentor_id/student/:user_id", authMiddleware, removeStudent);
router.post("/createMeeting/:mentor_id",authMiddleware, createMeeting );
router.get("/fetchMeeting/:mentor_id",authMiddleware, fetchMeeting);
router.post("/addChatMessage",authMiddleware, addChatMessage);
router.get("/fetchChat/:mentor_id/:user_id",authMiddleware, fetchChat);

module.exports = router;