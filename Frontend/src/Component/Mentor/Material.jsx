import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, X, FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const mentor_id = localStorage.getItem("id");
const token = localStorage.getItem("token");

const Material = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [previewId, setPreviewId] = useState("");

  // Fetch uploaded files
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/mentor/fetchFiles/${mentor_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUploadedFiles(response.data.materials || []);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };

  // Remove file locally
  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Upload files to backend
  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      await axios.post(`http://localhost:5000/api/mentor/uploadFile/${mentor_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setFiles([]);
      fetchFiles(); // Refresh files after upload
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  // Preview PDF
  const handlePreview = async (pdfData, fileId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/mentor/downloadFile/${mentor_id}/${fileId}?preview=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/pdf",
          },
          responseType: "blob",
        }
      );
  
      const fileUrl = window.URL.createObjectURL(response.data);
      
      // Open in new tab
      window.open(fileUrl, "_blank");
    } catch (error) {
      console.error("Error previewing file:", error);
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
    }
  };
  

  return (
    <div className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-gray-200 transition-all duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">📂 Upload Documents</h2>

      {/* Upload Input */}
      <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition">
        <Upload className="h-12 w-12 text-blue-500 animate-bounce" />
        <span className="text-gray-700 text-sm mt-2">Click or Drag & Drop to upload</span>
        <input type="file" className="hidden" multiple onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
      </label>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-5">
          <h3 className="text-md font-semibold text-gray-800">Selected Files</h3>
          <ul className="mt-3 space-y-3">
            {files.map((file, index) => (
              
              <li key={index} className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-gray-50 shadow-md hover:bg-gray-100 transition">
                <FileText className="h-6 w-6 text-blue-500" />
                <span className="text-md text-gray-700 truncate max-w-xs">{file.name}</span>
                <button onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-700 transition">
                  <X className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <Button onClick={handleUpload} disabled={loading} className="w-full mt-6 bg-blue-500 text-white shadow-lg py-3 rounded-lg">
          {loading ? "Uploading..." : "🚀 Upload Files"}
        </Button>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-md font-semibold text-gray-800">📁 Uploaded Files</h3>
          <ul className="mt-3 space-y-3">
            {uploadedFiles.map((file) => (
              <li key={file._id} className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-gray-50 shadow-md hover:bg-gray-100 transition">
                <FileText className="h-6 w-6 text-green-500" />
                <div>
                  <span className="text-md text-gray-700 truncate max-w-xs">{file.name}</span>
                
                </div>
             
                  <button onClick={() => handlePreview(file.pdfData, file._id)} className="text-purple-500 hover:text-purple-700 transition">
                    <Eye className="h-6 w-6" />
                  </button>
              
                  <button onClick={() => handleDownload(file._id, file.name)} className="text-blue-500 hover:text-blue-700 transition">
                    <Download className="h-6 w-6" />
                  </button>
        
                
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview Modal for PDFs */}
      {previewFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl relative">
            <button onClick={() => setPreviewFile(null)} className="absolute top-4 right-4 text-red-500">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-lg font-semibold text-gray-800">{previewName}</h3>
            <p className="text-sm text-gray-500 mb-3">ID: {previewId}</p>
            <iframe src={previewFile} className="w-full h-[500px]"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Material;
