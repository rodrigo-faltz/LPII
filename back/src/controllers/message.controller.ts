import {Request, Response} from 'express';
import {MessageCreateDTO, MessageUpdateDTO} from '../models/message.model';
import MessageService from '../services/message.service';


export default class MessageController {
    constructor(private messageService: MessageService = new MessageService()) {}
    
    async createMessage(req: Request, res: Response): Promise<Response> {
        try {
            const messageData: MessageCreateDTO = req.body;
            const createdMessage = await this.messageService.createMessage(messageData);
            return res.status(201).json(createdMessage);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
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
