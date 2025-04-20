'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Checkout } from '@/entities/payment';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const page = () => {
  const router = useRouter();
  const url = new URL(window.location.href);

  const amount = Number(url.searchParams.get('amount'));
  const currency = url.searchParams.get('currency');

  console.log(amount, currency)

  if (Number.isNaN(amount) || !currency) {
    // router.back();
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        amount,
        currency,
      }}
    >
      <Checkout amount={amount} currency={currency} />
    </Elements>
  );
};

export default page;
