import Link from 'next/link';
import React from 'react';

import { ROUTES } from '@/core/routes';
import { Button } from '@/shared/ui';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function OwnTicketsPage() {
  return (
    <div>
      Own Tickets

      <br />

      <Button variant='primary' size='medium'>
        <Link href={ROUTES.tickets.create.href}>Create ticket</Link>
      </Button>
    </div>
  );
};
