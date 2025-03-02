'use client'

import Link from 'next/link';
import React from 'react';

import { ROUTES } from '@/core/routes';
import { Button } from '@/shared/ui';

import * as S from './styles';

function OwnTicketsPage(props) {
  const { tickets } = props;

return (
    <div>
      {tickets.selling.length > 0 && (
        <>
          Tickets you are selling:

          {tickets.selling.map((ticket) => (
            <S.Ticket key={ticket.id}>
              <p>#{ticket.id}</p>
              <p>{ticket.description}</p>
              <p>{ticket.price}</p>
              <p>{ticket?.event?.title}</p>
            </S.Ticket>
          ))}
        </>
      )}

      {tickets.buying.length > 0 && (
        <>
          <br />

          Tickets you've bought:

          {tickets.buying.map((ticket) => (
            <S.Ticket key={ticket.id}>
              <p>#{ticket.id}</p>
              <p>{ticket.description}</p>
              <p>{ticket.price}</p>
              <p>{ticket?.event?.title}</p>
            </S.Ticket>
          ))}
        </>
      )}

      <br />

      <Button variant='primary' size='medium'>
        <Link href={ROUTES.tickets.create.href}>Create ticket</Link>
      </Button>
    </div>
  );
};

export default OwnTicketsPage;
