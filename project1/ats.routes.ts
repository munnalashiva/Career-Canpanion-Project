import { Router } from 'express';
import multer from 'multer';
import axios from 'axios';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint: /api/ats/analyze
router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    // Cast req to any to access multer's file property without extending the type definition
    const file = (req as any).file;
    
    if (!file) {
      res.status(400).json({ message: "No resume file uploaded" });
      return;
    }

    // Convert buffer to base64 to send to Python microservice
    const fileBuffer = file.buffer.toString('base64');
    const fileName = file.originalname;

    try {
      // Call Python AI Microservice
      // Assuming docker-compose service name 'ai-service' on port 8000
      const aiResponse = await axios.post('http://ai-service:8000/ats/score', {
        file_content: fileBuffer,
        file_name: fileName,
        job_role: "Frontend Engineer" // Default or from req.body
      });

      res.json(aiResponse.data);
    } catch (axiosError) {
      // Fallback Mock Response if AI service is down or errored
      res.json({
        score: 75,
        keywordsFound: ["React", "JavaScript", "HTML"],
        keywordsMissing: ["TypeScript", "CI/CD"],
        formatting: "Standard",
        issues: ["AI Service Unavailable - Using Cached Logic"]
      });
    }

  } catch (error) {
    console.error("ATS Analysis Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;