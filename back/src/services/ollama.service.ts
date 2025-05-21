import axios from 'axios';

interface OllamaResponse {
    response: string;
    done: boolean;
}

export class OllamaService {
    private baseUrl: string;

    constructor(ollamaUrl: string = 'http://localhost:11434') {
        this.baseUrl = ollamaUrl;
    }

    async generateResponse(prompt: string, model: string = 'deepseek-r1:7b'): Promise<string> {
        try {
            const response = await axios.post(
            `${this.baseUrl}/api/generate`,
            {
                model,
                prompt: prompt,
                stream: false,
            }
            );
            return response.data.response;
        } catch (error) {
            console.error('Ollama API Error:', error instanceof Error ? error.message : error);
            throw error;
        }
    }
}


export const ollamaService = new OllamaService();