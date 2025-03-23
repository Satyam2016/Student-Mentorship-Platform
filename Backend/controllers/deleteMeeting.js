const Mentor = require("../database/Schema/Mentor");
const User = require("../database/Schema/User");


const deleteMeeting = async (req, res) => {
     try {
         const { mentorId, meetingId } = req.params;
 
         // Find the mentor and remove the meeting from the array
         const mentor = await Mentor.findByIdAndUpdate(
             mentorId,
             { $pull: { meeting: { _id: meetingId } } }, // Removes the meeting with the given ID
             { new: true }
         );
 
         if (!mentor) {
             return res.status(404).json({ error: "Mentor not found" });
         }
 
         return res.status(200).json({ message: "Meeting deleted successfully", meetings: mentor.meeting });
     } catch (error) {
         console.error("Error deleting meeting:", error);
         return res.status(500).json({ error: "Internal Server Error" });
     }
 };
 
 

module.exports = deleteMeeting;