// user.repository.ts
import pool from '../config/db';
import { User } from '../models/user.model';
import { UserCreateDTO } from '../models/user.model';

export default class UserRepository {
  async create(user: UserCreateDTO): Promise<User> {
    const [result] = await pool.query(
      'INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)',
      [user.username, user.password, user.email]
    );
    
    const createdUser = await this.findById((result as any).insertId);
    if (!createdUser) {
      throw new Error('User not found after creation');
    }
    return createdUser;
  }

  // Add findById method
  async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return (rows as User[])[0] || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return (rows as User[])[0] || null;
  }
}