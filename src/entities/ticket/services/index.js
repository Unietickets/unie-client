'use server';

import * as ticketRepository from "../repositories"

export const getEventTickets = async ({ eventId }) => {
  return ticketRepository.getTicketsByEventId(eventId);
}

export const createTicket = async ({
  userId,
  eventId,
  photos,
  description,
  price
}) => {
  const numberPrice = Number(price);
  const isPriceNotNumber = Number.isNaN(numberPrice);

  if (isPriceNotNumber) {
    throw new Error("Price must be number");
  }

  return ticketRepository.createTicket({
    userId,
    eventId,
    photos,
    description,
    price: numberPrice
  });
}

export const getOwnTickets = async (userId) => {
  if (userId == null) {
    return {
      selling: [],
      buying: [],
    };
  }
  
  const userTickets = await ticketRepository.getUserTicketsById(userId);

  const userSellingTickets = userTickets.filter(t => t.user_id === userId);
  const userBuyingTickets = userTickets.filter(t => t.user_id !== userId);

  return {
    selling: userSellingTickets,
    buying: userBuyingTickets
  }
}
