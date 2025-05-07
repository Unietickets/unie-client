import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('BalanceService');
  
  try {
    logger.log('Starting Balance Microservice...');
    
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
    const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://admin:password@localhost:5672';
    logger.log(`Connecting to RabbitMQ at: ${rabbitmqUrl}`);
    
    // Подключаем микросервис RabbitMQ
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue: 'balance_queue',
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
    await app.listen(3001);
    
    const url = await app.getUrl();
    logger.log(`Balance microservice is running on: ${url}`);
    logger.log(`RabbitMQ queue: balance_queue`);
    
    // Выводим информацию о доступных обработчиках сообщений
    logger.log('Available message patterns:');
    logger.log('- balance.get');
    logger.log('- balance.deposit');
    logger.log('- balance.withdraw');
    logger.log('- balance.reserve');
    logger.log('- balance.reservation.confirm');
    logger.log('- balance.reservation.cancel');
    logger.log('- balance.pending.add');
    logger.log('- balance.transactions.get');
  } catch (error) {
    logger.error(`Error starting Balance Microservice: ${error.message}`);
    logger.error(error.stack);
    process.exit(1);
  }
}

bootstrap();
