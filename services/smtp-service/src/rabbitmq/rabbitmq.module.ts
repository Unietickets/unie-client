import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'SMTP_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          // Получаем URL из переменной окружения или используем localhost по умолчанию
          const rabbitmqUrl = configService.get<string>('RABBITMQ_URL');
          
          // Если URL не задан или содержит 'rabbitmq', но мы запускаемся локально,
          // то используем localhost
          const isDocker = process.env.NODE_ENV === 'docker';
          const finalUrl = rabbitmqUrl 
            ? (isDocker || !rabbitmqUrl.includes('rabbitmq') 
                ? rabbitmqUrl 
                : rabbitmqUrl.replace('rabbitmq', 'localhost'))
            : 'amqp://admin:password@localhost:5672';
          
          console.log(`Connecting to RabbitMQ at: ${finalUrl}`);
          
          return {
            transport: Transport.RMQ,
            options: {
              urls: [finalUrl],
              queue: 'smtp_queue',
              queueOptions: {
                durable: true,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
