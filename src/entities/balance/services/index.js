'use server';

import rabbitmqService from '@/shared/lib/rabbitmq';

/**
 * Получение баланса пользователя
 * @param {number} userId - ID пользователя
 * @returns {Promise<Object>} - Информация о балансе пользователя
 */
export const getUserBalance = async (userId) => {
  try {
    await rabbitmqService.init();
    
    const result = await rabbitmqService.sendAndReceive('balance.get', { userId });
    return result;
  } catch (error) {
    console.error('Error getting user balance:', error);
    throw new Error(`Failed to get user balance: ${error.message}`);
  }
};

/**
 * Добавление средств в неактивный баланс продавца с датой активации
 * @param {number} userId - ID пользователя (продавца)
 * @param {number|string} amount - Сумма для добавления в неактивный баланс
 * @param {Date} activationDate - Дата, когда баланс должен стать активным
 * @returns {Promise<Object>} - Результат операции
 */
export const addToPendingBalance = async (userId, amount, activationDate) => {
  console.log('=======================================');
  console.log('CLIENT: addToPendingBalance called with params:');
  console.log('userId:', userId);
  console.log('amount:', amount);
  console.log('activationDate:', activationDate);
  console.log('=======================================');
  
  try {
    console.log('Initializing RabbitMQ connection...');
    await rabbitmqService.init();
    console.log('RabbitMQ connection initialized');
    
    // Подготавливаем данные для отправки
    const messageData = {
      userId,
      amount: amount.toString(),
      activationDate: activationDate.toISOString()
    };
    
    // Используем новый метод для отправки сообщения с паттерном
    console.log('Using sendMessageWithPattern to send message to balance_queue');
    
    // Отправляем сообщение в очередь с указанием паттерна
    const result = await rabbitmqService.sendMessageWithPattern(
      'balance_queue',       // имя очереди
      'balance.pending.add', // паттерн сообщения
      messageData            // данные сообщения
    );
    
    console.log('Message sent to queue, result:', result);
    return result;
  } catch (error) {
    console.error('=======================================');
    console.error('ERROR adding to pending balance:', error);
    console.error('Stack:', error.stack);
    console.error('=======================================');
    throw new Error(`Failed to add to pending balance: ${error.message}`);
  }
};

/**
 * Пополнение баланса пользователя
 * @param {number} userId - ID пользователя
 * @param {number|string} amount - Сумма пополнения
 * @returns {Promise<Object>} - Результат операции
 */
export const depositToUserBalance = async (userId, amount) => {
  try {
    await rabbitmqService.init();
    
    const result = await rabbitmqService.sendToQueue('balance.deposit', {
      userId,
      amount: amount.toString()
    });
    
    return result;
  } catch (error) {
    console.error('Error depositing to user balance:', error);
    throw new Error(`Failed to deposit to user balance: ${error.message}`);
  }
};

/**
 * Списание с баланса пользователя
 * @param {number} userId - ID пользователя
 * @param {number|string} amount - Сумма списания
 * @returns {Promise<Object>} - Результат операции
 */
export const withdrawFromUserBalance = async (userId, amount) => {
  try {
    await rabbitmqService.init();
    
    const result = await rabbitmqService.sendToQueue('balance.withdraw', {
      userId,
      amount: amount.toString()
    });
    
    return result;
  } catch (error) {
    console.error('Error withdrawing from user balance:', error);
    throw new Error(`Failed to withdraw from user balance: ${error.message}`);
  }
};
