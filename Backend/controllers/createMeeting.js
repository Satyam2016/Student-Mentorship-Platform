const Mentor = require("../database/Schema/Mentor");

const createMeeting = async (req, res) => {
    try {
        console.log("inside api");
        const { mentor_id } = req.params;
        const { title, date, time, type, link } = req.body;

        // Validate input fields
        if (!title || !date || !time || !type || !link) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate Date Format
        const meetingDate = new Date(date);
        if (isNaN(meetingDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
        }

        // Find the mentor by _id (assuming mentor_id is the MongoDB _id)
        const mentor = await Mentor.findOne({mentor_id});
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }

        // Ensure the 'meeting' field is an array
        if (!mentor.meeting) {
            mentor.meeting = [];
        }

        // Create new meeting object
        const newMeeting = { title, date: meetingDate.toISOString(), time, type, link };

        // Add the meeting to the mentor's meeting array
        mentor.meeting.push(newMeeting);
        await mentor.save();

        return res.status(201).json({ message: "Meeting created successfully", meeting: newMeeting });
    } catch (error) {
        console.error("Error creating meeting:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = createMeeting;
