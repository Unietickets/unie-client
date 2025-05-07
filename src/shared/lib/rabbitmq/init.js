/**
 * Инициализация RabbitMQ при запуске приложения
 */
import rabbitmqService from './index';

/**
 * Инициализация RabbitMQ и создание основных очередей
 */
export async function initRabbitMQ() {
  try {
    // Инициализация подключения к RabbitMQ
    await rabbitmqService.init();
    
    // Создаем основные очереди, которые будут использоваться в приложении
    await rabbitmqService.createQueue('events', { durable: true });
    await rabbitmqService.createQueue('tickets', { durable: true });
    await rabbitmqService.createQueue('deals', { durable: true });
    await rabbitmqService.createQueue('notifications', { durable: true });
    
    // Создаем основные обмены (exchanges)
    await rabbitmqService.createExchange('events.exchange', 'topic');
    await rabbitmqService.createExchange('notifications.exchange', 'fanout');
    
    console.log('RabbitMQ initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize RabbitMQ:', error);
    return false;
  }
}

/**
 * Закрытие соединения с RabbitMQ при завершении работы приложения
 */
export async function closeRabbitMQ() {
  try {
    await rabbitmqService.close();
    console.log('RabbitMQ connection closed');
    return true;
  } catch (error) {
    console.error('Failed to close RabbitMQ connection:', error);
    return false;
  }
}
