// index.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import  {connectDatabase}  from './config/db';
import { errorHandler } from './middleware/error.middleware';
import { loggerMiddleware } from './middleware/logger.middleware';


const app = express();

// 1. Database Connection
connectDatabase().catch(err => {
  console.error('Fatal: Database connection failed', err);
  process.exit(1);
});

// Middleware and routes setup
app.use(express.json());
app.use('/api', authRoutes);

export default app;
// 2. Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(loggerMiddleware); // Request logging

// 3. Routes
app.use('/api/auth', authRoutes);

// 4. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 5. Error Handling
app.use(errorHandler);

// 6. Server Startup
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});