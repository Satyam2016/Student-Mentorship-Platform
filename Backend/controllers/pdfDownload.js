const Mentor = require("../database/Schema/Mentor");

const pdfDownload = async (req, res) => {
  try {
    const { fileId, mentor_id } = req.params;
    const mentor = await Mentor.findOne({ mentor_id });

    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const file = mentor.material.find((m) => m._id.toString() === fileId);
    if (!file) return res.status(404).json({ message: "File not found" });

    const isPreview = req.query.preview === "true"; // Check if it's a preview request

    // If preview, send as a PDF response
    if (isPreview) {
      res.setHeader("Content-Type", "application/pdf");
      return res.send(file.pdfData);
    }

    // If download, set headers for download
    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file.name}"`,
    });

    res.send(file.pdfData);
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ message: "Error downloading file", error: error.message });
  }
};

module.exports = pdfDownload;
