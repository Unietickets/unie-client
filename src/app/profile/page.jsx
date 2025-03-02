import moment from "moment";
import { redirect } from "next/navigation";

import { ROUTES } from "@/core/routes";
import * as userService from "@/entities/user/services";

import ProfilePage from "@/views/profile";

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const transactionsMock = [
  {
    id: 1,
    item: {
      type: 'ticket',
    },
    sum: {
      value: 100,
      type: 'income',
      currency: 'USD'
    },
    transaction_date: moment(new Date()).format('DD.MM.YYYY hh:mm'),
    status: 'in progress'
  },
  {
    id: 2,
    item: {
      type: 'ticket',
    },
    sum: {
      value: 228,
      type: 'outcome',
      currency: 'USD'
    },
    transaction_date: moment(new Date()).format('DD.MM.YYYY hh:mm'),
    status: 'success'
  },
  {
    id: 3,
    item: {
      type: 'money',
    },
    sum: {
      value: 1337,
      type: 'outcome',
      currency: 'USD'
    },
    transaction_date: moment(new Date()).format('DD.MM.YYYY hh:mm'),
    status: 'declined'
  },
  {
    id: 4,
    item: {
      type: 'money',
    },
    sum: {
      value: 1337,
      type: 'income',
      currency: 'USD'
    },
    transaction_date: moment(new Date()).format('DD.MM.YYYY hh:mm'),
    status: 'in progress'
  }
];

export default async function Profile() {
  const user = await userService.getUserInfoBySession();

  if (user === null) {
    redirect(ROUTES.signIn.href)
  }

  return <ProfilePage user={user} transactions={transactionsMock} />;
}
