import { Router } from 'express';
import { generateResponse } from '../controllers/ollama.controller';

const router = Router();

router.post('/generate', generateResponse);

export default router;