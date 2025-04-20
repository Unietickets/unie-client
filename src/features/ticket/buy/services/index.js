
export const buyTicket = async ({ ticketId, buyerId }) => {
  const ticket = await ticketService.getTicketById(ticketId);

  if (!ticket) {
    throw new Error('Билет не найден');
  }

  if (ticket.status !== 'available') {
    throw new Error('Билет не доступен для покупки');
  }

  // todo добавить списание и пополнение балансов
  await ticketService.updateTicket(ticketId, {
    status: 'sold',
    buyer_id: buyerId
  });

  return ticket;
};
