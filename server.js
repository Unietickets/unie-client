/**
 * Кастомный сервер Next.js для инициализации RabbitMQ
 */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Определяем режим работы (development или production)
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Подготавливаем Next.js приложение
app.prepare().then(() => {
  // Инициализируем RabbitMQ после запуска сервера
  try {
    console.log('Initializing RabbitMQ...');
    // Динамически импортируем модуль инициализации RabbitMQ
    // Используем require() вместо import, так как это серверный код Node.js
    setTimeout(() => {
      try {
        // Используем require.resolve для проверки существования модуля
        require.resolve('./src/server/rabbitmq-init');
        // Если модуль существует, импортируем его
        require('./src/server/rabbitmq-init');
        console.log('RabbitMQ initialization module loaded');
      } catch (error) {
        console.error('Failed to load RabbitMQ initialization module:', error);
      }
    }, 3000); // Даем серверу 3 секунды на запуск перед инициализацией RabbitMQ
  } catch (error) {
    console.error('Error during RabbitMQ initialization:', error);
  }

  // Создаем HTTP сервер
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
