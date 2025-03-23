const Mentor = require("../database/Schema/Mentor");
const User = require("../database/Schema/User");


const getStudentList = async (req, res) => {
     try {
         const { mentorId } = req.params?.mentor_id; // Extract mentor ID from request params
 
         if (!mentorId) {
             return res.status(400).json({ error: "Mentor ID is required" });
         }
 
         // Fetch mentor details and extract users array
         const mentor = await Mentor.findById(mentorId);
         if (!mentor) {
             return res.status(404).json({ error: "Mentor not found" });
         }
 
         // Fetch all students (users) from User collection
         const students = await User.find({ _id: { $in: mentor.users } });
 
         return res.status(200).json({ students });
     } catch (error) {
         console.error("Error fetching student list:", error);
         return res.status(500).json({ error: "Internal Server Error" });
     }
};




module.exports = getStudentList;