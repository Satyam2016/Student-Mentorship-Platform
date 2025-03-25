
const mongoose = require('mongoose');
const Mentor = require('../database/Schema/Mentor')
const User = require('../database/Schema/User')

const getStudentList = async (req, res) => {
    try {
        const id  = req.params.mentor_id; 
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Mentor ID' });
        }
        
        const mentor = await Mentor.findOne({mentor_id : id});
        if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found' });
        }
        const users=mentor.users;
        const mentees = await User.find({ _id: { $in: users } });
        console.log("mentees id", mentees)
        console.log("mentor_id....", id)

        res.json(mentees);
    } catch (error) {
        console.error('Error fetching student list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getStudentList;