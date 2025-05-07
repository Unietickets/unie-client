import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly rabbitMQService: RabbitMQService
  ) {}

  @MessagePattern('email.verification.code.generate')
  async generateVerificationCode(
    @Payload() data: { email: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      this.logger.log(`Received request to generate verification code for ${data.email}`);
      
      if (!data.email) {
        this.logger.error('Missing required field: email');
        throw new Error('Missing required field: email');
      }

      const { code, success } = await this.authService.saveVerificationCode(data.email);
      
      if (success) {
        this.logger.log(`Verification code generated successfully for ${data.email}`);
        
        // Отправляем событие о генерации кода
        await this.rabbitMQService.emit('email.verification.code.generated', {
          email: data.email,
          timestamp: new Date().toISOString()
        });
        
        channel.ack(originalMsg);
        return { success: true, code };
      } else {
        this.logger.error(`Failed to generate verification code for ${data.email}`);
        channel.nack(originalMsg, false, false);
        return { success: false, message: 'Failed to generate verification code' };
      }
    } catch (error) {
      this.logger.error(`Error generating verification code: ${error.message}`);
      channel.nack(originalMsg, false, false);
      return { success: false, message: error.message };
    }
  }

  @MessagePattern('email.verification.code.verify')
  async verifyCode(
    @Payload() data: { email: string; code: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      this.logger.log(`Received request to verify code for ${data.email}`);
      
      if (!data.email || !data.code) {
        this.logger.error('Missing required fields: email or code');
        throw new Error('Missing required fields: email or code');
      }

      const verified = await this.authService.verifyCode(data.email, data.code);
      
      if (verified) {
        this.logger.log(`Code verified successfully for ${data.email}`);
        
        // Отправляем событие об успешной верификации
        await this.rabbitMQService.emit('email.verification.code.verified', {
          email: data.email,
          timestamp: new Date().toISOString()
        });
        
        channel.ack(originalMsg);
        return { success: true, message: 'Code verified successfully' };
      } else {
        this.logger.error(`Invalid verification code for ${data.email}`);
        
        // Отправляем событие о неудачной верификации
        await this.rabbitMQService.emit('email.verification.code.invalid', {
          email: data.email,
          timestamp: new Date().toISOString()
        });
        
        channel.ack(originalMsg); // Подтверждаем сообщение, даже если код неверный
        return { success: false, message: 'Invalid verification code' };
      }
    } catch (error) {
      this.logger.error(`Error verifying code: ${error.message}`);
      channel.nack(originalMsg, false, false);
      return { success: false, message: error.message };
    }
  }

  @MessagePattern('email.password.reset.initiate')
  async initiatePasswordReset(
    @Payload() data: { email: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      this.logger.log(`Received request to initiate password reset for ${data.email}`);
      
      if (!data.email) {
        this.logger.error('Missing required field: email');
        throw new Error('Missing required field: email');
      }

      const result = await this.authService.initiatePasswordReset(data.email);
      
      if (result) {
        this.logger.log(`Password reset initiated successfully for ${data.email}`);
        
        // Отправляем событие об инициации сброса пароля
        await this.rabbitMQService.emit('email.password.reset.initiated', {
          email: data.email,
          timestamp: new Date().toISOString()
        });
        
        channel.ack(originalMsg);
        return { success: true, message: 'Password reset initiated successfully' };
      } else {
        this.logger.error(`Failed to initiate password reset for ${data.email}`);
        channel.ack(originalMsg); // Подтверждаем сообщение, даже если пользователь не найден
        return { success: false, message: 'Failed to initiate password reset' };
      }
    } catch (error) {
      this.logger.error(`Error initiating password reset: ${error.message}`);
      channel.nack(originalMsg, false, false);
      return { success: false, message: error.message };
    }
  }

  @MessagePattern('email.password.reset.complete')
  async resetPassword(
    @Payload() data: { token: string; newPassword: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      this.logger.log(`Received request to reset password with token`);
      
      if (!data.token || !data.newPassword) {
        this.logger.error('Missing required fields: token or newPassword');
        throw new Error('Missing required fields: token or newPassword');
      }

      const result = await this.authService.resetPassword(data.token, data.newPassword);
      
      if (result) {
        this.logger.log(`Password reset completed successfully`);
        
        // Отправляем событие о завершении сброса пароля
        await this.rabbitMQService.emit('email.password.reset.completed', {
          timestamp: new Date().toISOString()
        });
        
        channel.ack(originalMsg);
        return { success: true, message: 'Password reset completed successfully' };
      } else {
        this.logger.error(`Failed to reset password`);
        channel.ack(originalMsg); // Подтверждаем сообщение, даже если токен неверный
        return { success: false, message: 'Failed to reset password' };
      }
    } catch (error) {
      this.logger.error(`Error resetting password: ${error.message}`);
      channel.nack(originalMsg, false, false);
      return { success: false, message: error.message };
    }
  }
}
