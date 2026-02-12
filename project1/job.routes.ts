import { Router } from 'express';

const router = Router();

router.get('/recommended', (req, res) => {
  // Mock Data - In real app, query Postgres/Mongo based on User Skills
  const jobs = [
    {
      id: '1',
      title: 'Senior Frontend Engineer',
      company: 'TechCorp AI',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $160k',
      postedAt: '2h ago',
      matchScore: 95
    },
    {
      id: '2',
      title: 'React Native Developer',
      company: 'MobileFirst',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$80 - $100 / hr',
      postedAt: '5h ago',
      matchScore: 88
    }
  ];
  
  res.json(jobs);
});

export default router;