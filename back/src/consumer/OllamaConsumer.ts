import { ollamaService } from '../services/ollama.service';
import { MessageCreateDTO } from '../models/message.model';
import MessageRepository from '../repositories/message.repository';
import { BARRAMENTO } from '../app';


// Importando o repositório de mensagens
const messageRepository = new MessageRepository();

const MESSAGE_QUEUE = 'message.queue';
const BOT_AUTHOR_ID = 0; // ID fixo para o bot, ajuste conforme seu sistema

async function consumeMessageQueue() {

if (!BARRAMENTO.channel) {
  throw new Error('BARRAMENTO não inicializado. Certifique-se de chamar BARRAMENTO.connect() antes.');
}


  await BARRAMENTO.channel.assertQueue(MESSAGE_QUEUE, { durable: true });

  console.log(`[*] Aguardando mensagens na fila ${MESSAGE_QUEUE}...`);

  BARRAMENTO.channel.consume(MESSAGE_QUEUE, async (msg) => {
    if (msg === null) return;

    try {
      const content = JSON.parse(msg.content.toString());
      console.log('[x] Mensagem recebida da fila:', content);

      // Exemplo da estrutura esperada da mensagem (do publish):
      // { chatId, userId, subjectId, message }
      const userQuestion = content.message;
      const chatId = content.chatId;

      // Chama Ollama para gerar resposta
      const botAnswer = await ollamaService.generateResponse(userQuestion);

      console.log('[*] Resposta do Ollama gerada:', botAnswer);

      // Salva a resposta no banco como nova mensagem no chat
      const newMessageData: MessageCreateDTO = {
        content: botAnswer,
        chat_id: chatId,
        author_id: BOT_AUTHOR_ID,
      };

      const createdMessage = await messageRepository.createMessage(newMessageData);

      console.log('[*] Mensagem do bot salva no banco:', createdMessage);

      // Confirma que a mensagem foi processada
      BARRAMENTO.channel.ack(msg);

    } catch (err) {
      console.error('[!] Erro ao processar mensagem da fila:', err);
      // Dependendo do seu caso, pode fazer channel.nack(msg) para reprocessar depois
      BARRAMENTO.channel.nack(msg, false, false); // descarta a mensagem para não travar a fila
    }
  });
}

consumeMessageQueue().catch(console.error);

export default consumeMessageQueue;