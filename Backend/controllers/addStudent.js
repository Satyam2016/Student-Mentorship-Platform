const mongoose = require("mongoose");
const Mentor = require("../database/Schema/Mentor");
const User = require("../database/Schema/User");

const addStudent = async (req, res) => {
    try {
        const { email } = req.params;  // Correct destructuring
        const { mentor_id } = req.params;

        if (!email || !mentor_id || !mongoose.Types.ObjectId.isValid(mentor_id)) {
            return res.status(400).json({ error: "Valid Email and Mentor ID are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the mentor by mentor_id field (assuming it's stored as a string)
        const mentor = await Mentor.findOne({ mentor_id });
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }

        // Check if user is already assigned to the mentor
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
