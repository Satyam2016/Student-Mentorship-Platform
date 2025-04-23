const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mentor_id: {type: String },
  name: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'mentor', 'admin'],
    required: true,
  },

  // Common Fields
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  },

  // Mentee-Specific Fields
  branch: {
    type: String,
  },
  year: {
    type: String,
   
  },
  cgpa: {
    type: Number,
    
  },
  dob: {
    type: Date,
    
  },

  // Mentor-Specific Fields
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
  experience: {
    type: String,
   
  }
});

module.exports = mongoose.model("User", UserSchema);
