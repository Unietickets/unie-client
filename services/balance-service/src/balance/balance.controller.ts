import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  private readonly logger = new Logger(BalanceController.name);

  constructor(private readonly balanceService: BalanceService) {}

  // HTTP эндпоинты

  @Get('user/:userId')
  async getUserBalance(@Param('userId') userId: string) {
    return this.balanceService.getUserBalance(Number(userId));
  }

  @Post('user/:userId/deposit')
  async depositToUserBalance(
    @Param('userId') userId: string,
    @Body('amount') amount: string,
  ) {
    return this.balanceService.depositToUserBalance(Number(userId), amount);
  }

  @Post('user/:userId/withdraw')
  async withdrawFromUserBalance(
    @Param('userId') userId: string,
    @Body('amount') amount: string,
  ) {
    return this.balanceService.withdrawFromUserBalance(Number(userId), amount);
  }

  @Post('user/:userId/reserve')
  async reserveUserBalance(
    @Param('userId') userId: string,
    @Body('amount') amount: string,
  ) {
    return this.balanceService.reserveUserBalance(Number(userId), amount);
  }

  @Post('user/:userId/reservation/:transactionId/confirm')
  async confirmReservation(
    @Param('userId') userId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.balanceService.confirmReservation(Number(userId), Number(transactionId));
  }

  @Post('user/:userId/reservation/:transactionId/cancel')
  async cancelReservation(
    @Param('userId') userId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.balanceService.cancelReservation(Number(userId), Number(transactionId));
  }

  @Post('user/:userId/pending')
  async addToPendingBalance(
    @Param('userId') userId: string,
    @Body('amount') amount: string,
    @Body('activationDate') activationDate: string,
  ) {
    return this.balanceService.addToPendingBalance(
      Number(userId), 
      amount, 
      new Date(activationDate)
    );
  }

  @Get('user/:userId/transactions')
  async getUserTransactions(@Param('userId') userId: string) {
    return this.balanceService.getUserTransactions(Number(userId));
  }

  // RabbitMQ обработчики сообщений

  @MessagePattern('balance.get')
  async getBalance(@Payload() data: { userId: number }, @Ctx() context: RmqContext) {
    this.logger.log(`Received balance.get message: ${JSON.stringify(data)}`);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      const result = await this.balanceService.getUserBalance(data.userId);
      channel.ack(originalMsg);
      return result;
    } catch (error) {
      this.logger.error(`Error processing balance.get: ${error.message}`, error.stack);
      channel.nack(originalMsg);
      throw error;
    }
  }

  @MessagePattern('balance.deposit')
  async deposit(
    @Payload() data: { userId: number; amount: string },
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Received balance.deposit message: ${JSON.stringify(data)}`);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      const result = await this.balanceService.depositToUserBalance(data.userId, data.amount);
      channel.ack(originalMsg);
      return result;
    } catch (error) {
      this.logger.error(`Error processing balance.deposit: ${error.message}`, error.stack);
      channel.nack(originalMsg);
      throw error;
    }
  }

  @MessagePattern('balance.withdraw')
  async withdraw(
    @Payload() data: { userId: number; amount: string },
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Received balance.withdraw message: ${JSON.stringify(data)}`);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      const result = await this.balanceService.withdrawFromUserBalance(data.userId, data.amount);
      channel.ack(originalMsg);
      return result;
    } catch (error) {
      this.logger.error(`Error processing balance.withdraw: ${error.message}`, error.stack);
      channel.nack(originalMsg);
      throw error;
    }
  }

  @MessagePattern('balance.reserve')
  async reserve(
    @Payload() data: { userId: number; amount: string },
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Received balance.reserve message: ${JSON.stringify(data)}`);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      const result = await this.balanceService.reserveUserBalance(data.userId, data.amount);
      channel.ack(originalMsg);
      return result;
    } catch (error) {
      this.logger.error(`Error processing balance.reserve: ${error.message}`, error.stack);
      channel.nack(originalMsg);
      throw error;
    }
  }

  @MessagePattern('balance.reservation.confirm')
  async confirmReservationMessage(
    @Payload() data: { userId: number; transactionId: number },
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Received balance.reservation.confirm message: ${JSON.stringify(data)}`);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      const result = await this.balanceService.confirmReservation(data.userId, data.transactionId);
      channel.ack(originalMsg);
      return result;
    } catch (error) {
      this.logger.error(`Error processing balance.reservation.confirm: ${error.message}`, error.stack);
      channel.nack(originalMsg);
      throw error;
    }
  }

  @MessagePattern('balance.reservation.cancel')
  async cancelReservationMessage(
    @Payload() data: { userId: number; transactionId: number },
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Received balance.reservation.cancel message: ${JSON.stringify(data)}`);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      const result = await this.balanceService.cancelReservation(data.userId, data.transactionId);
      channel.ack(originalMsg);
      return result;
    } catch (error) {
      this.logger.error(`Error processing balance.reservation.cancel: ${error.message}`, error.stack);
      channel.nack(originalMsg);
      throw error;
    }
  }

  @MessagePattern('balance.pending.add')
  async addToPendingBalanceMessage(
    @Payload() data: { userId: number; amount: string; activationDate: string },
    @Ctx() context: RmqContext,
  ) {
    console.log('=======================================');
    console.log('CONTROLLER: Received balance.pending.add message:');
    console.log('Data:', JSON.stringify(data));
    console.log('=======================================');
    
    this.logger.log(`Received balance.pending.add message: ${JSON.stringify(data)}`);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      console.log('Calling balanceService.addToPendingBalance with:');
      console.log('userId:', data.userId);
      console.log('amount:', data.amount);
      console.log('activationDate:', new Date(data.activationDate));
      
      const result = await this.balanceService.addToPendingBalance(
        data.userId, 
        data.amount, 
        new Date(data.activationDate)
      );
      
      console.log('Balance service returned result:', JSON.stringify(result));
      channel.ack(originalMsg);
      console.log('Message acknowledged');
      
      return result;
    } catch (error) {
      console.error('=======================================');
      console.error('CONTROLLER ERROR processing balance.pending.add:');
      console.error('Error message:', error.message);
      console.error('Stack:', error.stack);
      console.error('=======================================');
      
      this.logger.error(`Error processing balance.pending.add: ${error.message}`, error.stack);
      channel.nack(originalMsg);
      console.log('Message NOT acknowledged (nack)');
      
      throw error;
    }
  }

  @MessagePattern('balance.transactions.get')
  async getTransactions(
    @Payload() data: { userId: number },
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`Received balance.transactions.get message: ${JSON.stringify(data)}`);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    try {
      const result = await this.balanceService.getUserTransactions(data.userId);
      channel.ack(originalMsg);
      return result;
    } catch (error) {
      this.logger.error(`Error processing balance.transactions.get: ${error.message}`, error.stack);
      channel.nack(originalMsg);
      throw error;
    }
  }
}
