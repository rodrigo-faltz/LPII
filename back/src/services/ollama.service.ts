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

            const rawResponse = response.data.response;
            const cleanedResponse = this.removeThinkingTags(rawResponse);

            return cleanedResponse;

        } catch (error) {
            console.error('Ollama API Error:', error instanceof Error ? error.message : error);
            throw error;
        }
    }

    private removeThinkingTags(text: string): string {
        // Remove the "thinking" tags from the response
        return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    }
}


export const ollamaService = new OllamaService();