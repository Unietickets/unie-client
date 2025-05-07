'use server';

import rabbitmqService from '@/shared/lib/rabbitmq';

/**
 * Отправка билета в очередь для обработки
 * @param {Object} ticket - Данные билета
 * @param {string} action - Действие (create, update, delete)
 */
export const sendTicketToQueue = async (ticket, action) => {
  try {
    const message = {
      ticket,
      action,
      timestamp: new Date().toISOString()
    };

    await rabbitmqService.sendToQueue('tickets', message);
    console.log(`Ticket ${action} message sent to queue`);
    return true;
  } catch (error) {
    console.error('Error sending ticket to queue:', error);
    return false;
  }
};

/**
 * Публикация события изменения статуса билета
 * @param {Object} ticket - Данные билета
 * @param {string} oldStatus - Предыдущий статус
 * @param {string} newStatus - Новый статус
 */
export const publishTicketStatusChange = async (ticket, oldStatus, newStatus) => {
  try {
    const message = {
      ticketId: ticket.id,
      eventId: ticket.event_id,
      userId: ticket.user_id,
      oldStatus,
      newStatus,
      timestamp: new Date().toISOString()
    };

    await rabbitmqService.publishToExchange(
      'events.exchange',
      'ticket.status.changed',
      message
    );
    
    console.log(`Ticket status change published: ${oldStatus} -> ${newStatus}`);
    return true;
  } catch (error) {
    console.error('Error publishing ticket status change:', error);
    return false;
  }
};

/**
 * Настройка обработчика сообщений из очереди билетов
 * @param {Function} callback - Функция обработки сообщения
 */
export const setupTicketQueueConsumer = async (callback) => {
  try {
    await rabbitmqService.consumeFromQueue('tickets', async (message) => {
      console.log('Received ticket message:', message);
      await callback(message);
    });
    
    console.log('Ticket queue consumer setup complete');
    return true;
  } catch (error) {
    console.error('Error setting up ticket queue consumer:', error);
    return false;
  }
};
