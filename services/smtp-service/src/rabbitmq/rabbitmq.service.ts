import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(
    @Inject('SMTP_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    try {
      await this.client.connect();
      this.logger.log('Connected to RabbitMQ');
    } catch (error) {
      this.logger.error(`Failed to connect to RabbitMQ: ${error.message}`);
      throw error;
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
      this.logger.log(`Sending message to pattern ${pattern} with data: ${JSON.stringify(data)}`);
      return await lastValueFrom(this.client.send(pattern, data));
    } catch (error) {
      this.logger.error(`Error sending message to pattern ${pattern}: ${error.message}`);
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
      this.logger.log(`Emitting event ${pattern} with data: ${JSON.stringify(data)}`);
      this.client.emit(pattern, data);
    } catch (error) {
      this.logger.error(`Error emitting event ${pattern}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Проверяет состояние подключения к RabbitMQ
   * @returns true, если подключение активно
   */
  async isConnected(): Promise<boolean> {
    try {
      const result = await this.send('health.check', {});
      return !!result;
    } catch (error) {
      this.logger.error(`RabbitMQ connection check failed: ${error.message}`);
      return false;
    }
  }
}
