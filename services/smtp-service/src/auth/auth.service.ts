import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Генерация случайного кода подтверждения
   */
  private generateVerificationCode(length: number = 6): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Генерация токена для сброса пароля
   */
  private generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Сохранение кода подтверждения для пользователя
   */
  async saveVerificationCode(email: string): Promise<{ code: string; success: boolean }> {
    try {
      this.logger.log(`Generating verification code for ${email}`);

      // Проверяем существование пользователя
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        this.logger.error(`User with email ${email} not found`);
        return { code: null, success: false };
      }

      // Генерируем код подтверждения
      const code = this.generateVerificationCode();

      // Сохраняем код в базе данных
      await this.prisma.user.update({
        where: { id: user.id },
        data: { verification_code: code },
      });

      this.logger.log(`Verification code saved for ${email}`);
      return { code, success: true };
    } catch (error) {
      this.logger.error(`Error saving verification code: ${error.message}`);
      return { code: null, success: false };
    }
  }

  /**
   * Проверка кода подтверждения
   */
  async verifyCode(email: string, code: string): Promise<boolean> {
    try {
      this.logger.log(`Verifying code for ${email}`);

      // Проверяем существование пользователя и код
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user || user.verification_code !== code) {
        this.logger.error(`Invalid verification code for ${email}`);
        return false;
      }

      // Очищаем код после успешной проверки
      await this.prisma.user.update({
        where: { id: user.id },
        data: { verification_code: null },
      });

      this.logger.log(`Code verified successfully for ${email}`);
      return true;
    } catch (error) {
      this.logger.error(`Error verifying code: ${error.message}`);
      return false;
    }
  }

  /**
   * Создание токена для сброса пароля
   */
  async createPasswordResetToken(email: string): Promise<{ resetToken: string; success: boolean }> {
    try {
      this.logger.log(`Creating password reset token for ${email}`);

      // Проверяем существование пользователя
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        this.logger.error(`User with email ${email} not found`);
        return { resetToken: null, success: false };
      }

      // Генерируем токен для сброса пароля
      const resetToken = this.generateResetToken();

      // Устанавливаем срок действия токена (30 минут)
      const resetTokenExp = new Date();
      resetTokenExp.setMinutes(resetTokenExp.getMinutes() + 30);

      // Сохраняем токен в базе данных
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          reset_token: resetToken,
          reset_token_exp: resetTokenExp,
        },
      });

      this.logger.log(`Password reset token created for ${email}`);
      return { resetToken, success: true };
    } catch (error) {
      this.logger.error(`Error creating password reset token: ${error.message}`);
      return { resetToken: null, success: false };
    }
  }

  /**
   * Проверка токена для сброса пароля
   */
  async verifyResetToken(token: string): Promise<{ userId: number; success: boolean }> {
    try {
      this.logger.log(`Verifying reset token`);

      // Проверяем существование пользователя с данным токеном
      const user = await this.prisma.user.findFirst({
        where: {
          reset_token: token,
          reset_token_exp: {
            gt: new Date(), // Токен еще не истек
          },
        },
      });

      if (!user) {
        this.logger.error(`Invalid or expired reset token`);
        return { userId: null, success: false };
      }

      this.logger.log(`Reset token verified successfully for user ${user.id}`);
      return { userId: user.id, success: true };
    } catch (error) {
      this.logger.error(`Error verifying reset token: ${error.message}`);
      return { userId: null, success: false };
    }
  }

  /**
   * Обновление пароля пользователя
   */
  async updatePassword(userId: number, newPassword: string): Promise<boolean> {
    try {
      this.logger.log(`Updating password for user ${userId}`);

      // Хешируем новый пароль
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Обновляем пароль и очищаем токен сброса
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
          reset_token: null,
          reset_token_exp: null,
        },
      });

      this.logger.log(`Password updated successfully for user ${userId}`);
      return true;
    } catch (error) {
      this.logger.error(`Error updating password: ${error.message}`);
      return false;
    }
  }

  /**
   * Полный процесс сброса пароля: создание токена и отправка email
   */
  async initiatePasswordReset(email: string): Promise<boolean> {
    try {
      this.logger.log(`Initiating password reset for ${email}`);

      // Создаем токен для сброса пароля
      const { resetToken, success } = await this.createPasswordResetToken(email);

      if (!success) {
        return false;
      }

      // Отправляем email со ссылкой для сброса пароля
      const emailSent = await this.emailService.sendPasswordResetLink(email, resetToken, 30);

      if (!emailSent) {
        this.logger.error(`Failed to send password reset email to ${email}`);
        return false;
      }

      this.logger.log(`Password reset initiated successfully for ${email}`);
      return true;
    } catch (error) {
      this.logger.error(`Error initiating password reset: ${error.message}`);
      return false;
    }
  }

  /**
   * Полный процесс обновления пароля по токену
   */
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      this.logger.log(`Resetting password with token`);

      // Проверяем токен
      const { userId, success } = await this.verifyResetToken(token);

      if (!success) {
        return false;
      }

      // Обновляем пароль
      const passwordUpdated = await this.updatePassword(userId, newPassword);

      if (!passwordUpdated) {
        this.logger.error(`Failed to update password for user ${userId}`);
        return false;
      }

      // Получаем email пользователя для отправки уведомления
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      // Отправляем уведомление о смене пароля
      await this.emailService.sendPasswordChangedNotification(user.email);

      this.logger.log(`Password reset completed successfully for user ${userId}`);
      return true;
    } catch (error) {
      this.logger.error(`Error resetting password: ${error.message}`);
      return false;
    }
  }
}
