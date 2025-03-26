const mongoose = require("mongoose");
const Mentor = require("../database/Schema/Mentor");

const addChatMessage = async (req, res) => {
  try {
    const { mentor_id, user_id, userType, msg } = req.body;

    if (!mentor_id || !user_id || !userType || !msg) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Convert user_id to ObjectId for proper comparison
    const userObjectId = new mongoose.Types.ObjectId(user_id);

    // Find the mentor
    const mentor = await Mentor.findOne({ mentor_id });

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Find chat for the user
    let chat = mentor.chats.find(c => c.user_id.equals(userObjectId)); // Corrected comparison

    if (!chat) {
      // Create a new chat if not found
      chat = { user_id: userObjectId, messages: [] }; // Store user_id as ObjectId
      mentor.chats.push(chat);
    }

    // Add new message
    chat.messages.push({ userType, msg });

    // Save changes
    await mentor.save();

    res.status(200).json({ message: "Chat message added successfully", chat });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = addChatMessage;
