const User = require("../database/Schema/User");
const mongoose = require("mongoose");

const updateUserInfo = async (req, res) => {
     const { userId } = req.params;

     try {
       // Only update the allowed fields
       const {
         name,
         phone,
         branch,
         year,
         cgpa,
         dob,
         bio
       } = req.body;
   
       // Find and update the student
       const updatedUser = await User.findByIdAndUpdate(
         userId,
         {
           name,
           phone,
           branch,
           year,
           cgpa,
           dob,
           bio
         },
         { new: true }
       );
   
       if (!updatedUser) {
         return res.status(404).json({ message: "Student not found" });
       }
   
       res.json(updatedUser);
     } catch (error) {
       console.error("Error updating student:", error);
       res.status(500).json({ message: "Server Error" });
     }
};

module.exports = updateUserInfo;
