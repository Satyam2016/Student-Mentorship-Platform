const User = require("../database/Schema/User");
const Mentor = require("../database/Schema/Mentor");
const mongoose = require("mongoose");

const assignMentor = async (req, res) => {
    try {
        
        const { studentId, mentorId } = req.body;

        if (!studentId || !mentorId) {
            return res.status(400).json({ message: "Student ID and Mentor ID are required." });
        }

        if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(mentorId)) {
            return res.status(400).json({ message: "Invalid ID format." });
        }

        // Check if student exists
        const student = await User.findById(studentId);
        if (!student || student.role !== "student") {
            return res.status(404).json({ message: "Student not found." });
        }

        // Check if mentor exists
        const mentor = await User.findById(mentorId);
        if (!mentor || mentor.role !== "mentor") {
            return res.status(404).json({ message: "Mentor not found." });
        }
        
        // Assign mentor to student
        student.mentor_id = mentorId;
        await student.save();
        
        console.log("here")
        // Update Mentor Model: Add student to mentor's `users` array
        const updatedMentor = await Mentor.findOneAndUpdate(
            { mentor_id: mentorId },
            { $addToSet: { users: studentId } }, // Ensure no duplicate students
            { new: true, upsert: true } // Create entry if not exists
        );

        res.status(200).json({ message: "Mentor assigned successfully!", student, mentorData: updatedMentor });
    } catch (error) {
        res.status(500).json({ message: "Error assigning mentor", error: error.message });
    }
};

module.exports = assignMentor;
