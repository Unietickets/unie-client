'use server';

import rabbitmqService from '@/shared/lib/rabbitmq';

/**
 * Отправка события в очередь для обработки
 * @param {Object} event - Данные события
 * @param {string} action - Действие (create, update, delete)
 */
export const sendEventToQueue = async (event, action) => {
  try {
    const message = {
      event,
      action,
      timestamp: new Date().toISOString()
    };

    await rabbitmqService.sendToQueue('events', message);
    console.log(`Event ${action} message sent to queue`);
    return true;
  } catch (error) {
    console.error('Error sending event to queue:', error);
    return false;
  }
};

/**
 * Публикация обновления события
 * @param {Object} event - Данные события
 * @param {Object} changes - Изменения в событии
 */
export const publishEventUpdate = async (event, changes) => {
  try {
    const message = {
      eventId: event.id,
      changes,
      timestamp: new Date().toISOString()
    };

    await rabbitmqService.publishToExchange(
      'events.exchange',
      'event.updated',
      message
    );
    
    console.log(`Event update published for event ID: ${event.id}`);
    return true;
  } catch (error) {
    console.error('Error publishing event update:', error);
    return false;
  }
};

/**
 * Публикация уведомления о новом событии
 * @param {Object} event - Данные события
 */
export const publishNewEventNotification = async (event) => {
  try {
    const message = {
      eventId: event.id,
      name: event.name,
      eventDate: event.event_date,
      location: event.location,
      timestamp: new Date().toISOString()
    };

    await rabbitmqService.publishToExchange(
      'notifications.exchange',
      '',  // При использовании fanout exchange, routing key не используется
      message
    );
    
    console.log(`New event notification published for event ID: ${event.id}`);
    return true;
  } catch (error) {
    console.error('Error publishing new event notification:', error);
    return false;
  }
};

/**
 * Настройка обработчика сообщений из очереди событий
 * @param {Function} callback - Функция обработки сообщения
 */
export const setupEventQueueConsumer = async (callback) => {
  try {
    await rabbitmqService.consumeFromQueue('events', async (message) => {
      console.log('Received event message:', message);
      await callback(message);
    });
    
    console.log('Event queue consumer setup complete');
    return true;
  } catch (error) {
    console.error('Error setting up event queue consumer:', error);
    return false;
  }
};
