import { Router } from 'express';

const router = Router();

// Mock Auth Controller Logic for brevity
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // In production: Verify with DB and bcrypt
  if (email === "demo@vidyamitra.com" && password === "password") {
    res.json({
      token: "mock-jwt-token-123",
      user: {
        id: "u1",
        name: "Alex Student",
        email: email,
        role: "student"
      }
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post('/register', (req, res) => {
  res.json({ message: "User registered successfully", userId: "u_new_123" });
});

export default router;