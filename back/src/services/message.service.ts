import MessageRepository from "../repositories/message.repository";
import { MessageCreateDTO} from "../models/message.model";
import { MessageUpdateDTO } from "../models/message.model";
import { MessageDeleteDTO } from "../models/message.model";
import { MesssageGetByChatIdDTO } from "../models/message.model";
import { Message } from "../models/message.model";

export default class MessageService {
    constructor(private messageRepo: MessageRepository = new MessageRepository()) {}
    
    async createMessage(messageData: MessageCreateDTO): Promise<Message> {
        return this.messageRepo.createMessage(messageData);
    }
    
    async updateMessage(messageId: number, messageData: MessageUpdateDTO): Promise<Message> {
        return this.messageRepo.updateMessage(messageId, messageData);
    }
    
    async deleteMessage(messageId: number): Promise<void> {
        return this.messageRepo.deleteMessage(messageId);
    }
    
    async getMessagesByChatId(chatId: number): Promise<Message[]> {
        return this.messageRepo.getMessagesByChatId(chatId);
    }

    async getMessageById(messageId: number): Promise<Message | null> {
        return this.messageRepo.getMessageById(messageId);
    }

    async getAllMessages(): Promise<Message[]> {
        return this.messageRepo.getAllMessages();
    }
}
