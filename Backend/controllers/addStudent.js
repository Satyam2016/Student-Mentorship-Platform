const Mentor = require("../database/Schema/Mentor");
const User = require("../database/Schema/User");


const addStudent = async (req, res) => {
     try {
         const { email } = req.body;
         const { mentorId } = req.params.mentor_id;
 
         if (!email || !mentorId) {
             return res.status(400).json({ error: "Email and Mentor ID are required" });
         }
 
         // Find the user by email
         const user = await User.findOne({ email });
         if (!user) {
             return res.status(404).json({ error: "User not found" });
         }
 
         // Find the mentor by ID
         const mentor = await Mentor.findById(mentorId);
         if (!mentor) {
             return res.status(404).json({ error: "Mentor not found" });
         }
 
         // Check if user is already in the mentor's list
         if (mentor.users.includes(user._id)) {
             return res.status(400).json({ error: "User already added to this mentor" });
         }
 
         // Add user to the mentor's users list
         mentor.users.push(user._id);
         await mentor.save();
 
         return res.status(200).json({ message: "Student added successfully", student: user });
     } catch (error) {
         console.error("Error adding student:", error);
         return res.status(500).json({ error: "Internal Server Error" });
     }
 };


module.exports = addStudent;