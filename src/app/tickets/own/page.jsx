import React from 'react';

import * as ticketService from '@entities/ticket/services';
import * as userService from '@entities/user/services';

import { OwnTicketsView } from '@/views/tickets/own';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function OwnTicketsPage() {
  const userData = await userService.getUserInfoBySession();
  const ticketGroups = await ticketService.getUserTickets({ userId: userData.id });

  return (
    <OwnTicketsView ticketGroups={ticketGroups} />
  );
};
