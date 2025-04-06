  export const serializeTickets = (tickets) => {
    return tickets.map(ticket => ({
      ...ticket,
      price: ticket.price ? Number(ticket.price) : null,
    }));
  };