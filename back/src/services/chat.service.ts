import ChatRepository from '../repositories/chat.repository';
import { ChatCreateDTO, ChatResponseDTO } from '../models/chat.model';
import {BARRAMENTO} from '../app';
import { MessageBus } from '../core/MessageBus';

export default class ChatService {
  private chatRepo = new ChatRepository();

  async createChat(chatData: ChatCreateDTO): Promise<ChatResponseDTO> {

    const chat = await this.chatRepo.createChat(chatData);

    const message = {
      chatId: chat.id,
      userId: chat.user_id,
      subjectId: chat.subject_id,
      message: chat.message
    };

    await BARRAMENTO.publish('chat.exchange', 'chat.created', message);
    console.log('Message published to RabbitMQ:', message);

    return chat;
  }

  async getChatById(chatId: number): Promise<ChatResponseDTO> {

    const chat = await this.chatRepo.getChatById(chatId);
    if (!chat) {
      throw new Error(`Chat with ID ${chatId} not found`);

      const message = {
        chatId: chat.id,
        userId: chat.user_id,
        subjectId: chat.subject_id,
        message: chat.message
      };



      await BARRAMENTO.publish('chat.exchange', 'chat.created', message);
      console.log('Message published to RabbitMQ:', message);

    }
    return chat;
  }

    // async updateChat(chatId: number, chatData: Partial<ChatCreateDTO>): Promise<ChatResponseDTO> {
    //     if (chatData.message && chatData.message.length > 500) {
    //     throw new Error('Message too long');
    //     }
    //     return this.chatRepo.updateChat(chatId, chatData);
    // }

    async deleteChat(chatId: number): Promise<void> {
        const chat = await this.chatRepo.getChatById(chatId);
        if (!chat) {
            throw new Error(`Chat with ID ${chatId} not found`);
        }

        const message = {
            chatId: chat.id,
            userId: chat.user_id,
            subjectId: chat.subject_id,
            message: chat.message
        };
        await BARRAMENTO.publish('chat.exchange', 'chat.deleted', message);
        console.log('Message published to RabbitMQ:', message);
        return this.chatRepo.deleteChat(chatId);
    }

    async getAllChats(): Promise<ChatResponseDTO[]> {
        const chats = await this.chatRepo.getAllChats();
        if (!chats) {
            throw new Error('No chats found');
        }
        const message = {
            chatId: chats[0].id,
            userId: chats[0].user_id,
            subjectId: chats[0].subject_id,
            message: chats[0].message
        };

        await BARRAMENTO.publish('chat.exchange', 'chat.created', message);
        console.log('Message published to RabbitMQ:', message);
        return chats;
      }

    async getChatsByUserId(userId: number): Promise<ChatResponseDTO[]> {
        const chats = await this.chatRepo.getChatsByUserId(userId);
        if (!chats) {
            throw new Error(`No chats found for user with ID ${userId}`);
        }

        const message = {
            chatId: chats[0].id,
            userId: chats[0].user_id,
            subjectId: chats[0].subject_id,
            message: chats[0].message
        };

        await BARRAMENTO.publish('chat.exchange', 'chat.created', message);
        console.log('Message published to RabbitMQ:', message);
        return chats;
    }

    async getChatsBySubjectId(subjectId: number): Promise<ChatResponseDTO[]> {
        const chats = await this.chatRepo.getChatBySubjectId(subjectId);
        if (!chats) {
            throw new Error(`No chats found for subject with ID ${subjectId}`);
        }
        const message = {
            chatId: chats[0].id,
            userId: chats[0].user_id,
            subjectId: chats[0].subject_id,
            message: chats[0].message
        };
        await BARRAMENTO.publish('chat.exchange', 'chat.created', message);
        console.log('Message published to RabbitMQ:', message);
        return chats;
    }
}