import { ticketRepository } from "../repositories"

class TicketService {
  async getEventTickets({ eventId }) {
    return ticketRepository.getTicketsByEventId(eventId);
  }
};

export const ticketService = new TicketService();
