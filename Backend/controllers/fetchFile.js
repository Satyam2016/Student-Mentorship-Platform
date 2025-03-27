const Mentor = require("../database/Schema/Mentor");

const fetchFile = async (req, res) => {
     try {
         const { mentor_id } = req.params;
 
         const mentor = await Mentor.findOne({mentor_id});
         if (!mentor) return res.status(404).json({ message: "Mentor not found" });
 
         const materials = mentor.material.map(({ _id, name, pdfData }) => ({ _id, name , pdfData}));
         res.status(200).json({ materials });
     } catch (error) {
         res.status(500).json({ message: "Error fetching files", error: error.message });
     }
 };
 

module.exports = fetchFile;
