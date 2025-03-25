const mongoose = require("mongoose");
const Mentor = require("../database/Schema/Mentor");
const User = require("../database/Schema/User");

const removeStudent = async (req, res) => {
    try {
        const { user_id, mentor_id } = req.params;

        if (!user_id || !mentor_id || !mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(mentor_id)) {
            return res.status(400).json({ error: "Valid User ID and Mentor ID are required" });
        }


        const mentor = await Mentor.findOne({mentor_id});
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }


        mentor.users = mentor.users.filter((id) => id.toString() !== user_id.toString());
        await mentor.save();

        return res.status(200).json({ message: "Student removed successfully" });
    } catch (error) {
        console.error("Error removing student:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = removeStudent;
