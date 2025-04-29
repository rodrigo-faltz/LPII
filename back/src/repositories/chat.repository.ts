import pool from '../config/db';
import { Chat } from '../models/chat.model';
import { ChatCreateDTO } from '../models/chat.model';
import { ChatUpdateDTO } from '../models/chat.model';
import { ChatResponseDTO } from '../models/chat.model';

export default class ChatRepository {

    async createChat(chatData: ChatCreateDTO): Promise<ChatResponseDTO> {
        const [result] = await pool.query(
            'INSERT INTO chats (message, user_id, subject_id) VALUES (?, ?, ?)',
            [chatData.message, chatData.user_id, chatData.subject_id]
        );

        const createdChat = await this.getChatById((result as any).insertId);
        if (!createdChat) {
            throw new Error('Chat not found after creation');
        }
        return createdChat;
    }


    async updateChat(chatId: string, chatData: ChatUpdateDTO): Promise<ChatResponseDTO> {
        const [result] = await pool.query(
            'INSERT INTO  chats  (message, user_id, subject_id) VALUES (?, ?, ?)',
            [chatData.message, chatData.user_id, chatData.subject_id, chatId]
        );

        if ((result as any).affectedRows === 0) {
            throw new Error('Chat not found');
        }

        const updatedChat = await this.getChatById(chatId);
        if (!updatedChat) {
            throw new Error('Chat not found after update');
        }
             
        return updatedChat;
    }

    async getChatById(subjectId: string): Promise<ChatResponseDTO | null> {
        const [rows] = await pool.query(
            'SELECT * FROM chats WHERE id = ?',
            [subjectId]
        );
        return (rows as Chat[])[0] || null;
    }


    
    async deleteChat(chatId: string): Promise<void> {
        const [result] = await pool.query(
            'DELETE FROM chats WHERE id = ?',
            [chatId]
        );
        if ((result as any).affectedRows === 0) {
            throw new Error('Chat not found');
        }
    }
    async getAllChats(): Promise<ChatResponseDTO[]> {
        const [rows] = await pool.query('SELECT * FROM chats');
        return rows as ChatResponseDTO[];
    }

    async getChatsByUserId(userId: string): Promise<ChatResponseDTO[]> {
        const [rows] = await pool.query(
            'SELECT * FROM chats WHERE user_id = ?',
            [userId]
        );
        return rows as ChatResponseDTO[];
    }

    
}
