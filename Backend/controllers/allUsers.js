const User = require("../database/Schema/User");

const allUsers = async (req, res) => {
    try {
        const role = req.params.role;

        // Fetch users based on role
        const users = await User.find({ role });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

module.exports = allUsers;
