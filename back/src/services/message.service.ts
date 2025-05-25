import MessageRepository from "../repositories/message.repository";
import { MessageCreateDTO} from "../models/message.model";
import { MessageUpdateDTO } from "../models/message.model";
import { MessageDeleteDTO } from "../models/message.model";
import { MesssageGetByChatIdDTO } from "../models/message.model";
import { Message } from "../models/message.model";
import { MessageBus } from "../core/MessageBus";
import { BARRAMENTO } from "../app";

export default class MessageService {
    private messageRepo = new MessageRepository();

    async createMessage(messageData: MessageCreateDTO): Promise<Message> {
    const messagecreated = await this.messageRepo.createMessage(messageData);

    const message = {
        chatId: messageData.chat_id,
        userId: messageData.author_id,
        message: messageData.content

    };
    console.log('Mensagem criada:', message);
    // Certifique-se de usar o mesmo nome do exchange e routing key configurado no consumidor
    await BARRAMENTO.publish(
        'message_exchange',      // nome correto do exchange
        'message.created',       // routing key
        message,
    );

    console.log('Message published to RabbitMQ:', message);

    return messagecreated;
}


    async updateMessage(messageId: number, messageData: MessageUpdateDTO): Promise<Message> {
        const updatedMessage = await this.messageRepo.getMessageById(messageId);
        if (!updatedMessage) {
            throw new Error(`Message with ID ${messageId} not found`);
        }

        //publish the message to RabbitMQ
        const message = {
            chatId: updatedMessage.chat_id,
            userId: updatedMessage.author_id,
            message: messageData.content
        };
        await BARRAMENTO.publish('message.exchange', 'message.updated', message);
        console.log('Message published to RabbitMQ:', message);
        return updatedMessage;
    }

    async deleteMessage(messageId: number): Promise<void> {
        const deletedMessage = await this.messageRepo.deleteMessage(messageId);
        
        //publish the message to RabbitMQ
        const message = {

        };

        await BARRAMENTO.publish('message.exchange', 'message.deleted', message);
        console.log('Message published to RabbitMQ:', message);
        
    }

    async getMessagesByChatId(chatId: number): Promise<Message[]> {
        const messages = await this.messageRepo.getMessagesByChatId(chatId);
        if (!messages) {
            throw new Error(`No messages found for chat ID ${chatId}`);
        }

        //publish the message to RabbitMQ
        const message = {
            chatId: chatId
        };
        await BARRAMENTO.publish('message.exchange', 'message.retrieved', message);
        console.log('Message published to RabbitMQ:', message);
        return messages;
    }

    async getMessageById(messageId: number): Promise<Message | null> {
        const message = await this.messageRepo.getMessageById(messageId);
        if (!message) {
            throw new Error(`Message with ID ${messageId} not found`);
        }
        //publish the message to RabbitMQ
        const messageData = {
            messageId: messageId
        };
        await BARRAMENTO.publish('message.exchange', 'message.retrieved', messageData);
        console.log('Message published to RabbitMQ:', messageData);


        return message;
    }

    async getAllMessages(): Promise<Message[]> {
        const messages = await this.messageRepo.getAllMessages();
        if (!messages) {
            throw new Error('No messages found');
        }

        //publish the message to RabbitMQ
        const message = {
            allMessages: true
        };

        await BARRAMENTO.publish('message.exchange', 'message.retrieved', message);
        console.log('Message published to RabbitMQ:', message);
        return messages;
    }
}
