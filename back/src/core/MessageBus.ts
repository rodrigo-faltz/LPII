// src/message-bus.ts

import amqp, { ChannelModel, Connection, Channel } from 'amqplib';
import { ollamaService } from '../services/ollama.service'; // Adjust the import path as necessary

export type RabbitMQConfig = {
  hostname: string;
  port: number;
  username: string;
  password: string;
};

export class MessageBus {
  private model!: ChannelModel;      // <-- keep the ChannelModel
  public connection!: Connection;    // <-- expose low-level Connection if needed
  public channel!: Channel;
  private config: RabbitMQConfig;

  constructor(config?: Partial<RabbitMQConfig>) {
    this.config = {
      hostname: config?.hostname ?? 'localhost',
      port:     config?.port     ?? 5672,
      username: config?.username ?? 'guest',
      password: config?.password ?? 'guest',
    };
  }

 // src/message-bus.ts

async initQueues(): Promise<void> {
  // Associações para subject
  await this.channel.assertExchange('subject.exchange', 'topic', { durable: true });

  const subjectQueue = 'subject.queue';
  await this.channel.assertQueue(subjectQueue, { durable: true });

  const subjectRoutingKeys = [
    'subject.created',
    'subject.updated',
    'subject.deleted',
    'subject.retrieved',
  ];

  for (const key of subjectRoutingKeys) {
    await this.channel.bindQueue(subjectQueue, 'subject.exchange', key);
  }

  // Associações para chat
  await this.channel.assertExchange('chat.exchange', 'topic', { durable: true });

  const chatQueue = 'chat.queue';
  await this.channel.assertQueue(chatQueue, { durable: true });

  const chatRoutingKeys = [
    'chat.created',
    'chat.updated',
    'chat.deleted',
    'chat.retrieved',
  ];

  for (const key of chatRoutingKeys) {
    await this.channel.bindQueue(chatQueue, 'chat.exchange', key);
  }

  console.log('Queues and exchanges initialized');

  // Associações para message
  await this.channel.assertExchange('message.exchange', 'topic', { durable: true });
  const messageQueue = 'message.queue';
  await this.channel.assertQueue(messageQueue, { durable: true });

  const messageRoutingKeys = [
    'message.created',
    'message.updated',
    'message.deleted',
    'message.retrieved',
  ];

  for (const key of messageRoutingKeys) {
    await this.channel.bindQueue(messageQueue, 'message.exchange', key);
  }

  // Associações para user
  await this.channel.assertExchange('user.exchange', 'topic', { durable: true });
  const userQueue = 'user.queue';
  await this.channel.assertQueue(userQueue, { durable: true });
  const userRoutingKeys = [
    'user.created',
    'user.login',
    'user.profile',
    'user.updated',
    'user.deleted',
  ];
  for (const key of userRoutingKeys) {
    await this.channel.bindQueue(userQueue, 'user.exchange', key);
  }

}


  async connect(): Promise<void> {
    if (this.model) {
      return; // already connected
    }

    // 1) amqp.connect() returns a ChannelModel
    this.model = await amqp.connect({
      protocol: 'amqp',
      hostname: this.config.hostname,
      port:     this.config.port,
      username: this.config.username,
      password: this.config.password,
    });

    // 2) If you still need the raw Connection object:
    this.connection = this.model.connection;

    // 3) Create your Channel for publishing
    this.channel = await this.model.createChannel();
  }

  async publish(exchange: string, routingKey: string, message: any): Promise<void> {
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
    );
  }

  async close(): Promise<void> {
    // 1. Close the publishing channel
    await this.channel.close();
    // 2. Close the underlying ChannelModel (this tears down the socket)
    await this.model.close();
  }

   async consumeMessageCreated(): Promise<void> {
    await this.channel.consume('message.queue', async (msg) => {
      if (!msg) return;

      const routingKey = msg.fields.routingKey;
      const content = msg.content.toString();

      if (routingKey === 'message.created') {
        const payload = JSON.parse(content);
        const prompt = payload.message;

        console.log('📨 Mensagem recebida do usuário:', prompt);

        try {
          const resposta = await ollamaService.generateResponse(prompt);
          console.log('🧠 Resposta do Ollama:', resposta);

          // Aqui você pode publicar a resposta em outra exchange ou salvar no banco
          const respostaPayload = {
            chatId: payload.chatId,
            resposta,
          };

          await this.channel.publish(
            'message.exchange',
            'message.responded',
            Buffer.from(JSON.stringify(respostaPayload))
          );

          console.log('📤 Resposta publicada no chat.responded');
        } catch (err) {
          console.error('❌ Erro ao gerar resposta com o Ollama:', err);
        }
      }

      this.channel.ack(msg);
    });

    console.log('👂 Consumidor da fila chat.queue iniciado');
  }
}
