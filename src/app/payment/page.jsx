import React from 'react';

import PaymentPage from '@/views/payment';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const page = () => {
  return (
    <PaymentPage />
  );
};

export default page;
