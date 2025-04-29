// auth.routes.ts
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../validation/auth.validator';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', validateRegister, authController.register.bind(authController));
router.post('/login', validateLogin, authController.login.bind(authController));

// Protected route (requires valid JWT)
router.get('/profile', authenticate, authController.getProfile.bind(authController));

export default router;