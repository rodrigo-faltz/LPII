import ChatRepository from '../repositories/chat.repository';
import { ChatCreateDTO, ChatResponseDTO } from '../models/chat.model';

export default class ChatService {
  constructor(private chatRepo: ChatRepository = new ChatRepository()) {}

  async createChat(chatData: ChatCreateDTO): Promise<ChatResponseDTO> {
    
    
    return this.chatRepo.createChat(chatData);
  }

  async getChatById(chatId: number): Promise<ChatResponseDTO> {

    const chat = await this.chatRepo.getChatById(chatId);
    if (!chat) {
      throw new Error(`Chat with ID ${chatId} not found`);
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
        return this.chatRepo.deleteChat(chatId);
    }

    async getAllChats(): Promise<ChatResponseDTO[]> {
        return this.chatRepo.getAllChats();
    }

    async getChatsByUserId(userId: number): Promise<ChatResponseDTO[]> {
        return this.chatRepo.getChatsByUserId(userId);
    }

    async getChatsBySubjectId(subjectId: number): Promise<ChatResponseDTO[]> {
        return this.chatRepo.getChatBySubjectId(subjectId);
    }
}