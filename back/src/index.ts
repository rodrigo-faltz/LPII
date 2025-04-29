// index.ts

import express from 'express';
import authRoutes from './routes/auth.routes';

// Initialize express app

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});