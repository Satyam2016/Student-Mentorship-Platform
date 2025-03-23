const Mentor = require("../database/Schema/Mentor");
const User = require("../database/Schema/User");


const fetchMeeting = async (req, res) => {
     try {
         const { mentorId } = req.params.mentor_id;
 
         // Find the mentor by ID and get only the 'meeting' field
         const mentor = await Mentor.findById(mentorId).select("meeting");
 
         if (!mentor) {
             return res.status(404).json({ error: "Mentor not found" });
         }
 
         return res.status(200).json({ meetings: mentor.meeting });
     } catch (error) {
         console.error("Error fetching meetings:", error);
         return res.status(500).json({ error: "Internal Server Error" });
     }
};
 
module.exports = fetchMeeting;