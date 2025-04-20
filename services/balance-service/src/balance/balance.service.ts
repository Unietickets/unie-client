import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { Decimal } from 'decimal.js';

@Injectable()
export class BalanceService {
  private readonly logger = new Logger(BalanceService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  /**
   * Получение баланса пользователя
   * @param userId ID пользователя
   * @returns Информация о балансе пользователя
   */
  async getUserBalance(userId: number) {
    try {
      const userBalance = await this.prisma.userBalance.findFirst({
        where: { user_id: userId },
      });

      if (!userBalance) {
        return {
          userId,
          activeBalance: '0.00',
          pendingBalance: '0.00',
          message: 'User balance not found',
        };
      }

      return {
        userId,
        activeBalance: userBalance.active_balance.toString(),
        pendingBalance: userBalance.pending_balance.toString(),
        activationDate: userBalance.activation_date,
        createdAt: userBalance.created_at,
        updatedAt: userBalance.updated_at,
      };
    } catch (error) {
      this.logger.error(`Error getting user balance: ${error.message}`, error.stack);
      throw new Error(`Failed to get user balance: ${error.message}`);
    }
  }

  /**
   * Создание или обновление баланса пользователя
   * @param userId ID пользователя
   * @param activeBalance Активный баланс
   * @param pendingBalance Ожидающий баланс
   * @returns Обновленный баланс пользователя
   */
  async createOrUpdateUserBalance(
    userId: number,
    activeBalance: string | number,
    pendingBalance: string | number = '0',
  ) {
    try {
      const activeBalanceDecimal = new Decimal(activeBalance);
      const pendingBalanceDecimal = new Decimal(pendingBalance);

      // Сначала проверяем, существует ли уже баланс для этого пользователя
      const existingBalance = await this.prisma.userBalance.findFirst({
        where: { user_id: userId },
      });

      let userBalance;

      if (existingBalance) {
        // Если баланс существует, обновляем его
        userBalance = await this.prisma.userBalance.update({
          where: { id: existingBalance.id },
          data: {
            active_balance: activeBalanceDecimal.toFixed(2),
            pending_balance: pendingBalanceDecimal.toFixed(2),
            updated_at: new Date(),
          },
        });
      } else {
        // Если баланса нет, создаем новый
        userBalance = await this.prisma.userBalance.create({
          data: {
            user_id: userId,
            active_balance: activeBalanceDecimal.toFixed(2),
            pending_balance: pendingBalanceDecimal.toFixed(2),
            activation_date: new Date(),
          },
        });
      }

      // Публикуем событие об обновлении баланса
      await this.rabbitMQService.emit('balance.updated', {
        userId,
        activeBalance: userBalance.active_balance.toString(),
        pendingBalance: userBalance.pending_balance.toString(),
        timestamp: new Date().toISOString(),
      });

      return {
        userId,
        activeBalance: userBalance.active_balance.toString(),
        pendingBalance: userBalance.pending_balance.toString(),
        activationDate: userBalance.activation_date,
        createdAt: userBalance.created_at,
        updatedAt: userBalance.updated_at,
      };
    } catch (error) {
      this.logger.error(`Error updating user balance: ${error.message}`, error.stack);
      throw new Error(`Failed to update user balance: ${error.message}`);
    }
  }

  /**
   * Пополнение баланса пользователя
   * @param userId ID пользователя
   * @param amount Сумма пополнения
   * @returns Обновленный баланс пользователя
   */
  async depositToUserBalance(userId: number, amount: string | number) {
    try {
      const amountDecimal = new Decimal(amount);
      
      if (amountDecimal.isNegative() || amountDecimal.isZero()) {
        throw new Error('Deposit amount must be positive');
      }

      const userBalance = await this.prisma.userBalance.findFirst({
        where: { user_id: userId },
      });

      if (!userBalance) {
        // Если баланс не существует, создаем новый
        return this.createOrUpdateUserBalance(userId, amountDecimal.toString());
      }

      // Увеличиваем активный баланс
      const newActiveBalance = new Decimal(userBalance.active_balance).plus(amountDecimal);

      // Создаем транзакцию
      const transaction = await this.prisma.transaction.create({
        data: {
          user_id: userId,
          direction: 'deposit',
          amount: amountDecimal.toFixed(2),
          status: 'completed',
        },
      });

      // Обновляем баланс
      const updatedBalance = await this.createOrUpdateUserBalance(
        userId,
        newActiveBalance.toString(),
        userBalance.pending_balance.toString(),
      );

      // Публикуем событие о пополнении баланса
      await this.rabbitMQService.emit('balance.deposited', {
        userId,
        amount: amountDecimal.toString(),
        transactionId: transaction.id,
        newBalance: updatedBalance.activeBalance,
        timestamp: new Date().toISOString(),
      });

      return {
        ...updatedBalance,
        transactionId: transaction.id,
      };
    } catch (error) {
      this.logger.error(`Error depositing to user balance: ${error.message}`, error.stack);
      throw new Error(`Failed to deposit to user balance: ${error.message}`);
    }
  }

  /**
   * Списание с баланса пользователя
   * @param userId ID пользователя
   * @param amount Сумма списания
   * @returns Обновленный баланс пользователя
   */
  async withdrawFromUserBalance(userId: number, amount: string | number) {
    try {
      const amountDecimal = new Decimal(amount);
      
      if (amountDecimal.isNegative() || amountDecimal.isZero()) {
        throw new Error('Withdrawal amount must be positive');
      }

      const userBalance = await this.prisma.userBalance.findFirst({
        where: { user_id: userId },
      });

      if (!userBalance) {
        throw new Error('User balance not found');
      }

      const currentActiveBalance = new Decimal(userBalance.active_balance);

      // Проверяем, достаточно ли средств
      if (currentActiveBalance.lessThan(amountDecimal)) {
        throw new Error('Insufficient funds');
      }

      // Уменьшаем активный баланс
      const newActiveBalance = currentActiveBalance.minus(amountDecimal);

      // Создаем транзакцию
      const transaction = await this.prisma.transaction.create({
        data: {
          user_id: userId,
          direction: 'withdraw',
          amount: amountDecimal.toFixed(2),
          status: 'completed',
        },
      });

      // Обновляем баланс
      const updatedBalance = await this.createOrUpdateUserBalance(
        userId,
        newActiveBalance.toString(),
        userBalance.pending_balance.toString(),
      );

      // Публикуем событие о списании с баланса
      await this.rabbitMQService.emit('balance.withdrawn', {
        userId,
        amount: amountDecimal.toString(),
        transactionId: transaction.id,
        newBalance: updatedBalance.activeBalance,
        timestamp: new Date().toISOString(),
      });

      return {
        ...updatedBalance,
        transactionId: transaction.id,
      };
    } catch (error) {
      this.logger.error(`Error withdrawing from user balance: ${error.message}`, error.stack);
      throw new Error(`Failed to withdraw from user balance: ${error.message}`);
    }
  }

  /**
   * Резервирование средств на балансе пользователя
   * @param userId ID пользователя
   * @param amount Сумма резервирования
   * @returns Обновленный баланс пользователя
   */
  async reserveUserBalance(userId: number, amount: string | number) {
    try {
      const amountDecimal = new Decimal(amount);
      
      if (amountDecimal.isNegative() || amountDecimal.isZero()) {
        throw new Error('Reserve amount must be positive');
      }

      const userBalance = await this.prisma.userBalance.findFirst({
        where: { user_id: userId },
      });

      if (!userBalance) {
        throw new Error('User balance not found');
      }

      const currentActiveBalance = new Decimal(userBalance.active_balance);
      const currentPendingBalance = new Decimal(userBalance.pending_balance);

      // Проверяем, достаточно ли средств
      if (currentActiveBalance.lessThan(amountDecimal)) {
        throw new Error('Insufficient funds');
      }

      // Уменьшаем активный баланс и увеличиваем ожидающий
      const newActiveBalance = currentActiveBalance.minus(amountDecimal);
      const newPendingBalance = currentPendingBalance.plus(amountDecimal);

      // Создаем транзакцию
      const transaction = await this.prisma.transaction.create({
        data: {
          user_id: userId,
          direction: 'withdraw',
          amount: amountDecimal.toFixed(2),
          status: 'in_process',
        },
      });

      // Обновляем баланс
      const updatedBalance = await this.createOrUpdateUserBalance(
        userId,
        newActiveBalance.toString(),
        newPendingBalance.toString(),
      );

      // Публикуем событие о резервировании средств
      await this.rabbitMQService.emit('balance.reserved', {
        userId,
        amount: amountDecimal.toString(),
        transactionId: transaction.id,
        newActiveBalance: updatedBalance.activeBalance,
        newPendingBalance: updatedBalance.pendingBalance,
        timestamp: new Date().toISOString(),
      });

      return {
        ...updatedBalance,
        transactionId: transaction.id,
      };
    } catch (error) {
      this.logger.error(`Error reserving user balance: ${error.message}`, error.stack);
      throw new Error(`Failed to reserve user balance: ${error.message}`);
    }
  }

  /**
   * Подтверждение резервирования средств
   * @param userId ID пользователя
   * @param transactionId ID транзакции
   * @returns Обновленный баланс пользователя
   */
  async confirmReservation(userId: number, transactionId: number) {
    try {
      // Находим транзакцию
      const transaction = await this.prisma.transaction.findFirst({
        where: {
          id: transactionId,
          user_id: userId,
          status: 'in_process',
        },
      });

      if (!transaction) {
        throw new Error('Transaction not found or already processed');
      }

      // Находим баланс пользователя
      const userBalance = await this.prisma.userBalance.findFirst({
        where: { user_id: userId },
      });

      if (!userBalance) {
        throw new Error('User balance not found');
      }

      const currentPendingBalance = new Decimal(userBalance.pending_balance);
      const transactionAmount = new Decimal(transaction.amount);

      // Проверяем, достаточно ли средств в ожидающем балансе
      if (currentPendingBalance.lessThan(transactionAmount)) {
        throw new Error('Insufficient pending balance');
      }

      // Уменьшаем ожидающий баланс
      const newPendingBalance = currentPendingBalance.minus(transactionAmount);

      // Обновляем статус транзакции
      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { status: 'completed' },
      });

      // Обновляем баланс
      const updatedBalance = await this.createOrUpdateUserBalance(
        userId,
        userBalance.active_balance.toString(),
        newPendingBalance.toString(),
      );

      // Публикуем событие о подтверждении резервирования
      await this.rabbitMQService.emit('balance.reservation.confirmed', {
        userId,
        amount: transactionAmount.toString(),
        transactionId,
        newActiveBalance: updatedBalance.activeBalance,
        newPendingBalance: updatedBalance.pendingBalance,
        timestamp: new Date().toISOString(),
      });

      return {
        ...updatedBalance,
        transactionId,
      };
    } catch (error) {
      this.logger.error(`Error confirming reservation: ${error.message}`, error.stack);
      throw new Error(`Failed to confirm reservation: ${error.message}`);
    }
  }

  /**
   * Отмена резервирования средств
   * @param userId ID пользователя
   * @param transactionId ID транзакции
   * @returns Обновленный баланс пользователя
   */
  async cancelReservation(userId: number, transactionId: number) {
    try {
      // Находим транзакцию
      const transaction = await this.prisma.transaction.findFirst({
        where: {
          id: transactionId,
          user_id: userId,
          status: 'in_process',
        },
      });

      if (!transaction) {
        throw new Error('Transaction not found or already processed');
      }

      // Находим баланс пользователя
      const userBalance = await this.prisma.userBalance.findFirst({
        where: { user_id: userId },
      });

      if (!userBalance) {
        throw new Error('User balance not found');
      }

      const currentActiveBalance = new Decimal(userBalance.active_balance);
      const currentPendingBalance = new Decimal(userBalance.pending_balance);
      const transactionAmount = new Decimal(transaction.amount);

      // Проверяем, достаточно ли средств в ожидающем балансе
      if (currentPendingBalance.lessThan(transactionAmount)) {
        throw new Error('Insufficient pending balance');
      }

      // Увеличиваем активный баланс и уменьшаем ожидающий
      const newActiveBalance = currentActiveBalance.plus(transactionAmount);
      const newPendingBalance = currentPendingBalance.minus(transactionAmount);

      // Обновляем статус транзакции (отменяем)
      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { status: 'created' }, // Возвращаем в начальное состояние
      });

      // Обновляем баланс
      const updatedBalance = await this.createOrUpdateUserBalance(
        userId,
        newActiveBalance.toString(),
        newPendingBalance.toString(),
      );

      // Публикуем событие об отмене резервирования
      await this.rabbitMQService.emit('balance.reservation.cancelled', {
        userId,
        amount: transactionAmount.toString(),
        transactionId,
        newActiveBalance: updatedBalance.activeBalance,
        newPendingBalance: updatedBalance.pendingBalance,
        timestamp: new Date().toISOString(),
      });

      return {
        ...updatedBalance,
        transactionId,
      };
    } catch (error) {
      this.logger.error(`Error cancelling reservation: ${error.message}`, error.stack);
      throw new Error(`Failed to cancel reservation: ${error.message}`);
    }
  }

  /**
   * Получение истории транзакций пользователя
   * @param userId ID пользователя
   * @returns История транзакций пользователя
   */
  async getUserTransactions(userId: number) {
    try {
      const transactions = await this.prisma.transaction.findMany({
        where: { user_id: userId },
        orderBy: { transaction_date: 'desc' },
      });

      return transactions.map(transaction => ({
        id: transaction.id,
        userId: transaction.user_id,
        direction: transaction.direction,
        amount: transaction.amount.toString(),
        status: transaction.status,
        date: transaction.transaction_date,
      }));
    } catch (error) {
      this.logger.error(`Error getting user transactions: ${error.message}`, error.stack);
      throw new Error(`Failed to get user transactions: ${error.message}`);
    }
  }
}
