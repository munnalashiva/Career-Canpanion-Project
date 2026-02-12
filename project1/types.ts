
export interface Template {
  id: string;
  name: string;
  source: string;
  thumbnail: string;
  tags: string[];
  popularity: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  logo: string;
  matchScore: number;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  expertise: string[];
  rating: number;
  available: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  acceptance: string;
  points: number;
}

export interface RoadmapStep {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'locked';
  description: string;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'coding' | 'resume' | 'learning' | 'social';
  unlocked: boolean;
  dateUnlocked?: string;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  trend: 'up' | 'down' | 'same';
}

export interface CodingPlatform {
  id: string;
  name: string;
  url: string;
  category: 'Core' | 'Assessment' | 'Beginner' | 'Gamified';
  description: string;
  icon?: string;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
}

export interface JobPlatform {
  id: string;
  name: string;
  url: string;
  description: string;
  color: string;
}

export interface JobAlert {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'viewed' | 'match' | 'interview';
}
