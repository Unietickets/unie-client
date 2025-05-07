'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { ROUTES } from "@/core/routes";
import { Button } from "@/shared/ui";

import * as S from './styles';

function Page() {
  const router = useRouter();
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    // Получаем информацию о последнем купленном билете из cookies
    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const ticketData = getCookieValue('lastPurchasedTicket');
    if (ticketData) {
      try {
        setTicketInfo(JSON.parse(ticketData));
      } catch (e) {
        console.error('Error parsing ticket data:', e);
      }
    }
  }, []);

  return (
    <S.Wrapper id="success">
      <S.Title>
        Платеж успешно выполнен!
      </S.Title>

      {ticketInfo && (
        <S.TicketInfo>
          <p>Билет успешно приобретен!</p>
          <p>Номер билета: #{ticketInfo.id}</p>
          <p>Стоимость: {ticketInfo.price} USD</p>
          <p>Дата покупки: {new Date(ticketInfo.purchaseDate).toLocaleString()}</p>
        </S.TicketInfo>
      )}

      <S.Message>
        Спасибо за покупку! Если у вас возникли вопросы, пожалуйста, напишите нам на
        {' '}
        <S.Link href="mailto:support@unie.com">support@unie.com</S.Link>.
      </S.Message>

      <Button
        variant='primary'
        size='medium'
        isFullWidth
        style={{ marginBottom: '16px' }}
      >
        <Link href={ROUTES.tickets.ownList.href}>Мои билеты</Link>
      </Button>

      <Button
        variant='primary'
        size='medium'
        isFullWidth
      >
        <Link href={ROUTES.home.href}>На главную</Link>
      </Button>
    </S.Wrapper>
  )
}

export default Page;
