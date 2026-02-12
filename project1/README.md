# VidyaMitra – AI Career Companion

VidyaMitra is a comprehensive AI-powered career development platform designed to help students and professionals accelerate their careers.

## 🚀 Features

- **ATS Checker**: AI-powered resume scoring and feedback using Python/NLP.
- **Coding Practice**: Integrated problem-solving environment.
- **Dual Mentoring**: AI Chatbot + Human Mentor booking system.
- **Roadmap.ai**: Visual career progression tracks.
- **Gamification**: Badges, Levels, and Leaderboards.
- **Group Discussion**: Real-time simulation (WebSockets).

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, Socket.io
- **AI Services**: Python, FastAPI, Spacy, PDFMiner
- **Databases**: PostgreSQL (Relational), MongoDB (Documents), Redis (Cache)
- **Infrastructure**: Docker, Docker Compose

## 📦 Project Structure

```
vidyamitra/
├── frontend/           # React Application
├── backend/            # Express API Gateway
├── ai-services/        # Python AI Microservices
├── database/           # DB Init scripts
├── docker/             # Dockerfiles
└── docker-compose.yml  # Container Orchestration
```

## ⚡ Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local dev)

### Run via Docker (Recommended)
This will spin up the Frontend, Backend, AI Service, Databases, and Redis.

```bash
docker-compose up --build
```

Access the application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **AI Service Docs**: http://localhost:8000/docs

### Local Development

1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **AI Service**:
   ```bash
   cd ai-services
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

## 🧪 Testing

- **ATS Checker**: Upload any PDF to the `/ats-checker` page. The AI service will extract text and score it against "Frontend Engineer" keywords.
- **Gamification**: Solve a coding problem to see XP animations.
- **Mentoring**: Toggle between AI Chat (Simulated) and Human Mentors.

## 📄 License
MIT