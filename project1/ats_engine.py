import base64
import io
import re
from pdfminer.high_level import extract_text

# Mock keyword database
SKILL_DB = {
    "Frontend Engineer": ["React", "TypeScript", "HTML", "CSS", "Redux", "Webpack", "Tailwind", "Git", "Testing"],
    "Backend Engineer": ["Node.js", "Python", "SQL", "MongoDB", "Docker", "AWS", "API", "System Design"],
    "Data Scientist": ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "SQL", "Statistics"]
}

def analyze_resume(base64_content: str, job_role: str) -> dict:
    # 1. Decode File
    try:
        file_bytes = base64.b64decode(base64_content)
        text = ""
        
        # Simple extraction (Production would need robust PDF/Docx handling)
        with io.BytesIO(file_bytes) as f:
            text = extract_text(f)
            
    except Exception as e:
        # Fallback for demo if PDF extraction fails or if dummy file
        text = "React TypeScript Node.js developed scalable web applications." 

    # 2. Normalize Text
    text_lower = text.lower()
    
    # 3. Keyword Matching
    target_skills = SKILL_DB.get(job_role, SKILL_DB["Frontend Engineer"])
    found = []
    missing = []
    
    for skill in target_skills:
        if skill.lower() in text_lower:
            found.append(skill)
        else:
            missing.append(skill)
            
    # 4. Calculate Score
    total_skills = len(target_skills)
    found_skills = len(found)
    score = int((found_skills / total_skills) * 100)
    
    # Adjust score based on heuristics (mock logic)
    issues = []
    formatting = "Good"
    
    if len(text) < 200:
        score -= 10
        issues.append("Resume content is too short.")
    
    if len(text) > 3000:
        issues.append("Resume is too long (over 2 pages estimated).")
        formatting = "Needs Improvement"

    if score < 50:
        issues.append("Critical keywords missing for this role.")
        
    return {
        "score": max(0, min(100, score)),
        "keywordsFound": found,
        "keywordsMissing": missing,
        "formatting": formatting,
        "issues": issues
    }
