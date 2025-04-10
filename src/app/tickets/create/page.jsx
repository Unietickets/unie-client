import React from 'react';

import * as userService from '@/entities/user/services';
import * as eventService from '@/entities/event/services';
import * as fileService from '@/entities/file/services';
import { CreateTicketForm } from '@features/ticket/create';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function page() {
  const user = await userService.getUserInfoBySession();
  const availableEvents = await eventService.getAvailableEvents();

  const availableEventsWithCorrectImageLinks = await fileService
    .generateFileLinksToArray(availableEvents);

  return (
    <>
      Create Ticket
      <CreateTicketForm user={user} availableEvents={availableEventsWithCorrectImageLinks}/>
    </>
  );
};
