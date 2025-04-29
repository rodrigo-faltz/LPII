// auth.controller.ts
import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { AppError } from '../types/custom-error';

export default class AuthController {
  private authService = new AuthService();

  // Existing registration method
  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Registration failed' });
      }
    }
  }

  // Add login method
  async login(req: Request, res: Response) {
    try {
      const token = await this.authService.login(req.body);
      res.json({ token });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    }
  }

  // Add profile method
  async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }
      
      // Fetch fresh data from database
      const user = await this.authService.getUserProfile(req.user.id);
      res.json(user);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to fetch profile' });
      }
    }
  }
}