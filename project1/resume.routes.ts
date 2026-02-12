import { Router } from 'express';

const router = Router();

// Endpoint: /api/resume/select
// Saves the user's selected resume template to the database
router.post('/select', (req, res) => {
  const { userId, templateId, userProfile } = req.body;
  
  if (!userId || !templateId) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  // Logic to save to DB (Mocked for this implementation)
  // In a real scenario: await db.query('INSERT INTO user_resumes ...')
  console.log(`[DB] Saving selection: User ${userId} selected Template ${templateId}`);
  console.log(`[DB] Profile Context: Role=${userProfile?.role}, Exp=${userProfile?.experience}`);

  res.json({ 
    success: true, 
    message: "Resume preference saved successfully",
    data: {
        selectionId: "sel_" + Date.now(),
        timestamp: new Date().toISOString()
    }
  });
});

export default router;