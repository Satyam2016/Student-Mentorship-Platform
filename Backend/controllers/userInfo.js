const User = require("../database/Schema/User");
const mongoose = require("mongoose");

const userInfo = async (req, res) => {
    try {
        console.log("inside userInfo")
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(new mongoose.Types.ObjectId(userId));

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error: error.message });
    }
};

module.exports = userInfo;
