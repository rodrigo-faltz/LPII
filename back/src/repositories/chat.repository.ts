import pool from '../config/db';
import { Chat } from '../models/chat.model';
import { ChatCreateDTO } from '../models/chat.model';
import { ChatUpdateDTO } from '../models/chat.model';
import { ChatResponseDTO } from '../models/chat.model';

export default class ChatRepository {

    async createChat(chatData: ChatCreateDTO): Promise<ChatResponseDTO> {
        const [result] = await pool.query(
            'INSERT INTO chat (user_id, subject_id) VALUES (?, ?)',
            [ chatData.user_id, chatData.subject_id]
        );

        const createdChat = await this.getChatById((result as any).insertId);
        if (!createdChat) {
            throw new Error('Chat not found after creation');
        }
        return createdChat;
    }


    async updateChat(chatId: number, chatData: ChatUpdateDTO): Promise<ChatResponseDTO> {
        const [result] = await pool.query(
            'UPDATE chat SET message = ?, user_id = ?, subject_id = ? WHERE id = ?',
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
    //rows.length is not a function

    async getChatById(chatId: number): Promise<ChatResponseDTO> {
        const [rows]: any = await pool.query(
            'SELECT * FROM chat WHERE id = ?',
            [chatId]
        );
        if (!Array.isArray(rows) || rows.length === 0) {
            throw new Error('Chat not found');
        }
        return rows[0] as ChatResponseDTO;
    }


    
    async deleteChat(chatId: number): Promise<void> {
        const [result] = await pool.query(
            'DELETE FROM chat WHERE id = ?',
            [chatId]
        );
        if ((result as any).affectedRows === 0) {
            throw new Error('Chat not found');
        }
    }
    async getAllChats(): Promise<ChatResponseDTO[]> {
        const [rows] = await pool.query('SELECT * FROM chat');
        return rows as ChatResponseDTO[];
    }

    async getChatsByUserId(userId: number): Promise<ChatResponseDTO[]> {
        const [rows] = await pool.query(
            'SELECT * FROM chat WHERE user_id = ?',
            [userId]
        );
        return rows as ChatResponseDTO[];
    }

    getChatBySubjectId(subjectId: number): Promise<ChatResponseDTO[]> {
        return pool.query(
            'SELECT * FROM chat WHERE subject_id = ?',
            [subjectId]
        ).then(([rows]) => rows as ChatResponseDTO[]);
        
}

}
