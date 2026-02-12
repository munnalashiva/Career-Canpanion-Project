import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import atsRoutes from './routes/ats.routes';
import jobRoutes from './routes/job.routes';
import mentoringRoutes from './routes/mentoring.routes';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all for dev
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json() as any);

// Request logging middleware
app.use((req: any, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/mentoring', mentoringRoutes);

// WebSocket Logic for Group Discussion & Mentoring
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a GD Room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    socket.to(roomId).emit('user-connected', socket.id);
  });

  // Handle Chat Messages
  socket.on('send-message', ({ roomId, message, user }) => {
    io.to(roomId).emit('receive-message', { user, message, timestamp: new Date() });
  });

  // Handle Audio Stream Signaling (WebRTC wrapper logic placeholder)
  socket.on('audio-signal', ({ roomId, signal }) => {
    socket.to(roomId).emit('audio-signal', signal);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`✅ Backend Server running on port ${PORT}`);
});