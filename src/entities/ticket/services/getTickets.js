import { ticketRepository } from "../repositories/ticket"

export const getTickets = ({ eventId }) => {
    return ticketRepository.getTickets({ eventId });
}