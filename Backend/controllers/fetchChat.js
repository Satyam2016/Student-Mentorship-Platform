const mongoose = require("mongoose");
const Mentor = require("../database/Schema/Mentor");

const fetchChat = async (req, res) => {
    try {
        const { mentor_id, user_id } = req.params;

        // Convert user_id to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(user_id);

        // Find the mentor and populate the specific user's chat
        let mentor = await Mentor.findOne({ mentor_id });
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }

        // Find the chat for the given user
        let userChat = mentor.chats.find(chat => chat.user_id.equals(userObjectId)); 

        if (!userChat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        return res.status(200).json({ chat: userChat.messages });
    } catch (error) {
        console.error("Error fetching chat:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = fetchChat;
