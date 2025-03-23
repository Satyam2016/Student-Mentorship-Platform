const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
     user_id: { type: String, required: true }, // ID of the user in the chat
     messages: [
          {
               userType: { type: String, enum: ["mentor", "student"], required: true }, // Sender type
               msg: { type: String, required: true } // Message content
          }
     ]
});

const replySchema = new mongoose.Schema({
     
     time: { type: String, required: true },
     date: { type: String, required: true },
     msg: { type: String, required: true }
});

const announcementSchema = new mongoose.Schema({
     post: { type: String, required: true },
     reply: [replySchema]
});

const materialSchema = new mongoose.Schema({
     name: { type: String, required: true },
     pdfData: { type: Buffer, required: true }
});

const meetingSchema = new mongoose.Schema({
     title: { type: String, required: true },
     date: { type: String, required: true },
     time: { type: String, required: true },
     type: { type: String, required: true },
     link: { type: String, required: true }
});
const mentorSchema = new mongoose.Schema({
     mentor_id: { type: String, required: true },
     users: [{ type: String, required: true }],
     chats: [chatSchema],
     announcements: [announcementSchema],
     material: [materialSchema],
     meeting: [meetingSchema]
});

const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;
