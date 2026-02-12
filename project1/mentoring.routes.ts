import { Router } from 'express';

const router = Router();

// Mock Data Source (In production, this queries PostgreSQL)
const MENTORS = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Staff Engineer',
    company: 'Google',
    avatar: 'https://picsum.photos/100/100?random=20',
    expertise: ['System Design', 'React', 'Career Growth'],
    rating: 4.9,
    available: true
  },
  {
    id: '2',
    name: 'David Miller',
    role: 'Engineering Manager',
    company: 'Netflix',
    avatar: 'https://picsum.photos/100/100?random=21',
    expertise: ['Leadership', 'Backend', 'Microservices'],
    rating: 4.8,
    available: false
  }
];

// Get all mentors
router.get('/', (req, res) => {
  res.json(MENTORS);
});

// Book a session
router.post('/book', (req, res) => {
  const { mentorId, slot, userId } = req.body;
  // Logic: Check availability in DB, Create Booking record, Send Confirmation Email
  console.log(`Booking request: User ${userId} with Mentor ${mentorId} at ${slot}`);
  
  res.json({ 
    success: true, 
    message: "Session booked successfully", 
    bookingId: "bk_" + Date.now() 
  });
});

export default router;