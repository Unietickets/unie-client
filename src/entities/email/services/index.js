'use server';

import rabbitmqService from '@/shared/lib/rabbitmq';

/**
 * Отправка кода подтверждения на email пользователя
 * @param {string} email - Email пользователя
 * @param {string} code - Код подтверждения
 * @returns {Promise<Object>} - Результат операции
 */
export const sendVerificationCode = async (email, code) => {
  try {
    console.log('Sending verification code to:', email);
    await rabbitmqService.init();
    
    const result = await rabbitmqService.sendMessageWithPattern(
      'smtp_queue',
      'email.verification.send',
      { email, code }
    );
    
    console.log('Verification code sent, result:', result);
    return result;
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw new Error(`Failed to send verification code: ${error.message}`);
  }
};

/**
 * Генерация кода подтверждения и сохранение его в базе данных
 * @param {string} email - Email пользователя
 * @returns {Promise<Object>} - Результат операции с кодом подтверждения
 */
export const generateVerificationCode = async (email) => {
  try {
    console.log('Generating verification code for:', email);
    await rabbitmqService.init();
    
    const result = await rabbitmqService.sendMessageWithPattern(
      'smtp_queue',
      'email.verification.code.generate',
      { email }
    );
    
    console.log('Verification code generated, result:', result);
    return result;
  } catch (error) {
    console.error('Error generating verification code:', error);
    throw new Error(`Failed to generate verification code: ${error.message}`);
  }
};

/**
 * Проверка кода подтверждения
 * @param {string} email - Email пользователя
 * @param {string} code - Код подтверждения для проверки
 * @returns {Promise<Object>} - Результат проверки
 */
export const verifyCode = async (email, code) => {
  try {
    console.log('Verifying code for:', email);
    await rabbitmqService.init();
    
    const result = await rabbitmqService.sendMessageWithPattern(
      'smtp_queue',
      'email.verification.code.verify',
      { email, code }
    );
    
    console.log('Code verification result:', result);
    return result;
  } catch (error) {
    console.error('Error verifying code:', error);
    throw new Error(`Failed to verify code: ${error.message}`);
  }
};

/**
 * Инициирование процесса сброса пароля
 * @param {string} email - Email пользователя
 * @returns {Promise<Object>} - Результат операции
 */
export const initiatePasswordReset = async (email) => {
  try {
    console.log('Initiating password reset for:', email);
    await rabbitmqService.init();
    
    const result = await rabbitmqService.sendMessageWithPattern(
      'smtp_queue',
      'email.password.reset.initiate',
      { email }
    );
    
    console.log('Password reset initiated, result:', result);
    return result;
  } catch (error) {
    console.error('Error initiating password reset:', error);
    throw new Error(`Failed to initiate password reset: ${error.message}`);
  }
};

/**
 * Завершение процесса сброса пароля
 * @param {string} token - Токен сброса пароля
 * @param {string} newPassword - Новый пароль
 * @returns {Promise<Object>} - Результат операции
 */
export const completePasswordReset = async (token, newPassword) => {
  try {
    console.log('Completing password reset with token');
    await rabbitmqService.init();
    
    const result = await rabbitmqService.sendMessageWithPattern(
      'smtp_queue',
      'email.password.reset.complete',
      { token, newPassword }
    );
    
    console.log('Password reset completed, result:', result);
    return result;
  } catch (error) {
    console.error('Error completing password reset:', error);
    throw new Error(`Failed to complete password reset: ${error.message}`);
  }
};
