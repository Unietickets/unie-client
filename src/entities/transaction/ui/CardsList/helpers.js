import { TicketIcon, WithdrawIcon } from "@/shared/ui";

export const addIconToTransaction = (transaction) => {
  let Icon = null;

  switch (transaction.item.type) {
    case 'ticket':
      Icon = TicketIcon;
      break;
    case 'money':
      Icon = WithdrawIcon
      break;
  }

  return {
    ...transaction,
    Icon
  }
}
