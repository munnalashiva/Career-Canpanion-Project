from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import uvicorn
from ats_engine import analyze_resume
from typing import Optional

app = FastAPI(title="VidyaMitra AI Service")

class ATSRequest(BaseModel):
    file_content: str # Base64 encoded string
    file_name: str
    job_role: str

class ATSResponse(BaseModel):
    score: int
    keywordsFound: list[str]
    keywordsMissing: list[str]
    formatting: str
    issues: list[str]

@app.get("/")
def health_check():
    return {"status": "AI Service Operational", "version": "1.0.0"}

@app.post("/ats/score", response_model=ATSResponse)
def score_resume(payload: ATSRequest):
    """
    Analyzes a base64 encoded resume against a job role.
    """
    try:
        result = analyze_resume(payload.file_content, payload.job_role)
        return result
    except Exception as e:
        print(f"Error processing resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Error analyzing resume")

@app.post("/gd/analyze")
def analyze_speech(audio_features: dict):
    """
    Placeholder for GD audio sentiment and clarity analysis.
    """
    return {
        "clarity_score": 85,
        "sentiment": "Positive",
        "confidence": "High",
        "feedback": "Good maintainace of tone, but try to reduce filler words."
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
