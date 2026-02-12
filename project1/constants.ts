
import { Template, Job, Mentor, Problem, RoadmapStep, Badge, LeaderboardEntry, CodingPlatform, QuizQuestion, JobPlatform, JobAlert } from './types';

export const MOCK_TEMPLATES: Template[] = [
  // Overleaf (Developer Favorites)
  {
    id: 'o1',
    name: 'Awesome CV',
    source: 'Overleaf',
    thumbnail: 'https://picsum.photos/300/400?random=109',
    tags: ['LaTeX', 'Developer', 'ATS-Optimized', 'Best Seller'],
    popularity: 99
  },
  {
    id: 'o2',
    name: 'Deedy Resume',
    source: 'Overleaf',
    thumbnail: 'https://picsum.photos/300/400?random=110',
    tags: ['LaTeX', 'Academic', 'Computer Science', 'One-Page'],
    popularity: 97
  },
  
  // Zety (Modern Corporate)
  {
    id: 'z1',
    name: 'Cascade',
    source: 'Zety',
    thumbnail: 'https://picsum.photos/300/400?random=107',
    tags: ['Modern', 'Corporate', 'Tech', 'Column Layout'],
    popularity: 96
  },
  {
    id: 'z2',
    name: 'Iconic',
    source: 'Zety',
    thumbnail: 'https://picsum.photos/300/400?random=108',
    tags: ['Creative', 'Icons', 'Designer', 'Visual'],
    popularity: 91
  },

  // Canva (ATS Friendly - Clean)
  {
    id: 'c1',
    name: 'Blue Minimalist',
    source: 'Canva',
    thumbnail: 'https://picsum.photos/300/400?random=101',
    tags: ['Minimal', 'ATS-Friendly', 'Entry Level', 'Clean'],
    popularity: 98
  },
  {
    id: 'c2',
    name: 'Professional Gray',
    source: 'Canva',
    thumbnail: 'https://picsum.photos/300/400?random=102',
    tags: ['Corporate', 'Manager', 'Serious'],
    popularity: 94
  },

  // Google Docs (Simple & Standard)
  {
    id: 'g1',
    name: 'Swiss',
    source: 'Google Docs',
    thumbnail: 'https://picsum.photos/300/400?random=105',
    tags: ['Clean', 'Sans-Serif', 'Modern', 'Free'],
    popularity: 92
  },
  {
    id: 'g2',
    name: 'Serif',
    source: 'Google Docs',
    thumbnail: 'https://picsum.photos/300/400?random=106',
    tags: ['Classic', 'Academic', 'Writer', 'Traditional'],
    popularity: 80
  },

  // Microsoft Office
  {
    id: 'm1',
    name: 'Crisp & Clean',
    source: 'Microsoft',
    thumbnail: 'https://picsum.photos/300/400?random=103',
    tags: ['Traditional', 'Simple', 'General Purpose'],
    popularity: 88
  },
  {
    id: 'm2',
    name: 'Polished',
    source: 'Microsoft',
    thumbnail: 'https://picsum.photos/300/400?random=104',
    tags: ['Professional', 'Layout', 'Experienced'],
    popularity: 85
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp AI',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    postedAt: '2h ago',
    logo: 'https://picsum.photos/50/50?random=10',
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
    logo: 'https://picsum.photos/50/50?random=11',
    matchScore: 88
  },
  {
    id: '3',
    title: 'Full Stack Engineer',
    company: 'StartupX',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$140k - $180k',
    postedAt: '1d ago',
    logo: 'https://picsum.photos/50/50?random=12',
    matchScore: 82
  }
];

export const MOCK_MENTORS: Mentor[] = [
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
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Product Designer',
    company: 'Airbnb',
    avatar: 'https://picsum.photos/100/100?random=22',
    expertise: ['UI/UX', 'Portfolio Review', 'Design Systems'],
    rating: 5.0,
    available: true
  }
];

