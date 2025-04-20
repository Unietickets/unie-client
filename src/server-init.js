/**
 * Этот файл содержит код для инициализации серверных компонентов
 * и не должен импортироваться в клиентский код
 */

// Проверяем, что код выполняется на сервере
if (typeof window === 'undefined') {
  // Динамический импорт для избежания ошибок в Edge Runtime
  import('./server/rabbitmq-init.js')
    .then(() => {
      console.log('RabbitMQ initialization module loaded');
    })
    .catch((error) => {
      console.error('Failed to load RabbitMQ initialization module:', error);
    });
}
