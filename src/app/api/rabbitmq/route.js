import { NextResponse } from 'next/server';
import { initializeRabbitMQServer } from './init-server';

// API-маршрут для проверки статуса RabbitMQ и его инициализации
export async function GET() {
  try {
    // Вызываем функцию инициализации RabbitMQ
    const success = await initializeRabbitMQServer();
    
    if (success) {
      return NextResponse.json({ status: 'RabbitMQ initialized and running' });
    } else {
      return NextResponse.json(
        { error: 'Failed to initialize RabbitMQ' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in RabbitMQ API route:', error);
    return NextResponse.json(
      { error: 'Internal server error during RabbitMQ initialization' },
      { status: 500 }
    );
  }
}
