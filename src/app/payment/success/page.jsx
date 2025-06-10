import SuccessPaymentPage from '@/views/payment/success';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function Page() {
  return (
    <SuccessPaymentPage />
  )
}

export default Page;
