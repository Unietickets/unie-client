import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from '../email/email.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [EmailModule, RabbitMQModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
