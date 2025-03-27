const Mentor = require("../database/Schema/Mentor");
const multer = require("multer");

// Multer Storage Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file"); // ✅ Ensure "file" matches frontend

const uploadFile = async (req, res) => {
    upload(req, res, async (err) => {
         if (err) return res.status(400).json({ message: "Error uploading file", error: err.message });
         console.log("upload file here");

        try {
            const { mentor_id } = req.params;
            if (!req.file) return res.status(400).json({ message: "No file uploaded" });

            const { originalname, buffer } = req.file;

            const mentor = await Mentor.findOne({ mentor_id });
            if (!mentor) return res.status(404).json({ message: "Mentor not found" });

            if (!mentor.material) mentor.material = [];
            mentor.material.push({ name: originalname, pdfData: buffer });

            await mentor.save();
            res.status(201).json({ message: "File uploaded successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error uploading file", error: error.message });
        }
    });
};

module.exports = uploadFile;
