import pool from '../config/db';
import { Message } from '../models/message.model';
import { MessageCreateDTO } from '../models/message.model';
import { MessageUpdateDTO } from '../models/message.model';
import { MessageDeleteDTO } from '../models/message.model';

import { MesssageGetByChatIdDTO } from '../models/message.model';

// import { MessageResponseDTO } from '../models/message.model';

export default class MessageRepository {
    async createMessage(messageData: MessageCreateDTO): Promise<Message> {
        const [result] = await pool.query(
            'INSERT INTO messages (content, chat_id, author_id) VALUES (?, ?, ?)',
            [messageData.content, messageData.chat_id, messageData.author_id]
        );
        
        
        const createdMessage = await this.getMessageById((result as any).insertId);
        if (!createdMessage) {
            throw new Error('Message not found after creation');
        }
        return createdMessage;
        //return content
    }
    async updateMessage(messageId: number, messageData: MessageUpdateDTO): Promise<Message> {
        const [result] = await pool.query(
            'UPDATE messages SET content = ?, chat_id = ?, author_id = ? WHERE id = ?',
            [messageData.content, messageData.chat_id, messageData.author_id, messageId]
        );

        if ((result as any).affectedRows === 0) {
            throw new Error('Message not found');
        }

        const updatedMessage = await this.getMessageById(messageId);
        if (!updatedMessage) {
            throw new Error('Message not found after update');
        }
        return updatedMessage;
    }

    async getMessageById(messageId: number): Promise<Message | null> {
        const [rows] = await pool.query(
            'SELECT * FROM messages WHERE id = ?',
            [messageId]
        );
        return (rows as Message[])[0] || null;
    }

    async deleteMessage(messageId: number): Promise<void> {
        const [result] = await pool.query(
            'DELETE FROM messages WHERE id = ?',
            [messageId]
        );
        if ((result as any).affectedRows === 0) {
            throw new Error('Message not found');
        }
    }

    async getMessagesByChatId(chatId: number): Promise<Message[]> {
        const [rows] = await pool.query(
            'SELECT * FROM messages WHERE chat_id = ?',
            [chatId]
        );
        return rows as Message[];
    }

    async getAllMessages(): Promise<Message[]> {
        const [rows] = await pool.query(
            'SELECT * FROM messages'
        );
        return rows as Message[];
    }

    async getTopMessagesByChatId(chatId: number): Promise<Message[]> {
        const [rows] = await pool.query(
            'SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT 1',
            [chatId]
        );
        return rows as Message[];
    }
}

