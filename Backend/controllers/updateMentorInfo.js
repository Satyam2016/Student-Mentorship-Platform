const User = require("../database/Schema/User");
const mongoose = require("mongoose");

const updateMentorInfo = async (req, res) => {
     try {
          const { id } = req.params;
          const { phone, department, designation, experience, bio } = req.body;
      
          const updatedMentor = await User.findByIdAndUpdate(
            id,
            { phone, department, designation, experience, bio },
            { new: true, runValidators: true }
          );
      
          if (!updatedMentor) {
            return res.status(404).json({ message: "Mentor not found" });
          }
      
          res.json(updatedMentor);
        } catch (error) {
          console.error("PUT /user/:id error:", error);
          res.status(500).json({ message: "Server error" });
        }
};

module.exports = updateMentorInfo;
