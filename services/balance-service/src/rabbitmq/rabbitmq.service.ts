import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('BALANCE_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    try {
      await this.client.connect();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
    }
  }

  /**
   * Отправляет сообщение в очередь RabbitMQ
   * @param pattern Шаблон сообщения (команда)
   * @param data Данные сообщения
   * @returns Результат выполнения команды
   */
  async send(pattern: string, data: any): Promise<any> {
    try {
      return await lastValueFrom(this.client.send(pattern, data));
    } catch (error) {
      console.error(`Error sending message to pattern ${pattern}:`, error);
      throw error;
    }
  }

  /**
   * Публикует событие в RabbitMQ
   * @param pattern Шаблон события
   * @param data Данные события
   */
  async emit(pattern: string, data: any): Promise<void> {
    try {
      this.client.emit(pattern, data);
      console.log(`Event ${pattern} emitted with data:`, data);
    } catch (error) {
      console.error(`Error emitting event ${pattern}:`, error);
      throw error;
    }
  }
}
