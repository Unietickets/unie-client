import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Controller('email')
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly rabbitMQService: RabbitMQService
  ) {}

  @MessagePattern('email.verification.send')
  async sendVerificationCode(
    @Payload() data: { email: string; code: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      this.logger.log(`Received request to send verification code to ${data.email}`);
      
      if (!data.email || !data.code) {
        this.logger.error('Missing required fields: email or code');
        throw new Error('Missing required fields: email or code');
      }

      const result = await this.emailService.sendVerificationCode(data.email, data.code);
      
      if (result) {
        this.logger.log(`Verification code sent successfully to ${data.email}`);
        
        // Отправляем событие об успешной отправке кода
        await this.rabbitMQService.emit('email.verification.sent', {
          email: data.email,
          timestamp: new Date().toISOString()
        });
        
        channel.ack(originalMsg);
        return { success: true, message: 'Verification code sent successfully' };
      } else {
        this.logger.error(`Failed to send verification code to ${data.email}`);
        channel.nack(originalMsg, false, false);
        return { success: false, message: 'Failed to send verification code' };
      }
    } catch (error) {
      this.logger.error(`Error sending verification code: ${error.message}`);
      channel.nack(originalMsg, false, false);
      return { success: false, message: error.message };
    }
  }

  @MessagePattern('email.password.reset')
  async sendPasswordResetLink(
    @Payload() data: { email: string; resetToken: string; expiresIn: number },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      this.logger.log(`Received request to send password reset link to ${data.email}`);
      
      if (!data.email || !data.resetToken) {
        this.logger.error('Missing required fields: email or resetToken');
        throw new Error('Missing required fields: email or resetToken');
      }

      const expiresIn = data.expiresIn || 30; // По умолчанию 30 минут
      const result = await this.emailService.sendPasswordResetLink(data.email, data.resetToken, expiresIn);
      
      if (result) {
        this.logger.log(`Password reset link sent successfully to ${data.email}`);
        
        // Отправляем событие об успешной отправке ссылки для сброса пароля
        await this.rabbitMQService.emit('email.password.reset.sent', {
          email: data.email,
          timestamp: new Date().toISOString()
        });
        
        channel.ack(originalMsg);
        return { success: true, message: 'Password reset link sent successfully' };
      } else {
        this.logger.error(`Failed to send password reset link to ${data.email}`);
        channel.nack(originalMsg, false, false);
        return { success: false, message: 'Failed to send password reset link' };
      }
    } catch (error) {
      this.logger.error(`Error sending password reset link: ${error.message}`);
      channel.nack(originalMsg, false, false);
      return { success: false, message: error.message };
    }
  }

  @MessagePattern('email.password.changed')
  async sendPasswordChangedNotification(
    @Payload() data: { email: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      this.logger.log(`Received request to send password changed notification to ${data.email}`);
      
      if (!data.email) {
        this.logger.error('Missing required field: email');
        throw new Error('Missing required field: email');
      }

      const result = await this.emailService.sendPasswordChangedNotification(data.email);
      
      if (result) {
        this.logger.log(`Password changed notification sent successfully to ${data.email}`);
        
        // Отправляем событие об успешной отправке уведомления
        await this.rabbitMQService.emit('email.password.changed.sent', {
          email: data.email,
          timestamp: new Date().toISOString()
        });
        
        channel.ack(originalMsg);
        return { success: true, message: 'Password changed notification sent successfully' };
      } else {
        this.logger.error(`Failed to send password changed notification to ${data.email}`);
        channel.nack(originalMsg, false, false);
        return { success: false, message: 'Failed to send password changed notification' };
      }
    } catch (error) {
      this.logger.error(`Error sending password changed notification: ${error.message}`);
      channel.nack(originalMsg, false, false);
      return { success: false, message: error.message };
    }
  }
}
