import React, { useState } from "react";
import axios from "axios";
import api from "../api";

function OpenAPIUploader() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/upload-openapi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus("File uploaded successfully! Go to /docs to view.");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      setStatus("Upload failed. Check file type and server log.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Upload OpenAPI JSON File</h1>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Upload
      </button>
      <div className="mt-2 text-sm">{status}</div>
    </div>
  );
}

export default OpenAPIUploader;
