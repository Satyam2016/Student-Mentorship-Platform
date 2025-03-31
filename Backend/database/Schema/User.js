const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mentor_id: {type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "mentor", "admin"], required: true },
  img: {type : String},
  bio: {
    type: String
  }
});

module.exports = mongoose.model("User", UserSchema);
