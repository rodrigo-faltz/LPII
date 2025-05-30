import { Request, Response } from 'express';
import { CustomRequest } from '../types/types';
import ChatService from '../services/chat.service';
import { ChatCreateDTO, ChatUpdateDTO } from '../models/chat.model';
import { AppError } from '../types/custom-error';
import { ChatResponseDTO } from '../models/chat.model';
import { BARRAMENTO } from '../app';
import ChatRepository from '../repositories/chat.repository';

export default class ChatController {
    private chatService = new ChatService();

    async createChat(req: Request, res: Response) {
        try {
            const chatData: ChatCreateDTO = req.body;
            const newChat = await this.chatService.createChat(chatData);
            res.status(201).json(newChat);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor: createChat' });
            }
        }
    }

    async getChatById(req: CustomRequest, res: Response) {
        try {
            const chatId = parseInt(req.params.id, 10);
            const chat = await this.chatService.getChatById(chatId);
            // Only allow owner
            if (!req.user || req.user.id !== chat.user_id) {
                return res.status(403).json({ error: 'Acesso negado' });
            }
            return res.json(chat);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor: getChatById' });
            }
        }
    }

    // async updateChat(req: Request, res: Response) {
    //     try {
    //         const chatId = parseInt(req.params.id, 10);
    //         const chatData: ChatUpdateDTO = req.body;
    //         const updatedChat = await this.chatService.updateChat(chatId, chatData);
    //         res.json(updatedChat);
    //     } catch (error) {
    //         if (error instanceof AppError) {
    //             res.status(error.statusCode).json({ message: error.message });
    //         } else {
    //             res.status(500).json({ message: 'Internal server error' });
    //         }
    //     }
    // }

    async deleteChat(req: Request, res: Response) {
        try {
            const chatId = parseInt(req.params.id, 10);
            await this.chatService.deleteChat(chatId);
            res.status(204).send();
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor: deleteChat' });
            }
        }
    }

    async getAllChats(req: Request, res: Response) {
        try {
            const chats = await this.chatService.getAllChats();
            res.json(chats);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor: getAllChats' });
            }
        }
    }

    async getChatsByUserId(req: CustomRequest, res: Response) {
        try {
            const userId = parseInt(req.params.userId, 10);
            // only allow current user
            if (!req.user || req.user.id !== userId) {
                return res.status(403).json({ message: 'Acesso negado' });
            }
            const chats = await this.chatService.getChatsByUserId(userId);
            return res.json(chats);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                return res.status(200).json({ message: 'Não há chats disponíveis para este usuário.' });
            }
        }
    }

    async getChatsBySubjectId(req: Request, res: Response) {
        try {
            const subjectId = parseInt(req.params.subjectId, 10);
            const chats = await this.chatService.getChatsBySubjectId(subjectId);
            res.json(chats);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor: getChatsBySubjectId' });
            }
        }
    }

}