export const MOCK_PROBLEMS: Problem[] = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', acceptance: '48.5%', points: 50 },
  { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', topic: 'Linked List', acceptance: '39.1%', points: 100 },
  { id: '3', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'Binary Search', acceptance: '34.6%', points: 200 },
  { id: '4', title: 'Longest Palindromic Substring', difficulty: 'Medium', topic: 'String', acceptance: '31.8%', points: 100 },
  { id: '5', title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stack', acceptance: '40.2%', points: 50 }
];

export const MOCK_ROADMAP: Record<string, RoadmapStep[]> = {
  'frontend': [
    { id: 'f1', title: 'Internet & Web Basics', status: 'completed', description: 'DNS, HTTP/HTTPS, Domain Names, Hosting.', points: 50 },
    { id: 'f2', title: 'HTML & CSS', status: 'completed', description: 'Semantic HTML, Box Model, Flexbox, Grid.', points: 100 },
    { id: 'f3', title: 'JavaScript', status: 'completed', description: 'ES6+, DOM, Fetch API, Event Loop.', points: 150 },
    { id: 'f4', title: 'Version Control', status: 'completed', description: 'Git, GitHub, Branching, Pull Requests.', points: 75 },
    { id: 'f5', title: 'React', status: 'in-progress', description: 'Components, Props, Hooks, Context, Redux.', points: 200 },
    { id: 'f6', title: 'CSS Frameworks', status: 'locked', description: 'Tailwind CSS, Material UI, Bootstrap.', points: 100 },
    { id: 'f7', title: 'Testing', status: 'locked', description: 'Jest, React Testing Library, Cypress.', points: 150 },
    { id: 'f8', title: 'SSR & SSG', status: 'locked', description: 'Next.js, Remix, SEO optimization.', points: 200 }
  ],
  'backend': [
    { id: 'b1', title: 'OS & General Knowledge', status: 'completed', description: 'Terminal usage, Process management, Threads.', points: 50 },
    { id: 'b2', title: 'Language (Node.js/Python)', status: 'in-progress', description: 'Runtime, Syntax, Memory management.', points: 150 },
    { id: 'b3', title: 'Relational Databases', status: 'locked', description: 'PostgreSQL, SQL Syntax, Normalization.', points: 200 },
    { id: 'b4', title: 'NoSQL Databases', status: 'locked', description: 'MongoDB, Redis, Document structure.', points: 150 },
    { id: 'b5', title: 'APIs', status: 'locked', description: 'REST, GraphQL, gRPC, Authentication.', points: 200 }
  ],
  'devops': [
    { id: 'd1', title: 'Linux Basics', status: 'completed', description: 'Shell scripting, File permissions, SSH.', points: 100 },
    { id: 'd2', title: 'Containerization', status: 'in-progress', description: 'Docker, Images, Containers, Networking.', points: 200 },
    { id: 'd3', title: 'CI/CD', status: 'locked', description: 'GitHub Actions, Jenkins, Pipelines.', points: 250 },
    { id: 'd4', title: 'Cloud Providers', status: 'locked', description: 'AWS, Azure, GCP core services.', points: 300 }
  ],
  'ai': [
    { id: 'a1', title: 'Python & Math', status: 'completed', description: 'Linear Algebra, Calculus, NumPy, Pandas.', points: 150 },
    { id: 'a2', title: 'Machine Learning', status: 'in-progress', description: 'Scikit-learn, Regression, Classification.', points: 250 },
    { id: 'a3', title: 'Deep Learning', status: 'locked', description: 'Neural Networks, PyTorch/TensorFlow.', points: 300 },
    { id: 'a4', title: 'LLMs & GenAI', status: 'locked', description: 'Transformers, Prompt Engineering, RAG.', points: 400 }
  ]
};

export const MOCK_BADGES: Badge[] = [
  { id: '1', name: 'First Steps', description: 'Completed your first roadmap item', icon: '🎯', category: 'learning', unlocked: true, dateUnlocked: '2 days ago' },
  { id: '2', name: 'Code Warrior', description: 'Solved 10 coding problems', icon: '⚔️', category: 'coding', unlocked: true, dateUnlocked: 'Yesterday' },
  { id: '3', name: 'ATS Master', description: 'Achieved 90+ ATS Score', icon: '🏆', category: 'resume', unlocked: false },
  { id: '4', name: 'Social Butterfly', description: 'Participated in 5 GDs', icon: '🦋', category: 'social', unlocked: false },
  { id: '5', name: 'Bug Hunter', description: 'Passed all test cases on first try', icon: '🐛', category: 'coding', unlocked: false },
  { id: '6', name: 'Consistent Learner', description: '7 day login streak', icon: '🔥', category: 'learning', unlocked: true, dateUnlocked: 'Today' }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, id: 'u1', name: 'Sarah Jenkins', avatar: 'https://picsum.photos/40/40?random=101', points: 2450, level: 12, trend: 'up' },
  { rank: 2, id: 'u2', name: 'Mike Chen', avatar: 'https://picsum.photos/40/40?random=102', points: 2320, level: 11, trend: 'same' },
  { rank: 3, id: 'curr', name: 'Alex Student', avatar: 'https://picsum.photos/40/40?random=100', points: 1890, level: 8, trend: 'up' }, // Current User
  { rank: 4, id: 'u3', name: 'Jessica Wu', avatar: 'https://picsum.photos/40/40?random=103', points: 1750, level: 7, trend: 'down' },
  { rank: 5, id: 'u4', name: 'Tom Baker', avatar: 'https://picsum.photos/40/40?random=104', points: 1600, level: 7, trend: 'same' },
];

