'use server';

import * as ticketRepository from "../repositories";

export async function getEventTickets({ eventId }) {
  return ticketRepository.getTicketsByEventId(eventId);
}

