/**
 * RabbitMQ сервис для работы с брокером сообщений
 */
import amqplib from 'amqplib';

class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.url = process.env.RABBITMQ_URL || 'amqp://admin:password@localhost:5672';
    this.isConnected = false;
    this.reconnectTimeout = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.reconnectInterval = 5000; // 5 секунд
  }

  /**
   * Инициализация подключения к RabbitMQ
   */
  async init() {
    try {
      if (this.isConnected) return;
      
      console.log('Connecting to RabbitMQ...');
      this.connection = await amqplib.connect(this.url);
      
      this.connection.on('error', (err) => {
        console.error('RabbitMQ connection error:', err.message);
        this.reconnect();
      });
      
      this.connection.on('close', () => {
        console.warn('RabbitMQ connection closed');
        this.isConnected = false;
        this.reconnect();
      });
      
      this.channel = await this.connection.createChannel();
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('Connected to RabbitMQ');
      
      return this.channel;
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error.message);
      this.reconnect();
      return null;
    }
  }

  /**
   * Переподключение к RabbitMQ в случае ошибки
   */
  reconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(`Failed to reconnect to RabbitMQ after ${this.maxReconnectAttempts} attempts`);
      return;
    }
    
    this.reconnectAttempts++;
    
    this.reconnectTimeout = setTimeout(async () => {
      console.log(`Attempting to reconnect to RabbitMQ (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      await this.init();
    }, this.reconnectInterval);
  }

  /**
   * Создание очереди
   * @param {string} queueName - Название очереди
   * @param {Object} options - Опции для создания очереди
   */
  async createQueue(queueName, options = {}) {
    if (!this.isConnected) {
      await this.init();
    }
    
    try {
      await this.channel.assertQueue(queueName, {
        durable: true,
        ...options
      });
      
      console.log(`Queue ${queueName} created or already exists`);
      return true;
    } catch (error) {
      console.error(`Error creating queue ${queueName}:`, error.message);
      return false;
    }
  }

  /**
   * Отправка сообщения в очередь
   * @param {string} queueName - Название очереди
   * @param {Object} message - Сообщение для отправки
   * @param {Object} options - Опции для отправки сообщения
   */
  async sendToQueue(queueName, message, options = {}) {
    if (!this.isConnected) {
      await this.init();
    }
    
    try {
      // Создаем очередь, если она не существует
      await this.createQueue(queueName);
      
      // Отправляем сообщение
      const success = this.channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true, // Сообщение сохраняется даже при перезапуске брокера
          ...options
        }
      );
      
      if (success) {
        console.log(`Message sent to queue ${queueName}`);
      } else {
        console.warn(`Failed to send message to queue ${queueName}`);
      }
      
      return success;
    } catch (error) {
      console.error(`Error sending message to queue ${queueName}:`, error.message);
      return false;
    }
  }

  /**
   * Подписка на сообщения из очереди
   * @param {string} queueName - Название очереди
   * @param {Function} callback - Функция обработки сообщения
   * @param {Object} options - Опции для подписки
   */
  async consumeFromQueue(queueName, callback, options = {}) {
    if (!this.isConnected) {
      await this.init();
    }
    
    try {
      // Создаем очередь, если она не существует
      await this.createQueue(queueName);
      
      // Подписываемся на сообщения
      await this.channel.consume(
        queueName,
        async (msg) => {
          if (msg) {
            try {
              const content = JSON.parse(msg.content.toString());
              await callback(content, msg);
              this.channel.ack(msg); // Подтверждаем обработку сообщения
            } catch (error) {
              console.error(`Error processing message from queue ${queueName}:`, error.message);
              // Возвращаем сообщение в очередь, если произошла ошибка
              this.channel.nack(msg);
            }
          }
        },
        {
          noAck: false, // Требуем явного подтверждения обработки сообщения
          ...options
        }
      );
      
      console.log(`Consumer registered for queue ${queueName}`);
      return true;
    } catch (error) {
      console.error(`Error consuming from queue ${queueName}:`, error.message);
      return false;
    }
  }

  /**
   * Создание обмена сообщениями (exchange)
   * @param {string} exchangeName - Название обмена
   * @param {string} type - Тип обмена (direct, fanout, topic, headers)
   * @param {Object} options - Опции для создания обмена
   */
  async createExchange(exchangeName, type = 'direct', options = {}) {
    if (!this.isConnected) {
      await this.init();
    }
    
    try {
      await this.channel.assertExchange(exchangeName, type, {
        durable: true,
        ...options
      });
      
      console.log(`Exchange ${exchangeName} created or already exists`);
      return true;
    } catch (error) {
      console.error(`Error creating exchange ${exchangeName}:`, error.message);
      return false;
    }
  }

  /**
   * Публикация сообщения в обмен
   * @param {string} exchangeName - Название обмена
   * @param {string} routingKey - Ключ маршрутизации
   * @param {Object} message - Сообщение для отправки
   * @param {Object} options - Опции для публикации сообщения
   */
  async publishToExchange(exchangeName, routingKey, message, options = {}) {
    if (!this.isConnected) {
      await this.init();
    }
    
    try {
      // Создаем обмен, если он не существует
      await this.createExchange(exchangeName);
      
      // Публикуем сообщение
      const success = this.channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true,
          ...options
        }
      );
      
      if (success) {
        console.log(`Message published to exchange ${exchangeName} with routing key ${routingKey}`);
      } else {
        console.warn(`Failed to publish message to exchange ${exchangeName}`);
      }
      
      return success;
    } catch (error) {
      console.error(`Error publishing message to exchange ${exchangeName}:`, error.message);
      return false;
    }
  }

  /**
   * Отправка сообщения с паттерном в очередь (для микросервисов NestJS)
   * @param {string} queueName - Название очереди
   * @param {string} pattern - Паттерн сообщения (для маршрутизации в NestJS)
   * @param {Object} data - Данные сообщения
   * @param {Object} options - Опции для отправки сообщения
   */
  async sendMessageWithPattern(queueName, pattern, data, options = {}) {
    console.log(`Sending message with pattern '${pattern}' to queue '${queueName}'`);
    
    if (!this.isConnected) {
      await this.init();
    }
    
    try {
      // Создаем очередь, если она не существует
      await this.createQueue(queueName);
      
      // Формируем сообщение в формате, который ожидает NestJS
      const message = {
        pattern,
        data
      };
      
      console.log(`Message content: ${JSON.stringify(message)}`);
      
      // Отправляем сообщение
      const success = this.channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true, // Сообщение сохраняется даже при перезапуске брокера
          ...options
        }
      );
      
      if (success) {
        console.log(`Message with pattern '${pattern}' sent to queue '${queueName}' successfully`);
      } else {
        console.warn(`Failed to send message with pattern '${pattern}' to queue '${queueName}'`);
      }
      
      return success;
    } catch (error) {
      console.error(`Error sending message with pattern '${pattern}' to queue '${queueName}':`, error.message);
      return false;
    }
  }

  /**
   * Закрытие соединения с RabbitMQ
   */
  async close() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      
      if (this.connection) {
        await this.connection.close();
      }
      
      this.isConnected = false;
      console.log('Disconnected from RabbitMQ');
    } catch (error) {
      console.error('Error closing RabbitMQ connection:', error.message);
    }
  }
}

// Создаем синглтон для использования во всем приложении
const rabbitmqService = new RabbitMQService();

export default rabbitmqService;
