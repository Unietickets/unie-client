import * as ticketService from '@entities/ticket/services';
import * as userService from '@entities/user/services';
import * as eventService from '@entities/event/services';
import * as balanceService from '@entities/balance/services';

export const buyTicket = async ({ ticketId, buyerId, amount, currency }) => {
  const ticket = await ticketService.getTicketById({ticketId});

  if (!ticket) {
    throw new Error('Билет не найден');
  }

  if (ticket.status !== 'available') {
    throw new Error('Билет не доступен для покупки');
  }

  // данные продавца
  const seller = await userService.getUserById(ticket.user_id);
  // данные мероприятия
  const event = await eventService.getEventById(ticket.event_id);

  // Обновляем статус билета
  await ticketService.updateTicket(ticketId, {
    status: 'sold',
    buyer_id: buyerId
  });

  // Рассчитываем дату активации баланса (неделя после даты проведения мероприятия)
  const eventDate = new Date(event.event_date);
  const activationDate = new Date(eventDate);
  activationDate.setDate(activationDate.getDate() + 7); // +7 дней после мероприятия

  try {
    // Увеличиваем неактивный баланс продавца
    await balanceService.addToPendingBalance(
      ticket.user_id, // ID продавца
      amount,   // Сумма билета
      activationDate  // Дата активации (неделя после мероприятия)
    );

    console.log(`Pending balance added for seller ${ticket.user_id}, amount: ${ticket.price}, activation date: ${activationDate.toISOString()}`);
  } catch (error) {
    console.error('Error adding to seller pending balance:', error);
    // Не прерываем процесс покупки, если возникла ошибка с балансом
    // В реальном приложении здесь должна быть более сложная логика обработки ошибок
  }

  return ticket;
};
