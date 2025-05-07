'use server';

import { initializeRabbitMQServer } from '@/app/api/rabbitmq/init-server';

// Автоматически инициализируем RabbitMQ при импорте этого модуля
// Это будет происходить при запуске сервера
if (process.env.NODE_ENV !== 'test') {
  console.log('Auto-initializing RabbitMQ...');
  
  // Используем setTimeout, чтобы не блокировать запуск сервера
  setTimeout(async () => {
    try {
      await initializeRabbitMQServer();
    } catch (error) {
      console.error('Failed to auto-initialize RabbitMQ:', error);
    }
  }, 2000); // Даем серверу 2 секунды на запуск перед инициализацией RabbitMQ
}

export default initializeRabbitMQServer;
