import { Request, Response } from 'express';
import { ollamaService } from '../services/ollama.service';

export const generateResponse = async (req: Request, res: Response) => {
    console.log('Ollama request received:', req.body);
    try {
        const { prompt, model} = req.body;
        
        if (!prompt) {
            console.log('Missing prompt in request');
            return res.status(400).json({ 
            success: false,
            message: 'Prompt is required' 
            });
        }
    
        console.log(`Generating response for: "${prompt.substring(0, 50)}..."`);
        const response = await ollamaService.generateResponse(prompt, model);
        console.log('Response generated successfully', response);
    
        return res.status(200).json({ 
        success: true, 
        response 
        });
    } catch (error) {
        console.error('Error generating response:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to generate AI response',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};