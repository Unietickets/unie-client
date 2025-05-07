import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BalanceModule } from './balance/balance.module';
import { PrismaModule } from './prisma/prisma.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    // Загружаем переменные окружения
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Подключаем модуль Prisma
    PrismaModule,
    // Подключаем модуль RabbitMQ
    RabbitMQModule,
    // Подключаем модуль баланса
    BalanceModule,
  ],
})
export class AppModule {}
