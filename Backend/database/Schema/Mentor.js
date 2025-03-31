const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
     user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
     messages: [
          {
               userType: { type: String, enum: ["mentor", "student"], required: true },
               msg: { type: String, required: true }
          }
     ]
});

const replySchema = new mongoose.Schema({
     time: { type: String, required: true },
     date: { type: String, required: true },
     msg: { type: String, required: true },
     name: {type: String }
});

const announcementSchema = new mongoose.Schema({
     post: { type: String, required: true },
     name: { type: String},
     date: { type: String },
     time: { type: String },
     reply: [replySchema]
});

const materialSchema = new mongoose.Schema({
     name: { type: String, required: true },
     pdfData: { type: Buffer, required: true }
});

const meetingSchema = new mongoose.Schema({
     title: { type: String, required: true },
     date: { type: String, required: true },  // Use Date type instead of String
     time: { type: String, required: true },
     type: { type: String, required: true },
     link: { type: String, required: true }
});

const mentorSchema = new mongoose.Schema({
     mentor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
     users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference to Users
     chats: [chatSchema],
     announcements: [announcementSchema],
     material: [materialSchema],
     meeting: [meetingSchema]
}, { timestamps: true }); // Auto add createdAt & updatedAt fields

const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;
