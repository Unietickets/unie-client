'use server';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { buyTicket } from '@/features/ticket/buy/services';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const ticketId = url.searchParams.get('ticketId');
    const paymentIntentId = url.searchParams.get('payment_intent');

    // Проверяем наличие необходимых параметров
    if (!ticketId || !paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Получаем информацию о пользователе из сессии
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Проверяем статус платежа в Stripe
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment has not been completed' },
        { status: 400 }
      );
    }

    // Преобразуем ticketId в число
    const ticketIdNumber = parseInt(ticketId, 10);

    if (isNaN(ticketIdNumber)) {
      return NextResponse.json(
        { error: 'Invalid ticket ID' },
        { status: 400 }
      );
    }

    // Выполняем покупку билета
    const ticket = await buyTicket({
      ticketId: ticketIdNumber,
      buyerId: userId,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency
    });

    const cookie = await cookies();
    // Сохраняем информацию о покупке в cookies для отображения на странице успеха
    cookie.set('lastPurchasedTicket', JSON.stringify({
      id: ticket.id,
      eventId: ticket.event_id,
      price: ticket.price,
      purchaseDate: new Date().toISOString()
    }));

    // Перенаправляем на страницу успешной покупки
    return NextResponse.redirect(new URL('/payment/success', request.url));
  } catch (error) {
    console.error('Error processing successful payment:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing payment' },
      { status: 500 }
    );
  }
}
