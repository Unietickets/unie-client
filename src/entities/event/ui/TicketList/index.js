'use client'

import React from 'react';
import Link from 'next/link';

import { ROUTES } from '@/core/routes';

import * as S from './styles';

export const TicketList = (props) => {
  const { tickets } = props;

  return (
    <S.Wrapper>
      <S.Header>
        Buy a ticket
      </S.Header>
      <S.TicketList>
        {tickets.map(t => {
          const href = `${ROUTES.payment.href}?amount=${t.price}&currency=${t.price_currency ?? 'usd'}`;

          return (
            <S.TicketItem key={t.id}>
              <S.Ticket>
                <span>{t.seller.name}</span>
                <span>{t.price} $</span>
                <Link href={href}>Buy</Link>
              </S.Ticket>
            </S.TicketItem>
          )
        })}
      </S.TicketList>
    </S.Wrapper>
  )
};
