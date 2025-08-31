/**
 * Инициализация RabbitMQ на стороне сервера
 * Этот файл должен выполняться только на сервере
 */

// Проверяем, что код выполняется на сервере
if (typeof window === 'undefined') {
  console.log('Starting server-side RabbitMQ initialization...');

  // Используем динамический импорт для избежания ошибок в Edge Runtime
  const initRabbitMQ = async () => {
    try {
      // Импортируем модули только на сервере
      const { initRabbitMQ } = await import("../shared/lib/rabbitmq/init.js");
      const { setupTicketQueueConsumer } = await import("./entities/ticket/services/ticketQueue");
      const { setupEventQueueConsumer } = await import("./entities/event/services/eventQueue");

      // Инициализируем подключение к RabbitMQ
      await initRabbitMQ();

      // Настраиваем обработчики сообщений
      await setupTicketQueueConsumer(async (message) => {
        // Обработка сообщений о билетах
        console.log('Processing ticket message:', message);
      });

      await setupEventQueueConsumer(async (message) => {
        // Обработка сообщений о событиях
        console.log('Processing event message:', message);
      });

      console.log('RabbitMQ initialized successfully');
    } catch (error) {
      console.error('Failed to initialize RabbitMQ:', error);
    }
  };

  // Запускаем инициализацию с задержкой
  setTimeout(() => {
    initRabbitMQ();
  }, 3000);
}
