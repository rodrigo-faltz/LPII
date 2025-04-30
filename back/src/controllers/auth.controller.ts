// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import {AppError} from '../types/custom-error';
import { CustomRequest } from '../types/types';
import { UserCreateDTO } from '../models/user.model';
import { UserLoginDTO } from '../models/user.model';

export default class AuthController {
  private authService = new AuthService();

  async getProfile(req: CustomRequest, res: Response) {
    try {
      // Add type assertion if needed
      if (!req.user) {
        throw new AppError('Usuário não autenticado', 401);
      }
      
      const user = await this.authService.getUserProfile(req.user.id);
      res.json(user);
    } catch (error) {
      // Error handling
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error('Error fetching user profile: %s', error); // Debugging line
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;
      console.log('Registering user: %s', username); // Debugging line

      
      const newUser = await this.authService.register({username, password, email} as UserCreateDTO);
      res.status(201).json(newUser);
    } catch (error) {
      // Error handling
      console.log('Error registering user: %s', error); // Debugging line
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login({email, password} as UserLoginDTO);
      res.json({ token });
    } catch (error) {
      
      console.error('Login error: %s', error); // Debugging line
      res.status(400).json({ message: 'Usuário ou senha inválidos' });
    }
  }
}