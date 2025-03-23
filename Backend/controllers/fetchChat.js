const Mentor = require("../database/Schema/Mentor");

const fetchChat = async (req, res) => {
    try {
        const { mentorId, userId } = req.params;

        // Find the mentor
        let mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }

        // Find the chat for the given user
        let userChat = mentor.chats.find(chat => chat._id.toString() === userId);

        // If no chat exists, create an empty chat object
        if (!userChat) {
            const newChat = { _id: userId, messages: [] };
            mentor.chats.push(newChat);
            await mentor.save();
            userChat = newChat;
        }

        return res.status(200).json({ chat: userChat });
    } catch (error) {
        console.error("Error fetching chat:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = fetchChat;
