import React from "react";

const ResultDisplay = ({ result }) => {
    if (!result) return null;

    return (
        <div className="result-container">
            <h3>Prediction Result</h3>
            <p><strong>Filename:</strong> {result.filename}</p>
            <p><strong>Predicted Class:</strong> {result.predicted_class}</p>
        </div>
    );
};

export default ResultDisplay;