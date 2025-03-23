import React, { useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Material = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-gray-200 transition-all duration-300">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">📂 Upload Documents</h2>

      {/* Drag & Drop or Click to Upload */}
      <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition">
        <Upload className="h-12 w-12 text-blue-500 animate-bounce" />
        <span className="text-gray-700 text-sm mt-2">Click or Drag & Drop to upload</span>
        <input
          type="file"
          className="hidden"
          multiple
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
        />
      </label>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="mt-5">
          <h3 className="text-md font-semibold text-gray-800">Uploaded Files</h3>
          <ul className="mt-3 space-y-3">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-gray-50 shadow-md hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-500" />
                  <span className="text-md text-gray-700 truncate max-w-xs">{file.name}</span>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <X className="h-6 w-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && (
        <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg py-3 rounded-lg">
          🚀 Upload Files
        </Button>
      )}
    </div>
  );
};

export default Material;
