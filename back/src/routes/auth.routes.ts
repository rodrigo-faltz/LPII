// src/routes/auth.routes.ts
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

// Simplified route definition
router.get('/profile', authenticate, authController.getProfile);

export default router;