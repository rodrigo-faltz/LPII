// app.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import  {connectDatabase}  from './config/db';
import { errorHandler } from './middleware/error.middleware';
import { loggerMiddleware } from './middleware/logger.middleware';
import chatRoutes from './routes/chat.routes';
import subjectRoutes from './routes/subject.routes';
import messageRoutes from './routes/message.routes';
import ollamaRoutes from './routes/ollama.routes';
import { MessageBus } from './core/MessageBus';
import AuthService from './services/auth.service';
import ChatService from './services/chat.service';
import SubjectService from './services/subject.service';
import MessageService from './services/message.service';
import MessageRepository from './repositories/message.repository';
import ChatRepository  from './repositories/chat.repository';
import SubjectRepository from './repositories/subject.repository';
import UserRepository from './repositories/user.repository';



// 1. Initialize MessageBus
const messageBus = new MessageBus({
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest'
});

// 2. Connect to RabbitMQ
try {
  messageBus.connect();
  console.log('Connected to RabbitMQ');
}
catch (error) {
  console.error('Error connecting to RabbitMQ:', error);
  process.exit(1);
}

// 3. Initialize Services
// Initialize services with the message bus
// You can also pass the message bus to the services if needed

const authService = new AuthService(messageBus);
const chatService = new ChatService(new ChatRepository(), messageBus);
const subjectService = new SubjectService(new SubjectRepository(), messageBus);
const messageService = new MessageService(new MessageRepository(), messageBus);

const app = express();


// 1. Database Connection
connectDatabase().catch(err => {
  console.error('Fatal: Database connection failed', err);
  process.exit(1);
});

// 2. Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(loggerMiddleware); // Request logging

// 3. Routes
app.use('/api', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); 
app.use('/api/subject', subjectRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/ollama', ollamaRoutes); // AI generation routes


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


export default app;