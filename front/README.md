# ECM252 – Linguagens de Programação II
# ECM516 – Arquitetura de Sistemas Computacionais

## Documentação Back-end

### Índice
1. [Descrição](#descrição)
2. [Diretório](#diretório)
3. [Arquivos Importantes](#arquivos-importantes)

---
## Descrição

---
## Diretório
<pre>
front/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── Sidebar.tsx
│   │   ├── SubjectCard.tsx
│   │   └── SubjectsSection.tsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.test
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
</pre>

---

## Arquivos Importantes

### back\src\index.ts

Este arquivo e o ponto de entrada principal da aplicação. Ele é responsável por inicializar
o servidor da aplicação. Ele importa o módulo principal (`app`) e o executa, escutando na porta 
definida pela variável de ambiente `PORT`. Para encerrar o servidor, o programa intercepta o sinal 
`SIGTERM` para encerrar o processo.

#### Funcionalidades
- Inicializa o servidor com base na configuração do app.ts.

- Utiliza `process.env.PORT` para definir a porta.

- Imprime uma mensagem de sucesso ao subir o servidor:
```TypeScript
console.log(`Server running on port ${PORT}`);
```

- Gerencia o encerramento correto da aplicação com server.close() em caso de sinal `SIGTERM` e imprime 
uma mensagem:
```TypeScript
console.log('Server closed');
```

---

### back\src\app.ts

Este arquivo configura e prepara o servidor Express para o funcionamento. Ele define a conexao com o banco de dados, aplica `Middlewares` importantes, registra rotas principais e define tratamento centralizado de erros.

#### Funcionalidades
- Conecta ao banco de dados via `connectDatabase()` e encerra o processo em caso de falha:
``` TypeScript
// 1. Database Connection
connectDatabase().catch(err => {
  console.error('Fatal: Database connection failed', err);
  process.exit(1);
});
```
- Aplica Middleware e para converter automaticamente o corpo das requisições em 
`JSON`:
``` TypeScript
app.use(express.json())
```

- Habilita `CORS` para permitir chamadas da aplicação front-end:
``` TypeScript
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

- Define as rotas principais da API:
``` TypeScript
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); 
app.use('/api/subject', subjectRoutes);
```

- Cria um `endpoint` de verificação de saúde da API:
``` TypeScript
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});
```

- Aplica Middleware global de tratamento de erros:
``` TypeScript
app.use(errorHandler);
```

---

### back\src\config\db.ts

Este arquivo gerencia a conexão com o banco de dados `MySQL` utilizando `mysql2/promise`. Ele configura um pool de conexões, trata falhas críticas de conexão, e inclui funções auxiliares para testes e inicialização do banco.

#### Funcionalidades
- Configura um `pool` de conexões com base nas variáveis de ambiente:

``` TypeScript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

- Cria uma conexão individual com o banco (usado internamente):

``` TypeScript
export async function createConnection() {
  const connection = await pool.getConnection();
  console.log("Database connected successfully");
  return connection;
}
```

- Estabelece conexão e encerra o processo se falhar — usada na inicialização da aplicação:

``` TypeScript
export async function connectDatabase() {
  createConnection().catch((err) => {
    console.error("Fatal: Database connection failed", err);
    process.exit(1);
  });
}
```

- Cria o banco de dados e a tabela `users` para testes:

``` TypeScript
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
```

- Exporta uma interface `QueryResult<T>` para facilitar a tipagem de resultados de 
queries:

``` TypeScript
export interface QueryResult<T = any> {
  affectedRows?: number;
  insertId?: number;
  rows: T[];
}
```

- Exporta `pool` como default para uso nas outras partes da aplicação.