import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    try {
      this.logger.log('Initializing email transporter...');
      
      // Настройка транспортера для отправки email
      this.transporter = nodemailer.createTransport({
        host: this.configService.get<string>('SMTP_HOST', 'smtp.gmail.com'),
        port: this.configService.get<number>('SMTP_PORT', 587),
        secure: this.configService.get<boolean>('SMTP_SECURE', false),
        auth: {
          user: this.configService.get<string>('SMTP_USER'),
          pass: this.configService.get<string>('SMTP_PASSWORD'),
        },
      });
      
      this.logger.log('Email transporter initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize email transporter: ${error.message}`);
      throw error;
    }
  }

  private async compileTemplate(templateName: string, context: any): Promise<string> {
    try {
      // Путь к шаблонам email
      const templatesDir = path.join(process.cwd(), 'src/email/templates');
      
      // Проверяем существование директории с шаблонами
      if (!fs.existsSync(templatesDir)) {
        fs.mkdirSync(templatesDir, { recursive: true });
        this.logger.log(`Created templates directory: ${templatesDir}`);
      }
      
      const templatePath = path.join(templatesDir, `${templateName}.hbs`);
      
      // Если шаблон не существует, создаем базовый шаблон
      if (!fs.existsSync(templatePath)) {
        this.logger.warn(`Template ${templateName}.hbs not found, using default template`);
        
        // Возвращаем простой HTML-шаблон, если файл не найден
        const defaultTemplate = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>{{subject}}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>{{title}}</h1>
                </div>
                <div class="content">
                  {{content}}
                </div>
                <div class="footer">
                  <p>© {{year}} Unie. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `;
        
        // Компилируем шаблон с контекстом
        const template = handlebars.compile(defaultTemplate);
        return template({
          ...context,
          year: new Date().getFullYear(),
        });
      }
      
      // Читаем файл шаблона
      const templateSource = fs.readFileSync(templatePath, 'utf8');
      
      // Компилируем шаблон с контекстом
      const template = handlebars.compile(templateSource);
      return template({
        ...context,
        year: new Date().getFullYear(),
      });
    } catch (error) {
      this.logger.error(`Error compiling email template: ${error.message}`);
      throw error;
    }
  }

  async sendEmail(to: string, subject: string, templateName: string, context: any): Promise<boolean> {
    try {
      this.logger.log(`Sending email to ${to} with subject "${subject}"`);
      
      // Компилируем HTML-шаблон
      const html = await this.compileTemplate(templateName, context);
      
      // Настройки для отправки email
      const mailOptions = {
        from: this.configService.get<string>('SMTP_FROM', 'noreply@unie.com'),
        to,
        subject,
        html,
      };
      
      // Отправляем email
      const info = await this.transporter.sendMail(mailOptions);
      
      this.logger.log(`Email sent successfully: ${info.messageId}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
      return false;
    }
  }

  async sendVerificationCode(to: string, code: string): Promise<boolean> {
    try {
      this.logger.log(`Sending verification code to ${to}`);
      
      const subject = 'Подтверждение регистрации в Unie';
      const context = {
        title: 'Подтверждение регистрации',
        subject,
        code,
        content: `
          <p>Здравствуйте!</p>
          <p>Для подтверждения вашей регистрации в Unie, пожалуйста, используйте следующий код:</p>
          <h2 style="text-align: center; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">${code}</h2>
          <p>Код действителен в течение 30 минут.</p>
          <p>Если вы не запрашивали этот код, пожалуйста, проигнорируйте это сообщение.</p>
          <p>С уважением,<br>Команда Unie</p>
        `,
      };
      
      return await this.sendEmail(to, subject, 'verification', context);
    } catch (error) {
      this.logger.error(`Error sending verification code: ${error.message}`);
      return false;
    }
  }

  async sendPasswordResetLink(to: string, resetToken: string, expiresIn: number): Promise<boolean> {
    try {
      this.logger.log(`Sending password reset link to ${to}`);
      
      const resetLink = `${this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token=${resetToken}`;
      
      const subject = 'Сброс пароля в Unie';
      const context = {
        title: 'Сброс пароля',
        subject,
        resetLink,
        expiresIn,
        content: `
          <p>Здравствуйте!</p>
          <p>Вы запросили сброс пароля для вашей учетной записи в Unie.</p>
          <p>Для сброса пароля, пожалуйста, перейдите по следующей ссылке:</p>
          <p style="text-align: center;">
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Сбросить пароль</a>
          </p>
          <p>Ссылка действительна в течение ${expiresIn} минут.</p>
          <p>Если вы не запрашивали сброс пароля, пожалуйста, проигнорируйте это сообщение.</p>
          <p>С уважением,<br>Команда Unie</p>
        `,
      };
      
      return await this.sendEmail(to, subject, 'password-reset', context);
    } catch (error) {
      this.logger.error(`Error sending password reset link: ${error.message}`);
      return false;
    }
  }

  async sendPasswordChangedNotification(to: string): Promise<boolean> {
    try {
      this.logger.log(`Sending password changed notification to ${to}`);
      
      const subject = 'Ваш пароль был изменен';
      const context = {
        title: 'Пароль изменен',
        subject,
        content: `
          <p>Здравствуйте!</p>
          <p>Ваш пароль для учетной записи в Unie был успешно изменен.</p>
          <p>Если вы не меняли свой пароль, пожалуйста, немедленно свяжитесь с нашей службой поддержки.</p>
          <p>С уважением,<br>Команда Unie</p>
        `,
      };
      
      return await this.sendEmail(to, subject, 'password-changed', context);
    } catch (error) {
      this.logger.error(`Error sending password changed notification: ${error.message}`);
      return false;
    }
  }
}
