from fastapi import FastAPI, File, UploadFile
import torch
import librosa
import numpy as np
import io
from model_loader import load_model, preprocess_audio
from fastapi.responses import FileResponse
import os

# Initialize FastAPI app
app = FastAPI()

# Load trained model
model = load_model("models/best_model.pth")

@app.get("/")
async def root():
    return {"message": "Welcome to the Music Classification API!"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read uploaded audio file
        audio_data = await file.read()
        
        # Preprocess audio
        mfcc_tensor = preprocess_audio(audio_data)
        
        # Make prediction
        with torch.no_grad():
            output = model(mfcc_tensor)
            pred_idx = output.argmax(dim=1).item()
            label_map = {0: "flow", 1: "breathy", 2: "neutral", 3: "pressed"}
            predicted_label = label_map.get(pred_idx, "unknown")
        
        return {"filename": file.filename, "predicted_class": predicted_label}
    
    except Exception as e:
        return {"error": str(e)}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    """Serve a favicon if available."""
    if os.path.exists("favicon.ico"):
        return FileResponse("favicon.ico")
    return {"message": "No favicon found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=10000)
