import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000; 


app.use(cors({ origin: 'http://localhost:5173' }));


app.use(express.json());


app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend! 🚀' });
});


app.post('/api/user', (req, res) => {
  const { name } = req.body;
  res.json({ message: `User ${name} created!` });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});