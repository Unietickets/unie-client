import React from 'react';

import * as ticketService from '@entities/ticket/services';
import * as userService from '@entities/user/services';

import OwnTicketsPage from '@/views/tickets/own';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Page() {
  const user = await userService.getUserInfoBySession();
  const ownTickets = await ticketService.getOwnTickets(user?.id);

  return (
    <OwnTicketsPage tickets={ownTickets} />
  );
};
