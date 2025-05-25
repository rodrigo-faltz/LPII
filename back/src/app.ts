// app.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { connectDatabase } from './config/db';
import { errorHandler } from './middleware/error.middleware';
import { loggerMiddleware } from './middleware/logger.middleware';
import chatRoutes from './routes/chat.routes';
import subjectRoutes from './routes/subject.routes';
import messageRoutes from './routes/message.routes';
import { MessageBus } from './core/MessageBus';

// 1. Inicializa o barramento de mensagens
const BARRAMENTO = new MessageBus({
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest'
});

// 2. Inicializa o Express
const app = express();

// 3. Conecta ao banco de dados
connectDatabase().catch(err => {
  console.error('Fatal: Database connection failed', err);
  process.exit(1);
});

// 4. Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(loggerMiddleware);

// 5. Rotas
app.use('/api', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); 
app.use('/api/subject', subjectRoutes);
app.use('/api/message', messageRoutes);


// 6. Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 7. Error handling
app.use(errorHandler);

// 8. Inicialização completa da aplicação
(async () => {
  try {
    await BARRAMENTO.connect();
    await BARRAMENTO.initQueues();
    console.log('✅ Conectado ao RabbitMQ');

    // Só agora importa o consumidor, para garantir que o BARRAMENTO está pronto
    const { default: consumeMessageQueue } = await import('./consumer/OllamaConsumer');
    await consumeMessageQueue();

    console.log('✅ Fila de mensagens ativa');
  } catch (err) {
    console.error('Erro ao inicializar o sistema:', err);
    process.exit(1);
  }
})();

// 9. Exporta o app e o barramento
export { BARRAMENTO };
export default app;
