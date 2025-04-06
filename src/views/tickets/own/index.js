'use client'

import Link from 'next/link';
import React from 'react';

import { ROUTES } from '@/core/routes';
import { Button } from '@/shared/ui';

const TicketList = ({ tickets }) => {
  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          {ticket.id}#{ticket.description}
        </div>
      ))}
    </div>
  );
};

export const OwnTicketsView = (props) => {
  const { ticketGroups } = props;

  return (
    <div>
      Own Tickets

      {ticketGroups.available.length > 0 && (
        <>
          <div>
            Available
          </div>
          <TicketList tickets={ticketGroups.available} />
          <br />
        </>
      )}

      {ticketGroups.reserved.length > 0 && (
        <>
          <div>
            Reserved
          </div>
          <TicketList tickets={ticketGroups.reserved} />
          <br />
        </>

      )}

      {ticketGroups.sold.length > 0 && (
        <>
          <div>
            Sold
          </div>
          <TicketList tickets={ticketGroups.sold} />
          <br />
        </>
      )}


      <Button variant='primary' size='medium'>
        <Link href={ROUTES.tickets.create.href}>Create ticket</Link>
      </Button>
    </div>
  )
};
