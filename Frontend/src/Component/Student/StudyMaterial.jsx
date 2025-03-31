import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Download, Eye, AlertCircle } from "lucide-react";

const mentor_id = localStorage.getItem("mentor_id");
const token = localStorage.getItem("token");

const StudyMaterial = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch uploaded files
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/mentor/fetchFiles/${mentor_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploadedFiles(response.data.materials || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to load study materials. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Preview PDF
  const handlePreview = async (fileId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/mentor/downloadFile/${mentor_id}/${fileId}?preview=true`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const fileUrl = window.URL.createObjectURL(response.data);
      window.open(fileUrl, "_blank");
    } catch (error) {
      console.error("Error previewing file:", error);
      alert("Unable to preview file.");
    }
  };

  // Download File
  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/mentor/downloadFile/${mentor_id}/${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Download failed. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📖 Study Materials</h2>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-6">
          <span className="loader"></span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 bg-red-100 text-red-600 p-4 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Uploaded Files */}
      {!loading && !error && uploadedFiles.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📁 Available Materials</h3>
          <ul className="space-y-4">
            {uploadedFiles.map((file) => (
              <li key={file._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-md hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-green-500" />
                  <span className="text-md text-gray-700 truncate max-w-xs">{file.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePreview(file._id)}
                    className="text-purple-500 hover:text-purple-700 transition"
                    title="Preview"
                  >
                    <Eye className="h-6 w-6" />
                  </button>

                  <button
                    onClick={() => handleDownload(file._id, file.name)}
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Download"
                  >
                    <Download className="h-6 w-6" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-gray-600 mt-6">No study materials available.</p>
        )
      )}

      {/* CSS Loader */}
      <style>
        {`
          .loader {
            width: 30px;
            height: 30px;
            border: 4px solid #ccc;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default StudyMaterial;
