import React, { useState } from "react";
import FileUpload from "./components/FileUpload.js";
import ResultDisplay from "./components/ResultDisplay.js";
import "./App.css";

const App = () => {
    const [result, setResult] = useState(null);

    return (
        <div className="app-container">
            <h1>Music Genre Classifier</h1>
            <FileUpload onResult={setResult} />
            <ResultDisplay result={result} />
        </div>
    );
};

export default App;