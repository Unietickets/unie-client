import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('SmtpService');

  try {
    logger.log('Starting SMTP Microservice...');

    // Создаем основное приложение NestJS
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'], // Включаем все уровни логирования
    });

    logger.log('NestJS application created');

    // Настраиваем валидацию
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));

    logger.log('Validation pipe configured');

    // Получаем URL RabbitMQ из переменных окружения
    let rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://admin:password@localhost:5672';

    // Если URL содержит 'rabbitmq', но мы запускаемся локально, то используем localhost
    const isDocker = process.env.NODE_ENV === 'docker';
    if (!isDocker && rabbitmqUrl.includes('rabbitmq')) {
      rabbitmqUrl = rabbitmqUrl.replace('rabbitmq', 'localhost');
    }

    logger.log(`Connecting to RabbitMQ at: ${rabbitmqUrl}`);

    // Подключаем микросервис RabbitMQ
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue: 'smtp_queue',
        queueOptions: {
          durable: true,
        },
        prefetchCount: 1,
        noAck: false, // Требуем явного подтверждения обработки сообщений
      },
    });

    logger.log('RabbitMQ microservice connected');

    // Запускаем микросервис и HTTP-сервер
    logger.log('Starting microservices...');
    await app.startAllMicroservices();
    logger.log('Microservices started');

    logger.log('Starting HTTP server...');
    await app.listen(3002);

    const url = await app.getUrl();
    logger.log(`SMTP microservice is running on: ${url}`);
    logger.log(`RabbitMQ queue: smtp_queue`);

    // Выводим информацию о доступных обработчиках сообщений
    logger.log('Available message patterns:');
    logger.log('- email.verification.send');
    logger.log('- email.password.reset');
    logger.log('- email.password.update');
  } catch (error) {
    logger.error(`Error starting SMTP Microservice: ${error.message}`);
    logger.error(error.stack);
    process.exit(1);
  }
}

bootstrap();
