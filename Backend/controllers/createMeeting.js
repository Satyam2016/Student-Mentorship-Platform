const Mentor = require("../database/Schema/Mentor");
const User = require("../database/Schema/User");


const createMeeting = async (req, res) => {
     try {
         const { mentorId } = req.params.mentor_id;
         const { title, date, time, type, link } = req.body;
 
         // Validate input fields
         if (!title || !date || !time || !type || !link) {
             return res.status(400).json({ error: "All fields are required" });
         }
 
         // Find the mentor by ID
         const mentor = await Mentor.findById(mentorId);
         if (!mentor) {
             return res.status(404).json({ error: "Mentor not found" });
         }
 
         // Create new meeting object
         const newMeeting = { title, date, time, type, link };
 
         // Add the meeting to the mentor's meeting array
         mentor.meeting.push(newMeeting);
         await mentor.save();
 
         return res.status(201).json({ message: "Meeting created successfully", meeting: newMeeting });
     } catch (error) {
         console.error("Error creating meeting:", error);
         return res.status(500).json({ error: "Internal Server Error" });
     }
 };
 
 

module.exports = createMeeting;