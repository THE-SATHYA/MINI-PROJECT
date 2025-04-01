import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onResult }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError("");
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select an audio file.");
            return;
        }
        
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("https://backend-wx8s.onrender.com", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            onResult(response.data);
        } catch (err) {
            setError("Error uploading file. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="upload-container">
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload & Predict"}
            </button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default FileUpload;