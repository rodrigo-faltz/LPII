// src/message-bus.ts

import amqp, { ChannelModel, Connection, Channel } from 'amqplib';

export type RabbitMQConfig = {
  hostname: string;
  port: number;
  username: string;
  password: string;
};

export class MessageBus {
  private model!: ChannelModel;      // <-- keep the ChannelModel
  public connection!: Connection;    // <-- expose low-level Connection if needed
  private channel!: Channel;
  private config: RabbitMQConfig;

  constructor(config?: Partial<RabbitMQConfig>) {
    this.config = {
      hostname: config?.hostname ?? 'localhost',
      port:     config?.port     ?? 5672,
      username: config?.username ?? 'guest',
      password: config?.password ?? 'guest',
    };
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
    await this.channel.assertExchange(exchange, 'topic', { durable: true });
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
}
