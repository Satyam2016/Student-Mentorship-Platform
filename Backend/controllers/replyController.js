const Mentor = require("../database/Schema/Mentor");

// Add a reply to an announcement
const addReply = async (req, res) => {
    try {
        console.log("Inside Reply Announcement API");

        const { mentor_id, announcement_id } = req.params;
        const { msg , name} = req.body;

        if (!msg.trim()) return res.status(400).json({ error: "Reply message is required" });

        // Find mentor by mentor_id
        const mentor = await Mentor.findOne({ mentor_id });
        if (!mentor) return res.status(404).json({ error: "Mentor not found" });

        // Find announcement by ID (use .find(), not .filter())
        const announcement = mentor.announcements.find(a => a._id.toString() == announcement_id);
        if (!announcement) return res.status(404).json({ error: "Announcement not found" });

        // Generate formatted date & time
        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
        const formattedTime = now.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS

        // Create new reply object
        const newReply = { msg, time: formattedTime, date: formattedDate, name };

        // Push reply into the found announcement
        announcement.reply.push(newReply);

        // Save updated mentor document
        await mentor.save();

        res.status(201).json({ message: "Reply added", replies: announcement.reply });
    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ error: "Failed to add reply" });
    }
};

module.exports = { addReply };
