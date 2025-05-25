import { ollamaService } from '../services/ollama.service';
import { MessageCreateDTO } from '../models/message.model';
import MessageRepository from '../repositories/message.repository';
import { BARRAMENTO } from '../app';

const messageRepository = new MessageRepository();

const EXCHANGE_NAME = 'message_exchange';
const ROUTING_KEY = 'message.created';
const QUEUE_NAME = 'message_created_queue'; // pode ser exclusivo ou durável, dependendo do caso
const BOT_AUTHOR_ID = 0;

async function consumeMessageQueue() {
  if (!BARRAMENTO.channel) {
    throw new Error('BARRAMENTO não inicializado. Certifique-se de chamar BARRAMENTO.connect() antes.');
  }

  const channel = BARRAMENTO.channel;

  // 1. Declara o exchange (tipo direct)
  await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

  // 2. Declara a fila que vai escutar apenas 'message.created'
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  // 3. Faz o binding da fila com a routing key específica
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);

  console.log(`[*] Aguardando mensagens com routing key "${ROUTING_KEY}" na fila "${QUEUE_NAME}"...`);

  // 4. Começa a consumir
  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg === null) return;

    try {
      const content = JSON.parse(msg.content.toString());
      console.log('[*] Conteúdo da mensagem:', content);
      console.log('[*] Conteúdo da authorId:', content.userId);

      // Verificar se NÃO é uma mensagem do bot
      if(content.userId !== BOT_AUTHOR_ID && content.userId !== undefined) {
        console.log('[x] Processando mensagem do usuário:', content);

        const userQuestion = content.message;
        const chatId = content.chatId;
      
        const botAnswer = await ollamaService.generateResponse(userQuestion);
      
        console.log('[*] Resposta do Ollama gerada:', botAnswer);
      
        const newMessageData: MessageCreateDTO = {
          content: botAnswer,
          chat_id: chatId,
          author_id: BOT_AUTHOR_ID,
        };
      
        const createdMessage = await messageRepository.createMessage(newMessageData);
        console.log('[*] Mensagem do bot salva no banco:', createdMessage);
      } else {
        console.log('[!] Ignorando mensagem do bot para evitar loop infinito.');
      }

      // Sempre confirma o recebimento da mensagem
      channel.ack(msg);
    } catch (err) {
      console.error('[!] Erro ao processar mensagem da fila:', err);
      channel.nack(msg, false, false); // descarta a mensagem
    }
  });
}

export default consumeMessageQueue;
