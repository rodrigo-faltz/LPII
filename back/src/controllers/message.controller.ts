import {Request, Response} from 'express';
import {MessageCreateDTO, MessageUpdateDTO} from '../models/message.model';
import {BARRAMENTO} from '../app';
import MessageRepository from '../repositories/message.repository';
import MessageService from '../services/message.service';


export default class MessageController {
    
    private messageService = new MessageService();

    async createMessage(req: Request, res: Response): Promise<Response> {
        try {
            console.log('Recebendo requisição para criar mensagem:', req.body);
            const messageData: MessageCreateDTO = req.body;

            // Validação dos dados
            if (!messageData.content) {
                console.error('Erro: content obrigatório');
                return res.status(400).json({ error: 'O conteúdo da mensagem é obrigatório' });
        }
        
        if (typeof messageData.chat_id !== 'number') {
            console.error('Erro: chat_id deve ser um número');
            return res.status(400).json({ error: 'chat_id deve ser um número válido' });
        }
        
        if (typeof messageData.author_id !== 'number' && messageData.author_id !== 0) {
            console.error('Erro: author_id deve ser um número');
            return res.status(400).json({ error: 'author_id deve ser um número válido' });
        }
        
        console.log('Dados validados, criando mensagem...');
        const createdMessage = await this.messageService.createMessage(messageData);
        console.log('Mensagem criada com sucesso:', createdMessage);
        return res.status(201).json(createdMessage);
    } catch (error) {
        console.error('Erro ao criar mensagem:', error);
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
}

    async updateMessage(req: Request, res: Response): Promise<Response> {
        try {
            const messageId = parseInt(req.params.id, 10);
            const messageData: MessageUpdateDTO = req.body;
            const updatedMessage = await this.messageService.updateMessage(messageId, messageData);
            return res.status(200).json(updatedMessage);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteMessage(req: Request, res: Response): Promise<Response> {
        try {
            const messageId = parseInt(req.params.id, 10);
            await this.messageService.deleteMessage(messageId);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getMessagesByChatId(req: Request, res: Response): Promise<Response> {
        try {
            const chatId = parseInt(req.params.chatId, 10);
            const messages = await this.messageService.getMessagesByChatId(chatId);
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getMessageById(req: Request, res: Response): Promise<Response> {
        try {
            const messageId = parseInt(req.params.id, 10);
            const message = await this.messageService.getMessageById(messageId);
            if (!message) {
                return res.status(404).json({ error: 'Message not found' });
            }
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }


    async getAllMessages(req: Request, res: Response): Promise<Response> {
        try {
            const messages = await this.messageService.getAllMessages();
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

}
