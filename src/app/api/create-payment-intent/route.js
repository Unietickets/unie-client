import { NextResponse } from 'next/server'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { amount, currency } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
