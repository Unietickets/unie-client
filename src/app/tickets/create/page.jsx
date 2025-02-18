import React from 'react';

import { CreateTicketPage} from '@features/ticket/create';

export default async function page() {
  return (
    <>
      Create Ticket
      <CreateTicketPage />
    </>
  );
};
