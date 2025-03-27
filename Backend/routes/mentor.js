const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware.js");
const getStudentList = require("../controllers/getStudentList.js");
const addStudent = require("../controllers/addStudent.js")
const removeStudent = require("../controllers/removeStudent.js");
const createMeeting =require("../controllers/createMeeting.js");
const fetchMeeting = require("../controllers/fetchMeeting.js");
const fetchChat = require("../controllers/fetchChat.js");
const addChatMessage =require("../controllers/addChatMessage");
const { createAnnouncement, getAnnouncements, deleteAnnouncement } = require("../controllers/announcementController");
const { addReply } = require("../controllers/replyController");
const fetchFile = require("../controllers/fetchFile.js");
const uploadFile =require("../controllers/uploadFile.js");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const pdfDownload =require("../controllers/pdfDownload.js")


const router = express.Router();

router.get("/studentList/:mentor_id", authMiddleware, getStudentList);
router.post("/addStudent/:email/:mentor_id", authMiddleware, addStudent);
router.delete("/mentor/:mentor_id/student/:user_id", authMiddleware, removeStudent);
router.post("/createMeeting/:mentor_id",authMiddleware, createMeeting );
router.get("/fetchMeeting/:mentor_id",authMiddleware, fetchMeeting);
router.post("/addChatMessage",authMiddleware, addChatMessage);
router.get("/fetchChat/:mentor_id/:user_id",authMiddleware, fetchChat);

router.post("/createAnnouncement/:mentor_id", authMiddleware, createAnnouncement);
router.get("/fetchAnnouncement/:mentor_id", authMiddleware, getAnnouncements);
router.delete("/:mentor_id/:announcement_id", authMiddleware, deleteAnnouncement);
router.post("/addReply/:mentor_id/:announcement_id", authMiddleware, addReply);

router.post("/uploadFile/:mentor_id", authMiddleware, uploadFile);
router.get("/fetchFiles/:mentor_id",  authMiddleware, fetchFile);
router.get("/downloadFile/:mentor_id/:fileId",authMiddleware,  pdfDownload);

module.exports = router;