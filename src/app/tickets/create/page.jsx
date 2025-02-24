import React from 'react';

import { userService } from '@/entities/user';
import { CreateTicketPage} from '@features/ticket/create';
import { eventService } from '@/entities/event';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function page() {
  const user = await userService.getUserInfoBySession();
  const availableEvents = await eventService.getAvailableEvents();

  return (
    <>
      Create Ticket
      <CreateTicketPage user={user} availableEvents={availableEvents}/>
    </>
  );
};
