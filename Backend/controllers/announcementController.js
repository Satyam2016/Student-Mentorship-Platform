const Mentor = require("../database/Schema/Mentor");

// Create a new announcement
const createAnnouncement = async (req, res) => {
     try {
          const { mentor_id } = req.params;
          const { post, name } = req.body;

          if (!post) return res.status(400).json({ error: "Post content is required" });

          const mentor = await Mentor.findOne({ mentor_id });
          if (!mentor) return res.status(404).json({ error: "Mentor not found" });

          let date = new Date();
          let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
          let formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

          const newAnnouncement = { post,name,  date : formattedDate,time: formattedTime,  reply: [] };
          mentor.announcements.push(newAnnouncement);
          await mentor.save();

          res.status(201).json({ message: "Announcement created", announcement: newAnnouncement });
     } catch (error) {
          res.status(500).json({ error: "Failed to create announcement" });
     }
};



const getAnnouncements = async (req, res) => {
     try {
          console.log("Indisde fetch announcemnt");
          const { mentor_id } = req.params;
          const mentor = await Mentor.findOne({ mentor_id });
          let announcements=mentor.announcements;
          if (!mentor) return res.status(404).json({ error: "Mentor not found" });

          res.status(200).json(announcements || []); 
     } catch (error) {
          console.error("Error fetching announcements:", error);
          res.status(500).json({ error: "Failed to fetch announcements" });
     }
};


// Delete an announcement
const deleteAnnouncement = async (req, res) => {
     try {
          const { mentor_id, announcement_id } = req.params;
          const mentor = await Mentor.findOne({ mentor_id });

          if (!mentor) return res.status(404).json({ error: "Mentor not found" });

          mentor.announcements = mentor.announcements.filter(
               (announcement) => announcement._id.toString() !== announcement_id
          );

          await mentor.save();
          res.json({ message: "Announcement deleted" });
     } catch (error) {
          res.status(500).json({ error: "Failed to delete announcement" });
     }
};

module.exports = { createAnnouncement, getAnnouncements, deleteAnnouncement };
