import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-strong-secret-key';

export const generateToken = (user: { id: number; username: string }) => 
  jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string) => 
  jwt.verify(token, SECRET) as { id: number; username: string };