export const CODING_PLATFORMS: CodingPlatform[] = [
  // Core Practice
  { id: 'p1', name: 'HackerRank', url: 'https://www.hackerrank.com', category: 'Core', description: 'Coding quizzes, skill tests, language-wise practice, certifications.' },
  { id: 'p2', name: 'LeetCode', url: 'https://leetcode.com', category: 'Core', description: 'Interview-focused problems, DSA, company-wise questions.' },
  { id: 'p3', name: 'Codeforces', url: 'https://codeforces.com', category: 'Core', description: 'Algorithmic contests, rating system, strong community.' },
  { id: 'p4', name: 'CodeChef', url: 'https://www.codechef.com', category: 'Core', description: 'Beginner-friendly + contests + long challenges.' },
  { id: 'p5', name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org', category: 'Core', description: 'Theory + MCQs + coding problems + interview prep.' },

  // Skill Assessment
  { id: 'p6', name: 'HackerEarth', url: 'https://www.hackerearth.com', category: 'Assessment', description: 'Skill tests, company challenges, hiring contests.' },
  { id: 'p7', name: 'TopCoder', url: 'https://www.topcoder.com', category: 'Assessment', description: 'Advanced contests, marathon matches.' },
  { id: 'p8', name: 'TestDome', url: 'https://www.testdome.com', category: 'Assessment', description: 'Real-world coding + MCQ assessments.' },

  // Beginner / Quiz Style
  { id: 'p9', name: 'SoloLearn', url: 'https://www.sololearn.com', category: 'Beginner', description: 'Mobile-friendly lessons + quizzes.' },
  { id: 'p10', name: 'Edabit', url: 'https://edabit.com', category: 'Beginner', description: 'Bite-sized quiz-like challenges.' },

  // Gamified
  { id: 'p11', name: 'Quizizz', url: 'https://quizizz.com', category: 'Gamified', description: 'MCQ quizzes, classroom & self-practice.' },
  { id: 'p12', name: 'Kahoot', url: 'https://kahoot.com', category: 'Gamified', description: 'Fun, competitive quiz learning.' }
];

export const MOCK_QUIZZES: QuizQuestion[] = [
  // JavaScript
  { id: 'q1', topic: 'JavaScript', question: 'What is the output of `typeof null`?', options: ['"object"', '"null"', '"undefined"', '"number"'], correctAnswer: 0 },
  { id: 'q2', topic: 'JavaScript', question: 'Which keyword is used to declare a block-scoped variable?', options: ['var', 'let', 'const', 'both let and const'], correctAnswer: 3 },
  { id: 'q3', topic: 'JavaScript', question: 'What does JSON stand for?', options: ['JavaScript Object Native', 'JavaScript Object Notation', 'Java Source Object Network', 'None of the above'], correctAnswer: 1 },
  
  // React
  { id: 'q4', topic: 'React', question: 'What is the hook used to manage state in a functional component?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correctAnswer: 1 },
  { id: 'q5', topic: 'React', question: 'What is JSX?', options: ['A function', 'A syntax extension for JavaScript', 'A database', 'A framework'], correctAnswer: 1 },
  
  // DSA
  { id: 'q6', topic: 'DSA', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(1)'], correctAnswer: 2 },
  { id: 'q7', topic: 'DSA', question: 'Which data structure follows LIFO?', options: ['Queue', 'Stack', 'LinkedList', 'Tree'], correctAnswer: 1 },
];

export const JOB_PLATFORMS: JobPlatform[] = [
  {
    id: 'jp1',
    name: 'LinkedIn Jobs',
    url: 'https://www.linkedin.com/jobs',
    description: 'World\'s largest professional network for jobs and internships.',
    color: 'bg-blue-600'
  },
  {
    id: 'jp2',
    name: 'Internshala',
    url: 'https://internshala.com',
    description: 'Best platform for students to find internships and training.',
    color: 'bg-sky-500'
  },
  {
    id: 'jp3',
    name: 'Naukri.com',
    url: 'https://www.naukri.com',
    description: 'India’s No. 1 job search and recruitment platform.',
    color: 'bg-blue-800'
  }
];

export const MOCK_JOB_ALERTS: JobAlert[] = [
  { id: 'a1', title: 'Application Viewed', message: 'TechCorp AI recruiter viewed your application.', time: 'Just now', type: 'viewed' },
  { id: 'a2', title: 'New Job Match', message: '95% match found: Full Stack Dev at Zomato.', time: '2h ago', type: 'match' },
  { id: 'a3', title: 'Interview Scheduled', message: 'Mock Interview with Sarah Chen confirmed.', time: '5h ago', type: 'interview' }
];
