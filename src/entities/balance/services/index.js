'use server';

import rabbitmqService from '@/shared/lib/rabbitmq';

/**
 * Получение баланса пользователя
 * @param {Object} params - Параметры запроса
 * @param {number} params.userId - ID пользователя
 * @returns {Promise<Object>} - Информация о балансе пользователя
 */
export const getUserBalance = async ({ userId }) => {
  try {
    // Отправляем запрос к микросервису баланса через RabbitMQ
    const response = await rabbitmqService.sendToQueue('balance_queue', {
      pattern: 'balance.get',
      data: { userId }
    });

    return response;
  } catch (error) {
    console.error('Error getting user balance:', error);
    throw new Error(`Failed to get user balance: ${error.message}`);
  }
};

/**
 * Пополнение баланса пользователя
 * @param {Object} params - Параметры запроса
 * @param {number} params.userId - ID пользователя
 * @param {string} params.amount - Сумма пополнения
 * @returns {Promise<Object>} - Обновленный баланс пользователя
 */
export const depositToUserBalance = async ({ userId, amount }) => {
  try {
    // Отправляем запрос к микросервису баланса через RabbitMQ
    const response = await rabbitmqService.sendToQueue('balance_queue', {
      pattern: 'balance.deposit',
      data: { userId, amount }
    });

    return response;
  } catch (error) {
    console.error('Error depositing to user balance:', error);
    throw new Error(`Failed to deposit to user balance: ${error.message}`);
  }
};

/**
 * Списание с баланса пользователя
 * @param {Object} params - Параметры запроса
 * @param {number} params.userId - ID пользователя
 * @param {string} params.amount - Сумма списания
 * @returns {Promise<Object>} - Обновленный баланс пользователя
 */
export const withdrawFromUserBalance = async ({ userId, amount }) => {
  try {
    // Отправляем запрос к микросервису баланса через RabbitMQ
    const response = await rabbitmqService.sendToQueue('balance_queue', {
      pattern: 'balance.withdraw',
      data: { userId, amount }
    });

    return response;
  } catch (error) {
    console.error('Error withdrawing from user balance:', error);
    throw new Error(`Failed to withdraw from user balance: ${error.message}`);
  }
};

/**
 * Резервирование средств на балансе пользователя
 * @param {Object} params - Параметры запроса
 * @param {number} params.userId - ID пользователя
 * @param {string} params.amount - Сумма резервирования
 * @returns {Promise<Object>} - Обновленный баланс пользователя
 */
export const reserveUserBalance = async ({ userId, amount }) => {
  try {
    // Отправляем запрос к микросервису баланса через RabbitMQ
    const response = await rabbitmqService.sendToQueue('balance_queue', {
      pattern: 'balance.reserve',
      data: { userId, amount }
    });

    return response;
  } catch (error) {
    console.error('Error reserving user balance:', error);
    throw new Error(`Failed to reserve user balance: ${error.message}`);
  }
};

/**
 * Подтверждение резервирования средств
 * @param {Object} params - Параметры запроса
 * @param {number} params.userId - ID пользователя
 * @param {number} params.transactionId - ID транзакции
 * @returns {Promise<Object>} - Обновленный баланс пользователя
 */
export const confirmReservation = async ({ userId, transactionId }) => {
  try {
    // Отправляем запрос к микросервису баланса через RabbitMQ
    const response = await rabbitmqService.sendToQueue('balance_queue', {
      pattern: 'balance.reservation.confirm',
      data: { userId, transactionId }
    });

    return response;
  } catch (error) {
    console.error('Error confirming reservation:', error);
    throw new Error(`Failed to confirm reservation: ${error.message}`);
  }
};

/**
 * Отмена резервирования средств
 * @param {Object} params - Параметры запроса
 * @param {number} params.userId - ID пользователя
 * @param {number} params.transactionId - ID транзакции
 * @returns {Promise<Object>} - Обновленный баланс пользователя
 */
export const cancelReservation = async ({ userId, transactionId }) => {
  try {
    // Отправляем запрос к микросервису баланса через RabbitMQ
    const response = await rabbitmqService.sendToQueue('balance_queue', {
      pattern: 'balance.reservation.cancel',
      data: { userId, transactionId }
    });

    return response;
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    throw new Error(`Failed to cancel reservation: ${error.message}`);
  }
};

/**
 * Получение истории транзакций пользователя
 * @param {Object} params - Параметры запроса
 * @param {number} params.userId - ID пользователя
 * @returns {Promise<Array>} - История транзакций пользователя
 */
export const getUserTransactions = async ({ userId }) => {
  try {
    // Отправляем запрос к микросервису баланса через RabbitMQ
    const response = await rabbitmqService.sendToQueue('balance_queue', {
      pattern: 'balance.transactions.get',
      data: { userId }
    });

    return response;
  } catch (error) {
    console.error('Error getting user transactions:', error);
    throw new Error(`Failed to get user transactions: ${error.message}`);
  }
};
