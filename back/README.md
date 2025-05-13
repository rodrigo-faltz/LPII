# ECM252 – Linguagens de Programação II
# ECM516 – Arquitetura de Sistemas Computacionais

## Documentação Back-end

### Índice
1. [Descrição](#descrição)
2. [Diretório](#diretório)
3. [Arquivos Importantes](#arquivos-importantes)
    - [index.ts](#indexts)
    - [app.ts](#appts)
    - [db.ts](#dbts)

---
## Descrição

---
## Diretório
<pre>
back/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── chat.controller.ts
│   │   ├── message.controller.ts
│   │   └── subject.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── erro.middleware.ts
│   │   └── logger.middleware.ts
│   ├── models/
│   │   ├── chat.model.ts
│   │   ├── message.models.ts
│   │   ├── subject.model.ts
│   │   └── user.model.ts
│   ├── repositories/
│   │   ├── chat.repository.ts
│   │   ├── message.repository.ts
│   │   ├── subject.repository.ts
│   │   └── user.repository.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── chat.routes.ts
│   │   ├── message.routes.ts
│   │   └── subject.routes.ts
│   ├── services/
│   │   ├── auth.services.ts
│   │   ├── chat.services.ts
│   │   ├── message.services.ts
│   │   └── subject.services.ts
│   ├── test/
│   │   └── test-server.ts
│   ├── types/
│   │   ├── auth-types.ts
│   │   ├── custom-error.ts
│   │   └── types.d.ts
│   ├── utils/
│   │   ├── bcrypt.ts
│   │   ├── jwt.ts
│   │   └── validation/
│   │       └── auth.validator.ts
│   ├── app.ts
│   └── index.ts
├── tests/
│   ├── integration/
│   │   └── routes/
│   │       └── auth.routes.test.ts
│   └── unit/
│       └── services/
│           └── auth.services.test.ts
├── .env.test
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
</pre>

---

## Arquivos Importantes

## index.ts

Este arquivo e o ponto de entrada principal da aplicação. Ele é responsável por inicializar
o servidor da aplicação. Ele importa o módulo principal (`app`) e o executa, escutando na porta 
definida pela variável de ambiente `PORT`. Para encerrar o servidor, o programa intercepta o sinal 
`SIGTERM` para encerrar o processo.

```TypeScript
import app from "./app";

// 6. Server Startup
const PORT = process.env.PORT;
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
```

### Funcionalidades
- Inicializa o servidor com base na configuração do app.ts.
- Utiliza `process.env.PORT` para definir a porta.
- Imprime uma mensagem de sucesso ao subir o servidor.
- Gerencia o encerramento correto da aplicação com server.close() em caso de sinal `SIGTERM` e imprime uma mensagem.

---

## app.ts

Este arquivo configura e prepara o servidor Express para o funcionamento. Ele define a conexao com o banco de dados, aplica `Middlewares` importantes, registra rotas principais e 
define tratamento centralizado de erros.

```TypeScript
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
const app = express();

// 1. Database Connection
connectDatabase().catch(err => {
  console.error('Fatal: Database connection failed', err);
  process.exit(1);
});

// Middleware and routes setup
app.use(express.json());
app.use('/api/chat', chatRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/message', messageRoutes);
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
app.use('/api/chat', chatRoutes); 
app.use('/api/subject', subjectRoutes);
app.use('/api/message', messageRoutes);


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
```

### Funcionalidades
- Conecta ao banco de dados via `connectDatabase()` e encerra o processo em caso de falha.
- Aplica Middleware e para converter automaticamente o corpo das requisições.
- Habilita `CORS` para permitir chamadas da aplicação front-end.
- Define as rotas principais da API.
- Cria um `endpoint` de verificação de saúde da API.
- Aplica Middleware global de tratamento de erros.

---

## db.ts

Este arquivo gerencia a conexão com o banco de dados `MySQL` utilizando `mysql2/promise`. Ele configura um pool de conexões, trata falhas críticas de conexão, e inclui funções auxiliares para testes e inicialização do banco.

```TypeScript
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create connection to the database
export async function createConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

export async function connectDatabase() {
  createConnection().catch((err) => {
    console.error("Fatal: Database connection failed", err);
    process.exit(1);
  });

  try {
    await pool.getConnection();

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

// Test database setup
export async function initializeTestDatabase() {
  const adminPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await adminPool.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
  await adminPool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
  await adminPool.end();

  await pool.query(`
    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    )
  `);
}

export interface QueryResult<T = any> {
  affectedRows?: number;
  insertId?: number;
  rows: T[];
}

export default pool;
```

#### Funcionalidades
- Configura um `pool` de conexões com base nas variáveis de ambiente:
- Cria uma conexão individual com o banco (usado internamente):
- Estabelece conexão e encerra o processo se falhar — usada na inicialização da aplicação.
- Cria o banco de dados e a tabela `users` para testes.
- Exporta uma interface `QueryResult<T>` para facilitar a tipagem de resultados de Queries.
- Exporta `pool` como default para uso nas outras partes da aplicação.

---