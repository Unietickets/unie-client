'use server';

import { initRabbitMQ } from '@/shared/lib/rabbitmq/init';
import { setupTicketQueueConsumer } from '@/entities/ticket/services/ticketQueue';
import { setupEventQueueConsumer } from '@/entities/event/services/eventQueue';

// Флаг для отслеживания состояния инициализации
let isInitialized = false;

/**
 * Инициализация RabbitMQ на стороне сервера
 * Эта функция будет вызываться при запуске сервера
 */
export async function initializeRabbitMQServer() {
  // Проверяем, не была ли уже выполнена инициализация
  if (isInitialized) return true;
  
  try {
    console.log('Starting RabbitMQ initialization on server...');
    
    // Инициализируем подключение к RabbitMQ
    await initRabbitMQ();
    
    // Настраиваем обработчики сообщений
    await setupTicketQueueConsumer(async (message) => {
      // Обработка сообщений о билетах
      const { ticket, action } = message;
      console.log(`Processing ticket ${action} for ticket:`, ticket);
      
      // Здесь можно добавить логику обработки сообщений
      // Например, обновление кэша, отправка уведомлений и т.д.
    });
    
    await setupEventQueueConsumer(async (message) => {
      // Обработка сообщений о событиях
      const { event, action } = message;
      console.log(`Processing event ${action} for event:`, event);
      
      // Здесь можно добавить логику обработки сообщений
    });
    
    isInitialized = true;
    console.log('RabbitMQ initialization completed successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize RabbitMQ on server:', error);
    return false;
  }
}
