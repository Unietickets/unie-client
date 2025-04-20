import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Создаем основное приложение NestJS
  const app = await NestFactory.create(AppModule);
  
  // Настраиваем валидацию
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Подключаем микросервис RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://admin:password@localhost:5672'],
      queue: 'balance_queue',
      queueOptions: {
        durable: true,
      },
      prefetchCount: 1,
    },
  });

  // Запускаем микросервис и HTTP-сервер
  await app.startAllMicroservices();
  await app.listen(3001);
  
  console.log(`Balance microservice is running on port 3001`);
}

bootstrap();
