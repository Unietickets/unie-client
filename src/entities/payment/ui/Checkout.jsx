'use client'

import { useEffect, useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'

import { ORIGIN } from '@/core/constants';
import { Button } from '@/shared/ui';

export function Checkout({ amount, currency }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [ticketId, setTicketId] = useState(null);

  useEffect(() => {
    // Получаем ticketId из URL
    const url = new URL(window.location.href);
    const ticketIdParam = url.searchParams.get('ticketId');
    setTicketId(ticketIdParam);

    fetch("/api/create-payment-intent", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency })
    })
      .then(res => res.json())
      .then(res => setClientSecret(res.clientSecret))
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe | !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // Добавляем ticketId в URL для обработки на сервере
        return_url: `${ORIGIN}/api/payment/success?ticketId=${ticketId}&amount=${amount}`
      }
    });

    setErrorMessage(error?.message);
    setIsLoading(false);
  }

  if (!clientSecret | !stripe | !elements) {
    return <p>Loading...</p>;
  }

  return (
    <div id="checkout">
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        {errorMessage && <p>{errorMessage}</p>}
        <Button
          variant='primary'
          size='medium'
          style={{ margin: '0 auto', marginTop: '32px' }}
          disabled={isLoading}
          isLoading={isLoading}
        >
          pay {amount} {currency}
        </Button>
      </form>
    </div>
  )
}
