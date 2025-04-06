'use client'

import React from 'react';
import Link from 'next/link';

import * as S from './styles';

export const TicketList = (props) => {
  const { tickets } = props;

  return (
    <S.Wrapper>
      <S.Header>
        Buy a ticket
      </S.Header>
      <S.TicketList>
        {tickets.map(t => (
          <S.TicketItem key={t.id}>
            <S.Ticket>
              <span>{t.seller.name}</span>
              <span>{t.price} $</span>
              {/* todo добавить страницу покупки билета */}
              <Link href={`/tickets/buy/${t.id}`}>Buy</Link>
            </S.Ticket>
          </S.TicketItem>
        ))}
      </S.TicketList>
    </S.Wrapper>
  )
};
